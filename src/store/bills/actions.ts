import { AnyAction, Dispatch } from "redux";
import {
  GET_BILL_CHART_FAIL,
  GET_BILL_CHART_REQUEST,
  GET_BILL_CHART_SUCCESS,
  BillsActionTypes,
  LOAD_BILL_FAIL,
  LOAD_BILL_REQUEST,
  LOAD_BILL_SUCCESS,
  DELETE_BILLS_FAIL,
  DELETE_BILLS_REQUEST,
  DELETE_BILLS_SUCCESS,
  GET_BILL_DETAIL_FAIL,
  GET_BILL_DETAIL_REQUEST,
  GET_BILL_DETAIL_SUCCESS,
  DELETE_PRODUCT_BILLS_FAIL,
  DELETE_PRODUCT_BILLS_REQUEST,
  DELETE_PRODUCT_BILLS_SUCCESS,
} from "./types";
import { billService } from "services/bill.service";
import { ThunkDispatch } from "redux-thunk";

export const loadBillChartPaging = (year: number | string) => {
  return async (dispatch: Dispatch<BillsActionTypes>) => {
    try {
      dispatch({
        type: GET_BILL_CHART_REQUEST,
      });

      const res = await billService.getBillByYear(year);
      // console.log(">>> check res", res);
      dispatch({
        type: GET_BILL_CHART_SUCCESS,
        payload: { charts: res },
      });
    } catch (error: any) {
      dispatch({
        type: GET_BILL_CHART_FAIL,
        payload: {
          error: error.message,
        },
      });
    }
  };
};

export const loadBillPaging = (keyword: string, currentPage: number | null) => {
  return async (dispatch: Dispatch<BillsActionTypes>) => {
    try {
      dispatch({
        type: LOAD_BILL_REQUEST,
      });

      const res = await billService.getBillsPaging(keyword, currentPage);
      // console.log(res);
      dispatch({
        type: LOAD_BILL_SUCCESS,
        payload: res,
      });
    } catch (error: any) {
      dispatch({
        type: LOAD_BILL_FAIL,
        payload: {
          error: error.message,
        },
      });
    }
  };
};

export const deleteBills = (billIds: string[]) => {
  return async (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    try {
      dispatch({
        type: DELETE_BILLS_REQUEST,
      });
      await billService.deleteBills(billIds);
      dispatch({
        type: DELETE_BILLS_SUCCESS,
      });
      dispatch(loadBillPaging("", 1));
    } catch (error: any) {
      dispatch({
        type: DELETE_BILLS_FAIL,
        payload: {
          error: error.message,
        },
      });
    }
  };
};

export const getBillDetail = (
  id: number | string,
  keyword: string,
  currentPage: number
) => {
  return async (dispatch: Dispatch<BillsActionTypes>) => {
    try {
      dispatch({
        type: GET_BILL_DETAIL_REQUEST,
      });

      const res = await billService.getProductBillById(
        id,
        keyword,
        currentPage
      );
      dispatch({
        type: GET_BILL_DETAIL_SUCCESS,
        payload: res,
      });
    } catch (error: any) {
      dispatch({
        type: GET_BILL_DETAIL_FAIL,
        payload: {
          error: error.message,
        },
      });
    }
  };
};

export const deleteProductBills = (billIds: string[]) => {
  return async (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    try {
      dispatch({
        type: DELETE_PRODUCT_BILLS_REQUEST,
      });
      await billService.deleteProductBills(billIds);
      dispatch({
        type: DELETE_PRODUCT_BILLS_SUCCESS,
      });
      dispatch(loadBillPaging("", 1));
    } catch (error: any) {
      dispatch({
        type: DELETE_PRODUCT_BILLS_FAIL,
        payload: {
          error: error.message,
        },
      });
    }
  };
};
