export const LOAD_PRODUCT_TYPES_REQUEST = "LOAD_PRODUCT_TYPES_REQUEST";
export const LOAD_PRODUCT_TYPES_SUCCESS = "LOAD_PRODUCT_TYPES_SUCCESS";
export const LOAD_PRODUCT_TYPES_FAIL = "LOAD_PRODUCT_TYPES_FAIL";

export const ADD_PRODUCT_TYPE_REQUEST = "ADD_PRODUCT_TYPE_REQUEST";
export const ADD_PRODUCT_TYPE_SUCCESS = "ADD_PRODUCT_TYPE_SUCCESS";
export const ADD_PRODUCT_TYPE_FAIL = "ADD_PRODUCT_TYPE_FAIL";

export const GET_PRODUCT_TYPE_BY_ID_REQUEST = "GET_PRODUCT_TYPE_BY_ID_REQUEST";
export const GET_PRODUCT_TYPE_BY_ID_SUCCESS = "GET_PRODUCT_TYPE_BY_ID_SUCCESS";
export const GET_PRODUCT_TYPE_BY_ID_FAIL = "GET_PRODUCT_TYPE_BY_ID_FAIL";

export const UPDATE_PRODUCT_TYPE_REQUEST = "UPDATE_PRODUCT_TYPE_REQUEST";
export const UPDATE_PRODUCT_TYPE_SUCCESS = "UPDATE_PRODUCT_TYPE_SUCCESS";
export const UPDATE_PRODUCT_TYPE_FAIL = "UPDATE_PRODUCT_TYPE_FAIL";

export const DELETE_PRODUCT_TYPES_REQUEST = "DELETE_PRODUCT_TYPES_REQUEST";
export const DELETE_PRODUCT_TYPES_SUCCESS = "DELETE_PRODUCT_TYPES_SUCCESS";
export const DELETE_PRODUCT_TYPES_FAIL = "DELETE_PRODUCT_TYPES_FAIL";

export interface ItemProductType {
  id: string;
  name: string;
  description: string;
}

export interface IAddProductTypeRequest {
  name: string;
  description: string;
}

export interface IUpdateProductTypeRequest {
  name: string;
  description: string;
}

interface AddProductTypeRequest {
  type: typeof ADD_PRODUCT_TYPE_REQUEST;
}

interface AddProductTypeSuccess {
  type: typeof ADD_PRODUCT_TYPE_SUCCESS;
}

interface AddProductTypeFail {
  type: typeof ADD_PRODUCT_TYPE_FAIL;
  payload: {
    error: string;
  };
}

interface LoadProductTypeRequest {
  type: typeof LOAD_PRODUCT_TYPES_REQUEST;
}

interface LoadProductTypeSuccess {
  type: typeof LOAD_PRODUCT_TYPES_SUCCESS;
  payload: {
    total: number;
    page: number;
    pageSize: number;
    data: ItemProductType[];
  };
}

interface LoadProductTypeFail {
  type: typeof LOAD_PRODUCT_TYPES_FAIL;
  payload: {
    error: string;
  };
}

interface GetProductTypeByIdRequest {
  type: typeof GET_PRODUCT_TYPE_BY_ID_REQUEST;
}

interface GetProductTypeByIdSuccess {
  type: typeof GET_PRODUCT_TYPE_BY_ID_SUCCESS;
  payload: {
    productType: ItemProductType;
  };
}

interface GetProductTypeByIdFail {
  type: typeof GET_PRODUCT_TYPE_BY_ID_FAIL;
  payload: {
    error: string;
  };
}

interface UpdateProductTypeRequest {
  type: typeof UPDATE_PRODUCT_TYPE_REQUEST;
}

interface UpdateProductTypeSuccess {
  type: typeof UPDATE_PRODUCT_TYPE_SUCCESS;
}

interface UpdateProductTypeFail {
  type: typeof UPDATE_PRODUCT_TYPE_FAIL;
  payload: {
    error: string;
  };
}

interface DeleteProductTypesRequest {
  type: typeof DELETE_PRODUCT_TYPES_REQUEST;
}

interface DeleteProductTypesSuccess {
  type: typeof DELETE_PRODUCT_TYPES_SUCCESS;
}

interface DeleteProductTypesFail {
  type: typeof DELETE_PRODUCT_TYPES_FAIL;
  payload: {
    error: string;
  };
}

export interface ProductTypesState {
  items: ItemProductType[];
  page: number;
  total: number;
  pageSize: number;
  loading: boolean;
  deleteCount: number;
  error: string | null;
  editProductType: ItemProductType | null;
}

export type ProductTypesActionTypes =
  | AddProductTypeRequest
  | LoadProductTypeRequest
  | LoadProductTypeSuccess
  | LoadProductTypeFail
  | AddProductTypeFail
  | AddProductTypeSuccess
  | GetProductTypeByIdRequest
  | GetProductTypeByIdSuccess
  | GetProductTypeByIdFail
  | UpdateProductTypeRequest
  | UpdateProductTypeSuccess
  | UpdateProductTypeFail
  | DeleteProductTypesRequest
  | DeleteProductTypesSuccess
  | DeleteProductTypesFail;
