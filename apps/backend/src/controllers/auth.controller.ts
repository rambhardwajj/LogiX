import { ApiResponse, asyncHandler, CustomError, logger } from "@repo/utils";
import {
  env,
  handleZodError,
  validateEmail,
  validateLogin,
  validateRegister,
  validateResetPassword,
} from "@repo/zod";
import { and, db, eq, gt, users } from "@repo/drizzle";
import { Request, RequestHandler, Response } from "express";
import {
  createHash,
  generateAccessToken,
  generateRefreshToken,
  generateToken,
  hashPassword,
  passwordMatch,
} from "../utils/auth";
import { emailQueue } from "../queues/email.queue";
import { generateCookieOptions } from "../configs/cookie";
import { verifyGoogleToken } from "../utils/auth";
import { decodedUser } from "../types";
import { isValidUrl } from "../utils/strings/validateUrl";
import jwt from "jsonwebtoken";

export const register: RequestHandler = asyncHandler(async (req, res) => {
  console.log("Inside Register");
  const { email, password, fullname } = handleZodError(
    validateRegister(req.body)
  );

  logger.info("Registration attempt", { email, ip: req.ip });

  let existingUser;
  try {
    [existingUser] = await db
      .select({
        id: users.id,
        email: users.email,
        isVerified: users.isVerified,
        passwordHash: users.passwordHash,
      })
      .from(users)
      .where(eq(users.email, email));
  } catch (error) {
    console.error("🔥 DB SELECT ERROR:", error);
    throw new CustomError(
      500,
      "Database error while checking for existing user"
    );
  }

  if (existingUser) {
    throw new CustomError(409, "Email is already registered");
  }

  const passwordHash = await hashPassword(password);
  const { unHashedToken, hashedToken, tokenExpiry } = generateToken();

  const [user] = await db
    .insert(users)
    .values({
      email,
      passwordHash,
      fullname,
      verificationToken: unHashedToken,
      verificationTokenExpiry: tokenExpiry,
    })
    .returning({
      id: users.id,
      email: users.email,
      fullname: users.fullname,
      avatar: users.avatar,
      role: users.role,
      isVerified: users.isVerified,
    });

  if (!user) {
    logger.error("User insertion failed", { email });
    throw new CustomError(500, "User registration failed. Please try again.");
  }

  emailQueue.add("verifyEmail", {
    type: "verify",
    fullname: user.fullname,
    email: user.email,
    token: unHashedToken,
  });

  logger.info("Verification email sent", {
    email,
    userId: user.id,
    ip: req.ip,
  });

  logger.info("User registered successfully", {
    email,
    userId: user.id,
    ip: req.ip,
  });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Registered Successfully. Please verify your email.",
        user
      )
    );
});

export const verifyEmail: RequestHandler = asyncHandler(async (req, res) => {
  const { token } = req.params;
  if (!token) throw new CustomError(400, "Verification token is required");
  const hashedToken = createHash(token);

  const [user] = await db
    .select()
    .from(users)
    .where(
      and(
        eq(users.verificationToken, hashedToken),
        gt(users.verificationTokenExpiry, new Date())
      )
    );

  if (!user) {
    throw new CustomError(
      410,
      "The verification link is invalid or has expired"
    );
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  const hashedRefreshToken = createHash(refreshToken);

  await db
    .update(users)
    .set({
      verificationToken: null,
      verificationTokenExpiry: null,
      isVerified: true,
      refreshToken: hashedRefreshToken,
    })
    .where(eq(users.id, user.id));

  logger.info("Email verified successfully", {
    email: user.email,
    userId: user.id,
    ip: req.ip,
  });

  res
    .status(200)
    .cookie("accessToken", accessToken, generateCookieOptions())
    .cookie("refreshToken", refreshToken, generateCookieOptions())
    .json(new ApiResponse(200, "Email verified successfully", null));
});

export const login: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password, rememberMe } = handleZodError(
      validateLogin(req.body)
    );

    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user) throw new CustomError(401, "Invalid email");

    if (!user.isVerified) {
      throw new CustomError(401, "Email is not verified");
    }

    const isValidPassword = await passwordMatch(password, user.passwordHash!);
    if (!isValidPassword) throw new CustomError(401, "Invalid credentials");

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    const hashedRefreshToken = createHash(refreshToken);

    await db
      .update(users)
      .set({
        refreshToken: hashedRefreshToken,
      })
      .where(eq(users.id, user.id));

    logger.info("User logged in successfully", {
      email,
      userId: user.id,
      ip: req.ip,
    });

    res
      .status(200)
      .cookie("accessToken", accessToken, generateCookieOptions())
      .cookie(
        "refreshToken",
        refreshToken,
        generateCookieOptions({ rememberMe })
      )
      .json(new ApiResponse(200, "Logged in successfully", user));
  }
);

export const getUserProfile: RequestHandler = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const [user] = await db.select().from(users).where(eq(users.id, id));
  if (!user) {
    throw new CustomError(404, "User not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "User profile retrieved successfully", user));
});

