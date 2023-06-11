import { Dispatch } from "redux";
import {
  AccountActionType,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOG_OUT,
  REGITER_FAIL,
  REGITER_REQUEST,
  REGITER_SUCCESS,
  RegiterUser,
} from "./types";
import { userService } from "../../services/user.service";

export const login = (email: string, password: string) => {
  return async (dispatch: Dispatch<AccountActionType>) => {
    dispatch({
      type: LOGIN_REQUEST,
      payload: {
        email,
        password,
      },
    });
    try {
      const res = await userService.login(email, password);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res,
      });
    } catch (error: any) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: {
          error: error.message,
        },
      });
    }
  };
};

export const regiter = (user: RegiterUser) => {
  return async (dispatch: Dispatch<AccountActionType>) => {
    dispatch({
      type: REGITER_REQUEST,
    });
    try {
      const res = await userService.regiter(user);
      dispatch({
        type: REGITER_SUCCESS,
        payload: res,
      });
    } catch (error: any) {
      dispatch({
        type: REGITER_FAIL,
        payload: {
          error: error.message,
        },
      });
    }
  };
};

export const logout = (): AccountActionType => {
  return { type: LOG_OUT };
};
