import { medvaxApi } from "configs/store-query";
import { QueryRequest, ServerResponse } from "types/global";
import { AuthUser, User } from "types/user";
import * as RtkqTag from "constants/data-tag";

const TAG = "/auth";

export interface SigninRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface VerifyEmailOtpRequest {
  email: string;
  otp: string;
}

export interface SendVerifyOtpRequest {
  email: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export const authApi = medvaxApi.injectEndpoints({
  endpoints: (builder) => ({
    // Sign in
    signin: builder.mutation<
      ServerResponse<AuthResponse>,
      QueryRequest<SigninRequest, void, void>
    >({
      query: ({ ...config }) => ({
        url: TAG + "/signin",
        method: "POST",
        ...config,
      }),
      invalidatesTags: [RtkqTag.USER],
    }),

    // Admin sign in
    signinAdmin: builder.mutation<
      ServerResponse<AuthResponse>,
      QueryRequest<SigninRequest, void, void>
    >({
      query: ({ ...config }) => ({
        url: TAG + "/signin/admin",
        method: "POST",
        ...config,
      }),
      invalidatesTags: [RtkqTag.USER],
    }),

    // Sign up
    signup: builder.mutation<
      ServerResponse<AuthResponse>,
      QueryRequest<SignupRequest, void, void>
    >({
      query: ({ ...config }) => ({
        url: TAG + "/signup",
        method: "POST",
        ...config,
      }),
      invalidatesTags: [RtkqTag.USER],
    }),

    // Send email verification OTP
    sendVerifyOtp: builder.mutation<
      ServerResponse<{ email: string }>,
      QueryRequest<SendVerifyOtpRequest, void, void>
    >({
      query: ({ ...config }) => ({
        url: TAG + "/signup/verify-email",
        method: "POST",
        ...config,
      }),
    }),

    // Verify email with OTP
    verifyEmailOtp: builder.mutation<
      ServerResponse<{ token: string }>,
      QueryRequest<VerifyEmailOtpRequest, void, void>
    >({
      query: ({ ...config }) => ({
        url: TAG + "/signup/validate-email-otp",
        method: "POST",
        ...config,
      }),
    }),

    // Refresh access token
    refreshToken: builder.mutation<
      ServerResponse<Omit<AuthResponse, "user">>,
      QueryRequest<RefreshTokenRequest, void, void>
    >({
      query: ({ ...config }) => ({
        url: TAG + "/refresh-token",
        method: "POST",
        ...config,
      }),
    }),

    // Logout
    logout: builder.mutation<ServerResponse<null>, void>({
      query: () => ({
        url: TAG + "/logout",
        method: "POST",
      }),
      invalidatesTags: [RtkqTag.USER],
    }),
  }),
});

export const {
  useSigninMutation,
  useSigninAdminMutation,
  useSignupMutation,
  useSendVerifyOtpMutation,
  useVerifyEmailOtpMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
} = authApi;
