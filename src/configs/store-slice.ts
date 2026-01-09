import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { logoutAction } from "./store-actions";
import { GlobalInitialStateType } from "types/global";
import userApi from "apis/user-api";
import { authApi } from "apis/auth-api";
import { UserType, User } from "types/user";

export const globalInitialState: GlobalInitialStateType = {
  authUser: null,
  isSideMenu: false,
  isRequestDemo: false,
  isTicketFilterSideMenu: false,
};

const slice = createSlice({
  name: "global",
  initialState: globalInitialState,
  reducers: {
    toggleSideMenuAction: (state, { payload }) => {
      state.isSideMenu = payload !== undefined ? !!payload : !state.isSideMenu;
    },
    toggleRequestDemoAction: (state, { payload }) => {
      state.isRequestDemo =
        payload !== undefined ? !!payload : !state.isRequestDemo;
    },
    toggleTicketFilterSideMenuAction: (state, { payload }) => {
      state.isTicketFilterSideMenu =
        payload !== undefined ? !!payload : !state.isTicketFilterSideMenu;
    },
    // Manual token update action for refresh scenarios
    updateTokens: (
      state,
      {
        payload,
      }: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
      }>
    ) => {
      if (state.authUser) {
        state.authUser = {
          ...state.authUser,
          accessToken: payload.accessToken,
          refreshToken: payload.refreshToken,
          expiresIn: payload.expiresIn,
        };
      }
    },
    // Update user profile
    updateUserProfile: (state, { payload }: PayloadAction<Partial<User>>) => {
      if (state.authUser?.user) {
        state.authUser.user = { ...state.authUser.user, ...payload };
      }
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(logoutAction, () => ({ ...globalInitialState }))
      // Legacy user API signin (for backwards compatibility)
      .addMatcher(
        userApi.endpoints.userSignin.matchFulfilled,
        (state, { payload }) => {
          state.authUser = payload?.data;
        }
      )
      .addMatcher(
        userApi.endpoints.verifyUserPasswordLessSignin.matchFulfilled,
        (state, { payload }) => {
          state.authUser = payload?.data;
        }
      )
      .addMatcher(
        userApi.endpoints.getUserProfileInfo.matchFulfilled,
        (state, { payload }) => {
          if (state.authUser?.user) {
            Object.assign(state.authUser.user, payload?.data, {
              isAdmin: payload?.data?.type === UserType.ADMIN,
            });
          }
        }
      )
      .addMatcher(
        userApi.endpoints.userRefreshToken.matchFulfilled,
        (state, { payload }) => {
          state.authUser = { ...state.authUser, ...payload?.data };
        }
      )
      // New auth API handlers
      .addMatcher(
        authApi.endpoints.signin.matchFulfilled,
        (state, { payload }) => {
          const data = payload?.data;
          if (data) {
            state.authUser = {
              user: data.user,
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
              expiresIn: data.expiresIn,
            };
          }
        }
      )
      .addMatcher(
        authApi.endpoints.signinAdmin.matchFulfilled,
        (state, { payload }) => {
          const data = payload?.data;
          if (data) {
            state.authUser = {
              user: data.user,
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
              expiresIn: data.expiresIn,
            };
          }
        }
      )
      .addMatcher(
        authApi.endpoints.signup.matchFulfilled,
        (state, { payload }) => {
          const data = payload?.data;
          if (data) {
            state.authUser = {
              user: data.user,
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
              expiresIn: data.expiresIn,
            };
          }
        }
      )
      .addMatcher(
        authApi.endpoints.refreshToken.matchFulfilled,
        (state, { payload }) => {
          const data = payload?.data;
          if (state.authUser && data) {
            state.authUser = {
              ...state.authUser,
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
              expiresIn: data.expiresIn,
            };
          }
        }
      )
      .addMatcher(authApi.endpoints.logout.matchFulfilled, () => ({
        ...globalInitialState,
      })),
});

export const {
  toggleSideMenuAction,
  toggleTicketFilterSideMenuAction,
  toggleRequestDemoAction,
  updateTokens,
  updateUserProfile,
} = slice.actions;

export default slice;

export function getGlobalSliceStorageState({
  authUser,
}: {
  authUser: GlobalInitialStateType["authUser"];
}) {
  return { authUser };
}
