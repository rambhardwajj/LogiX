import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@repo/ui/components/card";
import { Label } from "@repo/ui/components/label";
import { Input } from "@repo/ui/components/input";
import { Checkbox } from "@repo/ui/components/checkbox";
import { Eye, EyeOff, Loader, Lock, LogIn, Mail } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { Button } from "@repo/ui/components/button";
import { Link, useNavigate } from "react-router-dom";
import type { LoginData } from "@repo/zod";
import { GoogleLogin } from "@react-oauth/google";
import {
  useGoogleLoginMutation,
  useLazyFetchUserQuery,
  useLoginMutation,
} from "../services/authapi";
import { useAppDispatch } from "../hooks";
import { setCredentials } from "../store/features/authSlice";
import { toast } from "react-toastify";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [login, { isLoading }] = useLoginMutation();
  const [googleLogin] = useGoogleLoginMutation();
  const [getProfile] = useLazyFetchUserQuery();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    try {
      const res = await login(data).unwrap();
      const user = await getProfile().unwrap();

      dispatch(
        setCredentials({
          user: user.data,
        })
      );

      toast.success(res.message);
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <Card className="bg-white border border-slate-200 text-slate-900 shadow-md">
          <CardHeader className="text-center pt-3">
            <CardTitle className="text-2xl font-bold text-slate-900">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-slate-500">
              Sign in to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md bg-white text-slate-900 focus-visible:ring-2 focus-visible:ring-violet-500"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Min 6 characters" },
                    })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md bg-white text-slate-900 focus-visible:ring-2 focus-visible:ring-violet-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-800"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember Me + Forgot */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setRememberMe(checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="rememberMe"
                    className="text-sm text-slate-700 cursor-pointer font-normal"
                  >
                    Remember me
                  </Label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm text-slate-600 hover:text-violet-700"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full cursor-pointer  bg-violet-700 hover:bg-violet-800 text-white rounded-md"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <div className="flex justify-center  ">
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign In
                    </div>
                  </>
                )}
              </Button>
            </form>

            {/* Or Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-400">Or</span>
              </div>
            </div>

            {/* Google Login */}
            <div className="flex items-center justify-center w-full">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  try {
                    const idToken = credentialResponse.credential;
                    await googleLogin({
                      token: idToken!,
                      rememberMe,
                    }).unwrap();

                    const user = await getProfile().unwrap();

                    dispatch(
                      setCredentials({
                        user: user.data,
                      })
                    );

                    toast.success("Login successful.");
                    navigate("/dashboard");
                  } catch (error: any ) {
                    toast.error(error.data.message);
                  }
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
              ;
            </div>

            {/* Links */}
            <div className="flex flex-col gap-2">
              <div className="text-center text-sm">
                <span className="text-slate-500">Don't have an account? </span>
                <Link
                  to="/signup"
                  className="hover:underline hover:text-violet-700 text-slate-800 font-medium"
                >
                  Sign up
                </Link>
              </div>
              <div className="text-center text-sm pb-3">
                <span className="text-slate-500">
                  Need to verify your email?{" "}
                </span>
                <Link
                  to="/resend-verification"
                  className="hover:underline hover:text-violet-700 text-slate-800 font-medium"
                >
                  Resend verification
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;
