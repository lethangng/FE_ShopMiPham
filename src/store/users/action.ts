import { AnyAction, Dispatch } from "redux";
import {
  ADD_USER_FAIL,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  DELETE_USERS_FAIL,
  DELETE_USERS_REQUEST,
  DELETE_USERS_SUCCESS,
  GET_USER_BY_ID_FAIL,
  GET_USER_BY_ID_REQUEST,
  GET_USER_BY_ID_SUCCESS,
  IAddUserRequest,
  IUpdateUserRequest,
  LOAD_USERS_FAIL,
  LOAD_USERS_REQUEST,
  LOAD_USERS_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UsersActionTypes,
} from "./types";
import { userService } from "services/user.service";
import { ThunkDispatch } from "redux-thunk";

export const loadUserPaging = (keyword: string, currentPage: number) => {
  return async (dispatch: Dispatch<UsersActionTypes>) => {
    try {
      dispatch({
        type: LOAD_USERS_REQUEST,
      });

      const res = await userService.getUsersPaging(keyword, currentPage);
      dispatch({
        type: LOAD_USERS_SUCCESS,
        payload: res,
      });
    } catch (error: any) {
      dispatch({
        type: LOAD_USERS_FAIL,
        payload: {
          error: error.message,
        },
      });
    }
  };
};

export const addUser = (user: IAddUserRequest) => {
  return async (dispatch: Dispatch<UsersActionTypes>) => {
    try {
      dispatch({
        type: ADD_USER_REQUEST,
      });
      await userService.addUser(user);
      dispatch({
        type: ADD_USER_SUCCESS,
      });
    } catch (error: any) {
      dispatch({
        type: ADD_USER_FAIL,
        payload: {
          error: error.message,
        },
      });
    }
  };
};

export const updateUser = (id: string, user: IUpdateUserRequest) => {
  return async (dispatch: Dispatch<UsersActionTypes>) => {
    try {
      dispatch({
        type: UPDATE_USER_REQUEST,
      });
      await userService.updateUser(id, user);
      dispatch({
        type: UPDATE_USER_SUCCESS,
      });
    } catch (error: any) {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: {
          error: error.message,
        },
      });
    }
  };
};

export const getUserById = (id: string) => {
  return async (dispatch: Dispatch<UsersActionTypes>) => {
    try {
      dispatch({
        type: GET_USER_BY_ID_REQUEST,
      });
      const res = await userService.getUserById(id);
      dispatch({
        type: GET_USER_BY_ID_SUCCESS,
        payload: {
          user: res as any,
        },
      });
    } catch (error: any) {
      dispatch({
        type: GET_USER_BY_ID_FAIL,
        payload: {
          error: error.message,
        },
      });
    }
  };
};

export const deleteUsers = (userIds: string[]) => {
  return async (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    try {
      dispatch({
        type: DELETE_USERS_REQUEST,
      });
      await userService.deleteUsers(userIds);
      dispatch({
        type: DELETE_USERS_SUCCESS,
      });
      dispatch(loadUserPaging("", 1));
    } catch (error: any) {
      dispatch({
        type: DELETE_USERS_FAIL,
        payload: {
          error: error.message,
        },
      });
    }
  };
};
