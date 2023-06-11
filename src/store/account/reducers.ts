import {
  AccountState,
  AccountActionType,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAIL,
  REGITER_REQUEST,
  REGITER_SUCCESS,
  REGITER_FAIL,
} from "./types";
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOG_OUT } from "./types";

const initState: AccountState = {
  user: null,
  loading: false,
  error: null,
  token: null,
  refreshToken: null,
};

const accountReducer = (
  state: AccountState = initState,
  action: AccountActionType
): AccountState => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return { ...state, loading: true };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        user: action.payload.user,
      };
    }

    case LOGIN_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }
    case LOG_OUT: {
      return {
        ...state,
        user: null,
        token: null,
        refreshToken: null,
        error: null,
      };
    }
    case REFRESH_TOKEN_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
      };
    }
    case REFRESH_TOKEN_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }
    case REGITER_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case REGITER_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case REGITER_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }

    default: {
      return state;
    }
  }
};

export { accountReducer };
