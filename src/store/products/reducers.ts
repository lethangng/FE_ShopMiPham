import {
  ADD_PRODUCT_FAIL,
  ADD_PRODUCT_SUCCESS,
  GET_PRODUCT_BY_ID_FAIL,
  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCT_BY_ID_SUCCESS,
  LOAD_PRODUCTS_FAIL,
  LOAD_PRODUCTS_REQUEST,
  LOAD_PRODUCTS_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  ProductsActionTypes,
  ProductsState,
  ADD_PRODUCT_REQUEST,
} from "./types";

const initState: ProductsState = {
  items: [],
  page: 1,
  total: 0,
  loading: false,
  pageSize: 0,
  deleteCount: 0,
  error: null,
  editProduct: null,
};

const productsReducer = (
  state: ProductsState = initState,
  action: ProductsActionTypes
): ProductsState => {
  switch (action.type) {
    case LOAD_PRODUCTS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOAD_PRODUCTS_SUCCESS: {
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
    case LOAD_PRODUCTS_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }
    case ADD_PRODUCT_FAIL: {
      return {
        ...state,
        error: action.payload.error,
      };
    }
    case ADD_PRODUCT_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case ADD_PRODUCT_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case GET_PRODUCT_BY_ID_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_PRODUCT_BY_ID_SUCCESS: {
      return {
        ...state,
        editProduct: action.payload.product,
        loading: false,
      };
    }
    case GET_PRODUCT_BY_ID_FAIL: {
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    }
    case UPDATE_PRODUCT_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case UPDATE_PRODUCT_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
      };
    }
    case UPDATE_PRODUCT_FAIL: {
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

export { productsReducer };
