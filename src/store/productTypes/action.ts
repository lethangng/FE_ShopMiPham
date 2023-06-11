import { AnyAction, Dispatch } from "redux";
import {
  ADD_PRODUCT_TYPE_FAIL,
  ADD_PRODUCT_TYPE_REQUEST,
  ADD_PRODUCT_TYPE_SUCCESS,
  DELETE_PRODUCT_TYPES_FAIL,
  DELETE_PRODUCT_TYPES_REQUEST,
  DELETE_PRODUCT_TYPES_SUCCESS,
  GET_PRODUCT_TYPE_BY_ID_FAIL,
  GET_PRODUCT_TYPE_BY_ID_REQUEST,
  GET_PRODUCT_TYPE_BY_ID_SUCCESS,
  IAddProductTypeRequest,
  IUpdateProductTypeRequest,
  LOAD_PRODUCT_TYPES_FAIL,
  LOAD_PRODUCT_TYPES_REQUEST,
  LOAD_PRODUCT_TYPES_SUCCESS,
  UPDATE_PRODUCT_TYPE_FAIL,
  UPDATE_PRODUCT_TYPE_REQUEST,
  UPDATE_PRODUCT_TYPE_SUCCESS,
  ProductTypesActionTypes,
} from "./types";
import { productTypeService } from "services/productType.service";
import { ThunkDispatch } from "redux-thunk";

export const loadProductTypePaging = (
  keyword: string,
  currentPage: number | null
) => {
  return async (dispatch: Dispatch<ProductTypesActionTypes>) => {
    try {
      dispatch({
        type: LOAD_PRODUCT_TYPES_REQUEST,
      });

      const res = await productTypeService.getProductTypesPaging(
        keyword,
        currentPage
      );
      // console.log(res);
      dispatch({
        type: LOAD_PRODUCT_TYPES_SUCCESS,
        payload: res,
      });
    } catch (error: any) {
      dispatch({
        type: LOAD_PRODUCT_TYPES_FAIL,
        payload: {
          error: error.message,
        },
      });
    }
  };
};

export const addProductType = (productType: IAddProductTypeRequest) => {
  return async (dispatch: Dispatch<ProductTypesActionTypes>) => {
    try {
      dispatch({
        type: ADD_PRODUCT_TYPE_REQUEST,
      });
      await productTypeService.addProductType(productType);
      dispatch({
        type: ADD_PRODUCT_TYPE_SUCCESS,
      });
    } catch (error: any) {
      dispatch({
        type: ADD_PRODUCT_TYPE_FAIL,
        payload: {
          error: error.message,
        },
      });
    }
  };
};

export const updateProductType = (
  id: string,
  productType: IUpdateProductTypeRequest
) => {
  return async (dispatch: Dispatch<ProductTypesActionTypes>) => {
    try {
      dispatch({
        type: UPDATE_PRODUCT_TYPE_REQUEST,
      });
      await productTypeService.updateProductType(id, productType);
      dispatch({
        type: UPDATE_PRODUCT_TYPE_SUCCESS,
      });
    } catch (error: any) {
      dispatch({
        type: UPDATE_PRODUCT_TYPE_FAIL,
        payload: {
          error: error.message,
        },
      });
    }
  };
};

export const getProductTypeById = (id: string) => {
  return async (dispatch: Dispatch<ProductTypesActionTypes>) => {
    try {
      dispatch({
        type: GET_PRODUCT_TYPE_BY_ID_REQUEST,
      });
      const res = await productTypeService.getProductTypeById(id);
      dispatch({
        type: GET_PRODUCT_TYPE_BY_ID_SUCCESS,
        payload: {
          productType: res as any,
        },
      });
    } catch (error: any) {
      dispatch({
        type: GET_PRODUCT_TYPE_BY_ID_FAIL,
        payload: {
          error: error.message,
        },
      });
    }
  };
};

export const deleteProductTypes = (productTypeIds: string[]) => {
  return async (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    try {
      dispatch({
        type: DELETE_PRODUCT_TYPES_REQUEST,
      });
      await productTypeService.deleteProductTypes(productTypeIds);
      dispatch({
        type: DELETE_PRODUCT_TYPES_SUCCESS,
      });
      dispatch(loadProductTypePaging("", 1));
    } catch (error: any) {
      dispatch({
        type: DELETE_PRODUCT_TYPES_FAIL,
        payload: {
          error: error.message,
        },
      });
    }
  };
};