export const logout: RequestHandler = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;
  const { id, email } = req.user;

  if (!refreshToken) {
    throw new CustomError(400, "Refresh token is missing.");
  }

  await db
    .update(users)
    .set({
      refreshToken: null,
    })
    .where(eq(users.id, id));

  logger.info("User logged out successfully", {
    email,
    userId: id,
    ip: req.ip,
  });

  res
    .status(200)
    .clearCookie("accessToken", {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .clearCookie("refreshToken", {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .json(new ApiResponse(200, "Logged out successfully", null));
});

export const resendVerificationEmail: RequestHandler = asyncHandler(
  async (req, res) => {
    const { email } = handleZodError(validateEmail(req.body));
    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user)
      throw new CustomError(401, "No account found with this email address");
    if (user.isVerified)
      throw new CustomError(400, "Email is already verified");

    const { unHashedToken, hashedToken, tokenExpiry } = generateToken();

    await db
      .update(users)
      .set({
        verificationToken: hashedToken,
        verificationTokenExpiry: tokenExpiry,
      })
      .where(eq(users.email, email));

    emailQueue.add("sendVerifyEmail", {
      type: "verify",
      fullname: user.fullname,
      email: user.email,
      token: unHashedToken,
    });

    logger.info("Verification email resent", {
      email,
      userId: user.id,
      ip: req.ip,
    });
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Verification mail sent successfully. Please check your inbox",
          null
        )
      );
  }
);

export const forgotPassword: RequestHandler = asyncHandler(async (req, res) => {
  const { email } = handleZodError(validateEmail(req.body));

  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (!user)
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "If an account exists, a reset link has been sent to the email",
          null
        )
      );

  if (user.provider !== "LOCAL")
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Password reset is only available for local accounts",
          null
        )
      );

  const { unHashedToken, hashedToken, tokenExpiry } = generateToken();

  await db
    .update(users)
    .set({
      forgotPasswordToken: hashedToken,
      forgotPasswordExpiry: tokenExpiry,
    })
    .where(eq(users.email, email));

  emailQueue.add("resetPasswordMail", {
    type: "resetPassword",
    fullname: user.fullname,
    email: user.email,
    token: unHashedToken,
  });

  logger.info("Password reset email sent", {
    email: user.email,
    userId: user.id,
    ip: req.ip,
  });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "If an account exists, a reset link has been sent to the email",
        null
      )
    );
});

export const resetPassword: RequestHandler = asyncHandler(async (req, res) => {
  const { password } = handleZodError(validateResetPassword(req.body));
  const { token } = req.params;
  const { email } = req.user;

  if (!email || !token || !password)
    throw new CustomError(400, "Invalid credentials ");

  const hashedToken = createHash(token);
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.forgotPasswordToken, hashedToken));

  if (!user) throw new CustomError(404, "User does not found");

  const passwordHash = await hashPassword(password);
  const isSamePassword = await passwordMatch(
    password,
    user.passwordHash as string
  );

  if (isSamePassword)
    throw new CustomError(400, "Password must be different from old password");

  user.passwordHash = passwordHash;

  await db.update(users).set(user).where(eq(users.id, user.id));

  res.status(200).json(new ApiResponse(200, "Password has been updated", null));
});

export const googleLogin: RequestHandler = asyncHandler(async (req, res) => {
  const { token, rememberMe } = req.body;
  const payload = await verifyGoogleToken(token);

  const { email, name, picture } = payload;

  if (!email || !name || !picture) {
    throw new CustomError(200, "Google payload missing values ");
  }

  // db mai check if email alredy hai
  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  let user = existingUser;
  if (!user) {
    const inserted = await db
      .insert(users)
      .values({
        email,
        fullname: name,
        avatar: picture,
        role: "USER",
        isVerified: true,
        provider: "GOOGLE",
      })
      .returning();

    user = inserted[0];
  }

  const accessToken = generateAccessToken(user!);
  const refreshToken = generateRefreshToken(user!);

  const hashedRefreshToken = createHash(refreshToken);

  await db
    .update(users)
    .set({
      verificationToken: null,
      verificationTokenExpiry: null,
      isVerified: true,
      refreshToken: hashedRefreshToken,
    })
    .where(eq(users.email, email));

  logger.info("Google logged in successfully", {
    email,
  });

  res
    .status(200)
    .cookie("accessToken", accessToken, generateCookieOptions())
    .cookie("refreshToken", refreshToken, generateCookieOptions({ rememberMe }))
    .json(new ApiResponse(200, "Google login in successfully", null));
});

export const updateLinks: RequestHandler = asyncHandler(async (req, res) => {
  const { linkedInUrl, githubUrl, xUrl } = req.body;

  if (
    (linkedInUrl && !isValidUrl(linkedInUrl)) ||
    (githubUrl && !isValidUrl(githubUrl)) ||
    (xUrl && !isValidUrl(xUrl))
  ) {
    throw new CustomError(400, "One or more links are not valid URLs");
  }

  const { id } = req.user;

  const [updatedUser] = await db
    .update(users)
    .set({ linkedInUrl, githubUrl, xUrl })
    .where(eq(users.id, id))
    .returning();

  res
    .status(200)
    .json(new ApiResponse(200, "Links updated successfully", updatedUser));
});

export const refreshToken: RequestHandler = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken;
  if (!incomingRefreshToken) {
    throw new CustomError(401, "Refresh token is missing");
  }

  let decoded;
  try {
    decoded = jwt.verify(incomingRefreshToken, env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    throw new CustomError(401, "Invalid refresh token");
  }

  const userId = req.user.id;

  const hashedIncomingRefreshToken = createHash(incomingRefreshToken);

  const [user] = await db.select().from(users).where(eq(users.refreshToken, hashedIncomingRefreshToken));

  if (!user) {
    throw new CustomError(404, "User not found");
  }

  const newAccessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user); 


  const hashedRefreshToken = createHash(newRefreshToken);

    await db
      .update(users)
      .set({
        refreshToken: hashedRefreshToken,
      })
      .where(eq(users.id, user.id));

    logger.info("User accessToken Refreshed successfully");

    res
      .status(200)
      .cookie("accessToken", newAccessToken, generateCookieOptions())
      .cookie(
        "refreshToken",
        refreshToken,
        generateCookieOptions()
      )
      .json(new ApiResponse(200, "Logged in successfully", user));
  

});
