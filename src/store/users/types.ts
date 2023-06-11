export const LOAD_USERS_REQUEST = "LOAD_USERS_REQUEST";
export const LOAD_USERS_SUCCESS = "LOAD_USERS_SUCCESS";
export const LOAD_USERS_FAIL = "LOAD_USERS_FAIL";

export const ADD_USER_REQUEST = "ADD_USER_REQUEST";
export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
export const ADD_USER_FAIL = "ADD_USER_FAIL";

export const GET_USER_BY_ID_REQUEST = "GET_USER_BY_ID_REQUEST";
export const GET_USER_BY_ID_SUCCESS = "GET_USER_BY_ID_SUCCESS";
export const GET_USER_BY_ID_FAIL = "GET_USER_BY_ID_FAIL";

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAIL = "UPDATE_USER_FAIL";

export const DELETE_USERS_REQUEST = "DELETE_USERS_REQUEST";
export const DELETE_USERS_SUCCESS = "DELETE_USERS_SUCCESS";
export const DELETE_USERS_FAIL = "DELETE_USERS_FAIL";

export interface ItemUser {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  avatar: string | null;
  roleId: number;
}

export interface IAddUserRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  roleId: string | number;
}

export interface IUpdateUserRequest {
  name: string;
  email: string;
  address: string;
  phone: string;
  roleId: string | number;
}

interface AddUserRequest {
  type: typeof ADD_USER_REQUEST;
}

interface AddUserSuccess {
  type: typeof ADD_USER_SUCCESS;
}

interface AddUserFail {
  type: typeof ADD_USER_FAIL;
  payload: {
    error: string;
  };
}

interface LoadUserRequest {
  type: typeof LOAD_USERS_REQUEST;
}

interface LoadUserSuccess {
  type: typeof LOAD_USERS_SUCCESS;
  payload: {
    total: number;
    page: number;
    pageSize: number;
    data: ItemUser[];
  };
}

interface LoadUserFail {
  type: typeof LOAD_USERS_FAIL;
  payload: {
    error: string;
  };
}

interface GetUserByIdRequest {
  type: typeof GET_USER_BY_ID_REQUEST;
}

interface GetUserByIdSuccess {
  type: typeof GET_USER_BY_ID_SUCCESS;
  payload: {
    user: ItemUser;
  };
}

interface GetUserByIdFail {
  type: typeof GET_USER_BY_ID_FAIL;
  payload: {
    error: string;
  };
}

interface UpdateUserRequest {
  type: typeof UPDATE_USER_REQUEST;
}

interface UpdateUserSuccess {
  type: typeof UPDATE_USER_SUCCESS;
}

interface UpdateUserFail {
  type: typeof UPDATE_USER_FAIL;
  payload: {
    error: string;
  };
}

interface DeleteUsersRequest {
  type: typeof DELETE_USERS_REQUEST;
}

interface DeleteUsersSuccess {
  type: typeof DELETE_USERS_SUCCESS;
}

interface DeleteUsersFail {
  type: typeof DELETE_USERS_FAIL;
  payload: {
    error: string;
  };
}

export interface UsersState {
  items: ItemUser[];
  page: number;
  total: number;
  pageSize: number;
  loading: boolean;
  deleteCount: number;
  error: string | null;
  editUser: ItemUser | null;
}

export type UsersActionTypes =
  | AddUserRequest
  | LoadUserRequest
  | LoadUserSuccess
  | LoadUserFail
  | AddUserFail
  | AddUserSuccess
  | GetUserByIdRequest
  | GetUserByIdSuccess
  | GetUserByIdFail
  | UpdateUserRequest
  | UpdateUserSuccess
  | UpdateUserFail
  | DeleteUsersRequest
  | DeleteUsersSuccess
  | DeleteUsersFail;
