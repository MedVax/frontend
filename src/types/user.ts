import { ServerResponse } from "./global";

export enum UserType {
  USER = "USER",
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  SERVICE_MANAGER = "SERVICE_MANAGER",
  AGENT = "AGENT",
  ORG_AGENT = "ORG_AGENT",
  ORG_ADMIN = "ORG_ADMIN",
  MERCHANT_ADMIN = "MERCHANT_ADMIN",
}

export enum AdminType {
  ADMIN = "ADMIN",
  SERVICE_MANAGER = "SERVICE_MANAGER",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  IN_ACTIVE = "IN_ACTIVE",
  DEACTIVATED = "DEACTIVATED",
}

export enum UserProfileType {
  CLIENT = "CLIENT",
  CONSULTANT = "CONSULTANT",
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  lastLoginDate?: string;
  type: UserType;
  gender: "" | null;
  dob: "" | null;
  status: UserStatus;
  phoneNumber: string | null;
  avatar: string | null;
  firstTimeLogin: boolean;
  activeProfile?: {
    id: string;
    type: UserProfileType;
    userProfileClient?: string;
    userProfileConsultant?: string;
  };
}

export type AuthUser = {
  user: User;
  isAuthenticated?: boolean;
  expiresIn: number;
} | null;

export type UserSignRequest = {
  email: string;
  password: string;
};

export type UserSignResponse = ServerResponse<AuthUser>;

export type UserProfileResponse = ServerResponse<User>;
export type UpdateUserProfileInfoRequest = {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
};
