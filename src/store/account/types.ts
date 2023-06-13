export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOG_OUT = "LOG_OUT";

export const REFRESH_TOKEN_REQUEST = "REFRESH_TOKEN_REQUEST";
export const REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS";
export const REFRESH_TOKEN_FAIL = "REFRESH_TOKEN_FAIL";

export const REGITER_REQUEST = "REGITER_REQUEST";
export const REGITER_SUCCESS = "REGITER_SUCCESS";
export const REGITER_FAIL = "REGITER_FAIL";

export interface AuthenticatedUser {
  name: string;
  email: string;
  avatar: string;
  address: string;
  phone: string;
}

export interface RegiterUser {
  name: string;
  email: string;
  address: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface AccountState {
  user: AuthenticatedUser | null;
  loading: boolean;
  error: string | null;
  token: string | null;
  refreshToken: string | null;
}

interface loginRequest {
  type: typeof LOGIN_REQUEST;
  payload: {
    email: string;
    password: string;
  };
}
interface loginSuccess {
  type: typeof LOGIN_SUCCESS;
  payload: {
    user: AuthenticatedUser;
    token: string | null;
    refreshToken: string | null;
  };
}
interface loginFailuer {
  type: typeof LOGIN_FAILURE;
  payload: {
    error: string;
  };
}

interface RegiterRequest {
  type: typeof REGITER_REQUEST;
}

interface RegiterSuccess {
  type: typeof REGITER_SUCCESS;
  payload: {
    // user: RegiterUser;
  };
}
interface RegiterFail {
  type: typeof REGITER_FAIL;
  payload: {
    error: string;
  };
}

interface logout {
  type: typeof LOG_OUT;
}

interface RefershTokenRequest {
  type: typeof REFRESH_TOKEN_REQUEST;
}

interface RefershTokenSuccess {
  type: typeof REFRESH_TOKEN_SUCCESS;
  payload: {
    token: string;
    refreshToken: string;
  };
}

interface RefershTokenFail {
  type: typeof REFRESH_TOKEN_FAIL;
  payload: {
    error: string;
  };
}

export type AccountActionType =
  | loginRequest
  | loginSuccess
  | loginFailuer
  | logout
  | RefershTokenRequest
  | RefershTokenSuccess
  | RefershTokenFail
  | RegiterRequest
  | RegiterSuccess
  | RegiterFail;
