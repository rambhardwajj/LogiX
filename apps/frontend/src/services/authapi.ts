import { AUTH_PATH } from "../constants";
import { api } from "./api";
import type {
  EmailData,
  LoginData,
  ResetPasswordData,
} from "@repo/zod";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<ApiResponse<User>, FormData>({
      query: (formData) => ({
        url: `${AUTH_PATH}/register`,
        method: "POST",
        body: formData,
      }),
    }),

    login: builder.mutation<ApiResponse<null>,LoginData >({
      query: (credentials) => ({
        url: `${AUTH_PATH}/login`,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),

    logout: builder.mutation<ApiResponse<null>, void>({
      query: () => ({
        url: `${AUTH_PATH}/logout`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    googleLogin: builder.mutation<
      ApiResponse<null>,
      { token: string; rememberMe?: boolean }
    >({
      query: (data) => ({
        url: `${AUTH_PATH}/login/google`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    fetchUser: builder.query<ApiResponse<User>, void>({
      query: () => `${AUTH_PATH}/profile`,
      providesTags: ["User"],
    }),

    verifyEmail: builder.query<ApiResponse<null>, string>({
      query: (token) => ({
        url: `${AUTH_PATH}/verify/${token}`,
        method: "GET",
      }),
    }),

    resendVerification: builder.mutation<ApiResponse<null>, EmailData>({
      query: (data) => ({
        url: `${AUTH_PATH}/email/resend`,
        method: "POST",
        body: data,
      }),
    }),

    forgotPassword: builder.mutation<
      ApiResponse<null> | ApiResponse<{ code: string }>,
      EmailData
    >({
      query: (data) => ({
        url: `${AUTH_PATH}/password/forgot`,
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation<
      ApiResponse<null>,
      ResetPasswordData & { token: String }
    >({
      query: ({ token, password, confirmPassword }) => ({
        url: `${AUTH_PATH}/password/reset/${token}`,
        method: "POST",
        body: { password, confirmPassword },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { 
  useRegisterMutation,
  useVerifyEmailQuery,
  useLoginMutation,
  useFetchUserQuery,
  useLazyFetchUserQuery,
  useResendVerificationMutation,
  useGoogleLoginMutation,
  useForgotPasswordMutation,
  useLogoutMutation,
  useResetPasswordMutation,
 } = authApi;