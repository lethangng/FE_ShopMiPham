import {
  ADD_USER_FAIL,
  ADD_USER_SUCCESS,
  GET_USER_BY_ID_FAIL,
  GET_USER_BY_ID_REQUEST,
  GET_USER_BY_ID_SUCCESS,
  LOAD_USERS_FAIL,
  LOAD_USERS_REQUEST,
  LOAD_USERS_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UsersActionTypes,
  UsersState,
} from "./types";

const initState: UsersState = {
  items: [],
  page: 1,
  total: 0,
  loading: false,
  pageSize: 0,
  deleteCount: 0,
  error: null,
  editUser: null,
};

const usersReducer = (
  state: UsersState = initState,
  action: UsersActionTypes
): UsersState => {
  switch (action.type) {
    case LOAD_USERS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOAD_USERS_SUCCESS: {
      return {
        ...state,
        items: action.payload.data,
        total: action.payload.total,
        page: action.payload.page,
        pageSize: action.payload.pageSize,
        loading: false,
        error: null,
      };
    }
    case LOAD_USERS_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }
    case ADD_USER_FAIL: {
      return {
        ...state,
        error: action.payload.error,
      };
    }
    case ADD_USER_SUCCESS: {
      return {
        ...state,
        error: null,
      };
    }
    case GET_USER_BY_ID_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_USER_BY_ID_SUCCESS: {
      return {
        ...state,
        editUser: action.payload.user,
        loading: false,
      };
    }
    case GET_USER_BY_ID_FAIL: {
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    }
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
      };
    }
    case UPDATE_USER_FAIL: {
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

export { usersReducer };
