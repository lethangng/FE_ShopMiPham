export const LOAD_PRODUCTS_REQUEST = "LOAD_PRODUCTS_REQUEST";
export const LOAD_PRODUCTS_SUCCESS = "LOAD_PRODUCTS_SUCCESS";
export const LOAD_PRODUCTS_FAIL = "LOAD_PRODUCTS_FAIL";

export const ADD_PRODUCT_REQUEST = "ADD_PRODUCT_REQUEST";
export const ADD_PRODUCT_SUCCESS = "ADD_PRODUCT_SUCCESS";
export const ADD_PRODUCT_FAIL = "ADD_PRODUCT_FAIL";

export const GET_PRODUCT_BY_ID_REQUEST = "GET_PRODUCT_BY_ID_REQUEST";
export const GET_PRODUCT_BY_ID_SUCCESS = "GET_PRODUCT_BY_ID_SUCCESS";
export const GET_PRODUCT_BY_ID_FAIL = "GET_PRODUCT_BY_ID_FAIL";

export const UPDATE_PRODUCT_REQUEST = "UPDATE_PRODUCT_REQUEST";
export const UPDATE_PRODUCT_SUCCESS = "UPDATE_PRODUCT_SUCCESS";
export const UPDATE_PRODUCT_FAIL = "UPDATE_PRODUCT_FAIL";

export const DELETE_PRODUCTS_REQUEST = "DELETE_PRODUCTS_REQUEST";
export const DELETE_PRODUCTS_SUCCESS = "DELETE_PRODUCTS_SUCCESS";
export const DELETE_PRODUCTS_FAIL = "DELETE_PRODUCTS_FAIL";

export interface ItemProduct {
  id: string;
  name: string;
  description: string;
  listPhoto: File[];
  importPrice: number;
  quantity: number;
  price: number;
  productTypeId: number | string;
}

export interface IAddProductRequest {
  name: string;
  description: string;
  listPhoto: File[];
  importPrice: number;
  quantity: number;
  price: number;
  productTypeId: number | string;
}

export interface IUpdateProductRequest {
  name: string;
  description: string;
  listPhoto: any[];
  importPrice: number;
  quantity: number;
  price: number;
  productTypeId: number | string;
}

interface AddProductRequest {
  type: typeof ADD_PRODUCT_REQUEST;
}

interface AddProductSuccess {
  type: typeof ADD_PRODUCT_SUCCESS;
}

interface AddProductFail {
  type: typeof ADD_PRODUCT_FAIL;
  payload: {
    error: string;
  };
}

interface LoadProductRequest {
  type: typeof LOAD_PRODUCTS_REQUEST;
}

interface LoadProductSuccess {
  type: typeof LOAD_PRODUCTS_SUCCESS;
  payload: {
    total: number;
    page: number;
    pageSize: number;
    data: ItemProduct[];
  };
}

interface LoadProductFail {
  type: typeof LOAD_PRODUCTS_FAIL;
  payload: {
    error: string;
  };
}

interface GetProductByIdRequest {
  type: typeof GET_PRODUCT_BY_ID_REQUEST;
}

interface GetProductByIdSuccess {
  type: typeof GET_PRODUCT_BY_ID_SUCCESS;
  payload: {
    product: ItemProduct;
  };
}

interface GetProductByIdFail {
  type: typeof GET_PRODUCT_BY_ID_FAIL;
  payload: {
    error: string;
  };
}

interface UpdateProductRequest {
  type: typeof UPDATE_PRODUCT_REQUEST;
}

interface UpdateProductSuccess {
  type: typeof UPDATE_PRODUCT_SUCCESS;
}

interface UpdateProductFail {
  type: typeof UPDATE_PRODUCT_FAIL;
  payload: {
    error: string;
  };
}

interface DeleteProductsRequest {
  type: typeof DELETE_PRODUCTS_REQUEST;
}

interface DeleteProductsSuccess {
  type: typeof DELETE_PRODUCTS_SUCCESS;
}

interface DeleteProductsFail {
  type: typeof DELETE_PRODUCTS_FAIL;
  payload: {
    error: string;
  };
}

export interface ProductsState {
  items: ItemProduct[];
  page: number;
  total: number;
  pageSize: number;
  loading: boolean;
  deleteCount: number;
  error: string | null;
  editProduct: ItemProduct | null;
}

export type ProductsActionTypes =
  | AddProductRequest
  | LoadProductRequest
  | LoadProductSuccess
  | LoadProductFail
  | AddProductFail
  | AddProductSuccess
  | GetProductByIdRequest
  | GetProductByIdSuccess
  | GetProductByIdFail
  | UpdateProductRequest
  | UpdateProductSuccess
  | UpdateProductFail
  | DeleteProductsRequest
  | DeleteProductsSuccess
  | DeleteProductsFail;
