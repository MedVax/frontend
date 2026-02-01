import { AuthUser, User } from "./user";

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export interface ServerResponse<T = unknown> {
  code: string;
  status: number;
  message: string;
  data: T;
}

export type PaginationServerResponse<T> = ServerResponse<{
  data: T;
  offset: number;
  limit: number;
  cursor: number;
  pages: number;
  filteredRecords: number;
  totalRecords: number;
  pageCount: number;
}>;

export type QueryRequest<D, P, T> = {
  path?: T;
  data?: D;
  params?: P;
  merge?: boolean | string | { key: any; reverse?: boolean };
};

export type ErrorResponse = {
  defaultUserMessage: string;
  status: number;
  data: { [key: string]: string };
};

export interface GlobalInitialStateType {
  authUser: AuthUser | null;
  isSideMenu: boolean;
  isRequestDemo: boolean;
  isTicketFilterSideMenu: boolean;
}

export const WEB_CHANNEL_ID = 1;
