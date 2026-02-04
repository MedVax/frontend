import { medvaxApi } from "configs/store-query";
import {
  PaginationServerResponse,
  QueryRequest,
  ServerResponse,
} from "types/global";
import {
  UpdateUserProfileInfoRequest,
  User,
  UserProfileResponse,
  UserSignRequest,
  UserSignResponse,
} from "types/user";
import * as RtkqTag from "constants/data-tag";
import { objectToFormData } from "utils/object";

const TAG = "/users";

const userApi = medvaxApi.injectEndpoints({
  endpoints: (builder) => ({
    userSignin: builder.mutation<
      UserSignResponse,
      QueryRequest<UserSignRequest, void, void>
    >({
      query: ({ ...config }) => ({
        url: TAG + "/signin",
        method: "POST",
        ...config,
      }),
      onQueryStarted: async (
        _args: QueryRequest<UserSignRequest, void, void>,
        { queryFulfilled }
      ) => {
        try {
          await queryFulfilled;
        } catch {
          /* empty */
        }
      },
      invalidatesTags: [RtkqTag.USER],
    }),

    userForgotPassword: builder.mutation<
      ServerResponse<null>,
      QueryRequest<{ email: string }, void, void>
    >({
      query: ({ ...config }) => ({
        url: TAG + "/password/forgot",
        method: "POST",
        ...config,
      }),
    }),

    userResetPassword: builder.mutation<
      ServerResponse<null>,
      QueryRequest<
        { token: string; newPassword: string; confirmNewPassword: string },
        void,
        void
      >
    >({
      query: ({ ...config }) => ({
        url: TAG + "/password/reset",
        method: "PUT",
        ...config,
      }),
    }),

    userChangePassword: builder.mutation<
      ServerResponse<null>,
      QueryRequest<
        {
          userId: number;
          oldPassword: string;
          newPassword: string;
        },
        void,
        void
      >
    >({
      query: ({ ...config }) => ({
        url: TAG + "/password/change",
        method: "PUT",
        ...config,
      }),
    }),

    userFirstTimePasswordChange: builder.mutation<
      ServerResponse<null>,
      QueryRequest<{ newPassword: string }, void, void>
    >({
      query: ({ ...config }) => ({
        url: TAG + "/password/first-time-change",
        method: "PUT",
        ...config,
      }),
      invalidatesTags: [RtkqTag.USER],
    }),

    getUserProfileInfo: builder.query<UserProfileResponse, void>({
      query: () => ({
        url: TAG + "/profile",
      }),
      providesTags: [RtkqTag.USER],
    }),

    updateUserProfileInfo: builder.mutation<
      UserProfileResponse,
      QueryRequest<UpdateUserProfileInfoRequest, void, void>
    >({
      query: ({ ...config }) => ({
        url: TAG + "/profile",
        method: "PUT",
        ...config,
      }),
      invalidatesTags: [RtkqTag.USER],
    }),

    verifyUserPasswordLessSignin: builder.mutation<
      UserSignResponse,
      QueryRequest<{ token: string }, void, void>
    >({
      query: ({ ...config }) => ({
        url: TAG + "/signin/password-less/verify",
        method: "POST",
        ...config,
      }),
      invalidatesTags: [RtkqTag.USER],
    }),

    updateUserPhoto: builder.mutation<
      ServerResponse<User>,
      QueryRequest<{ file: File }, void, void>
    >({
      query: ({ ...config }) => ({
        url: TAG + "/photo",
        method: "PUT",
        headers: { "Content-Type": "multipart/form-data" },
        data: objectToFormData(config?.data),
      }),
      invalidatesTags: [RtkqTag.USER],
    }),

    getUsers: builder.query<
      ServerResponse<User>,
      QueryRequest<
        void,
        {
          offset: number;
          limit: number;
          search?: string;
          organization_id?: number;
          type?: string;
        },
        void
      >
    >({
      query: (config) => ({
        url: TAG,
        ...config,
      }),
      providesTags: [RtkqTag.USER],
    }),
    getUsersVar2: builder.query<
      PaginationServerResponse<User[]>,
      QueryRequest<void, Record<string, unknown>, void>
    >({
      query: (config) => ({
        url: TAG + "/var2",
        ...config,
      }),
      providesTags: [RtkqTag.USER],
    }),
    userRefreshToken: builder.mutation<
      UserSignResponse,
      QueryRequest<{ refreshToken: string }, void, void>
    >({
      query: ({ ...config }) => ({
        url: TAG + "/refresh-token",
        method: "POST",
        ...config,
      }),
    }),

    requestDemo: builder.mutation<
      ServerResponse<null>,
      QueryRequest<
        {
          email: string;
          firstName: string;
          lastName: string;
          phoneNumber: string;
          companyName: string;
          role: string;
        },
        void,
        void
      >
    >({
      query: ({ ...config }) => ({
        url: TAG + "/request-demo",
        method: "POST",
        ...config,
      }),
    }),

    updateUserStatus: builder.mutation<
      ServerResponse<null>,
      QueryRequest<{ status: string }, void, { id: string }>
    >({
      query: ({ path, ...config }) => ({
        url: TAG + `/${path?.id}/status`,
        method: "PUT",
        ...config,
      }),
      invalidatesTags: [RtkqTag.USER],
    }),
  }),
});

export const {
  useUserSigninMutation,
  useUserForgotPasswordMutation,
  useUserResetPasswordMutation,
  useUserChangePasswordMutation,
  useUserFirstTimePasswordChangeMutation,
  useGetUserProfileInfoQuery,
  useUpdateUserProfileInfoMutation,
  useVerifyUserPasswordLessSigninMutation,
  useUpdateUserPhotoMutation,
  useGetUsersQuery,
  useGetUsersVar2Query,
  useUserRefreshTokenMutation,
  useRequestDemoMutation,
  useUpdateUserStatusMutation,
} = userApi;

export default userApi;
