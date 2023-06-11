import { AnyAction, Dispatch } from "redux";
import {
  ADD_PRODUCT_FAIL,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  DELETE_PRODUCTS_FAIL,
  DELETE_PRODUCTS_REQUEST,
  DELETE_PRODUCTS_SUCCESS,
  GET_PRODUCT_BY_ID_FAIL,
  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCT_BY_ID_SUCCESS,
  IAddProductRequest,
  IUpdateProductRequest,
  LOAD_PRODUCTS_FAIL,
  LOAD_PRODUCTS_REQUEST,
  LOAD_PRODUCTS_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  ProductsActionTypes,
} from "./types";
import { productService } from "services/product.service";
import { ThunkDispatch } from "redux-thunk";

export const loadProductPaging = (keyword: string, currentPage: number) => {
  return async (dispatch: Dispatch<ProductsActionTypes>) => {
    try {
      dispatch({
        type: LOAD_PRODUCTS_REQUEST,
      });

      const res = await productService.getProductsPaging(keyword, currentPage);
      dispatch({
        type: LOAD_PRODUCTS_SUCCESS,
        payload: res,
      });
    } catch (error: any) {
      dispatch({
        type: LOAD_PRODUCTS_FAIL,
        payload: {
          error: error.message,
        },
      });
    }
  };
};

export const addProduct = (product: IAddProductRequest) => {
  return async (dispatch: Dispatch<ProductsActionTypes>) => {
    try {
      dispatch({
        type: ADD_PRODUCT_REQUEST,
      });
      await productService.addProduct(product);
      dispatch({
        type: ADD_PRODUCT_SUCCESS,
      });
    } catch (error: any) {
      dispatch({
        type: ADD_PRODUCT_FAIL,
        payload: {
          error: error.message,
        },
      });
    }
  };
};

export const updateProduct = (id: string, product: IUpdateProductRequest) => {
  return async (dispatch: Dispatch<ProductsActionTypes>) => {
    try {
      dispatch({
        type: UPDATE_PRODUCT_REQUEST,
      });
      await productService.updateProduct(id, product);
      dispatch({
        type: UPDATE_PRODUCT_SUCCESS,
      });
    } catch (error: any) {
      dispatch({
        type: UPDATE_PRODUCT_FAIL,
        payload: {
          error: error.message,
        },
      });
    }
  };
};

export const getProductById = (id: string) => {
  return async (dispatch: Dispatch<ProductsActionTypes>) => {
    try {
      dispatch({
        type: GET_PRODUCT_BY_ID_REQUEST,
      });
      const res = await productService.getProductById(id);
      dispatch({
        type: GET_PRODUCT_BY_ID_SUCCESS,
        payload: {
          product: res as any,
        },
      });
    } catch (error: any) {
      dispatch({
        type: GET_PRODUCT_BY_ID_FAIL,
        payload: {
          error: error.message,
        },
      });
    }
  };
};

export const deleteProducts = (productIds: string[]) => {
  return async (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    try {
      dispatch({
        type: DELETE_PRODUCTS_REQUEST,
      });
      await productService.deleteProducts(productIds);
      dispatch({
        type: DELETE_PRODUCTS_SUCCESS,
      });
      dispatch(loadProductPaging("", 1));
    } catch (error: any) {
      dispatch({
        type: DELETE_PRODUCTS_FAIL,
        payload: {
          error: error.message,
        },
      });
    }
  };
};
