import { ServerResponse } from "./global";
import { Merchant } from "./merchant";
import { Organization } from "./organization";

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

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  last_login_date?: string;
  type: UserType;
  gender: "" | null;
  dob: "" | null;
  status: UserStatus;
  phone_number: string | null;
  contract_role: string | null;
  support_level: string | null;
  supportLevelId: number | null;
  organization_id: number | null;
  organization: Organization | null;
  merchant_id: number | null;
  merchant: Merchant | null;
  photo: string | null;
  firstTimeLogin: boolean;
}

export type AuthUser = {
  user: User;
  refreshToken: string;
  expiresIn: number;
  accessToken: string;
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
  phoneNumber: string;
  supportLevelId?: number;
  contractRole?: string;
  orgName?: string;
};
