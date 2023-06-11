import {
  ADD_PRODUCT_TYPE_FAIL,
  ADD_PRODUCT_TYPE_SUCCESS,
  GET_PRODUCT_TYPE_BY_ID_FAIL,
  GET_PRODUCT_TYPE_BY_ID_REQUEST,
  GET_PRODUCT_TYPE_BY_ID_SUCCESS,
  LOAD_PRODUCT_TYPES_FAIL,
  LOAD_PRODUCT_TYPES_REQUEST,
  LOAD_PRODUCT_TYPES_SUCCESS,
  UPDATE_PRODUCT_TYPE_FAIL,
  UPDATE_PRODUCT_TYPE_REQUEST,
  UPDATE_PRODUCT_TYPE_SUCCESS,
  ProductTypesActionTypes,
  ProductTypesState,
} from "./types";

const initState: ProductTypesState = {
  items: [],
  page: 1,
  total: 0,
  loading: false,
  pageSize: 0,
  deleteCount: 0,
  error: null,
  editProductType: null,
};

const productTypesReducer = (
  state: ProductTypesState = initState,
  action: ProductTypesActionTypes
): ProductTypesState => {
  switch (action.type) {
    case LOAD_PRODUCT_TYPES_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOAD_PRODUCT_TYPES_SUCCESS: {
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
    case LOAD_PRODUCT_TYPES_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }
    case ADD_PRODUCT_TYPE_FAIL: {
      return {
        ...state,
        error: action.payload.error,
      };
    }
    case ADD_PRODUCT_TYPE_SUCCESS: {
      return {
        ...state,
        error: null,
      };
    }
    case GET_PRODUCT_TYPE_BY_ID_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_PRODUCT_TYPE_BY_ID_SUCCESS: {
      return {
        ...state,
        editProductType: action.payload.productType,
        loading: false,
      };
    }
    case GET_PRODUCT_TYPE_BY_ID_FAIL: {
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    }
    case UPDATE_PRODUCT_TYPE_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case UPDATE_PRODUCT_TYPE_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
      };
    }
    case UPDATE_PRODUCT_TYPE_FAIL: {
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

export { productTypesReducer };
