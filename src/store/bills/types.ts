export const GET_BILL_CHART_REQUEST = "GET_BILL_CHART_REQUEST";
export const GET_BILL_CHART_SUCCESS = "GET_BILL_CHART_SUCCESS";
export const GET_BILL_CHART_FAIL = "GET_BILL_CHART_FAIL";

export const GET_BILL_DETAIL_REQUEST = "GET_BILL_DETAIL_REQUEST";
export const GET_BILL_DETAIL_SUCCESS = "GET_BILL_DETAIL_SUCCESS";
export const GET_BILL_DETAIL_FAIL = "GET_BILL_DETAIL_FAIL";

export const LOAD_BILL_REQUEST = "LOAD_BILL_REQUEST";
export const LOAD_BILL_SUCCESS = "LOAD_BILL_SUCCESS";
export const LOAD_BILL_FAIL = "LOAD_BILL_FAIL";

export const DELETE_BILLS_REQUEST = "DELETE_BILLS_REQUEST";
export const DELETE_BILLS_SUCCESS = "DELETE_BILLS_SUCCESS";
export const DELETE_BILLS_FAIL = "DELETE_BILLS_FAIL";

export const DELETE_PRODUCT_BILLS_REQUEST = "DELETE_PRODUCT_BILLS_REQUEST";
export const DELETE_PRODUCT_BILLS_SUCCESS = "DELETE_PRODUCT_BILLS_SUCCESS";
export const DELETE_PRODUCT_BILLS_FAIL = "DELETE_PRODUCT_BILLS_FAIL";

export interface ItemBill {
  id: string;
  purchaseDate: number;
  totalMoney: number;
  userId: number;
}

export interface ItemBillDetail {
  id: string;
  billId: number;
  productId: number;
  quantity: number;
}

export interface BillsState {
  items: ItemBill[];
  charts: number[] | null;
  billDetail: ItemBillDetail[];
  page: number;
  total: number;
  pageSize: number;
  deleteCount: number;
  loading: boolean;
  error: string | null;
}

interface GetBillDetailRequest {
  type: typeof GET_BILL_DETAIL_REQUEST;
}
interface GetBillDetailSuccess {
  type: typeof GET_BILL_DETAIL_SUCCESS;
  payload: {
    total: number;
    page: number;
    pageSize: number;
    data: ItemBillDetail[];
  };
}
interface GetBillDetailFailuer {
  type: typeof GET_BILL_DETAIL_FAIL;
  payload: {
    error: string;
  };
}
interface GetBillChartRequest {
  type: typeof GET_BILL_CHART_REQUEST;
}
interface GetBillChartSuccess {
  type: typeof GET_BILL_CHART_SUCCESS;
  payload: {
    charts: number[];
  };
}
interface GetBillChartFailuer {
  type: typeof GET_BILL_CHART_FAIL;
  payload: {
    error: string;
  };
}

interface LoadBillsRequest {
  type: typeof LOAD_BILL_REQUEST;
}
interface LoadBillsSuccess {
  type: typeof LOAD_BILL_SUCCESS;
  payload: {
    total: number;
    page: number;
    pageSize: number;
    data: ItemBill[];
  };
}
interface LoadBillsFail {
  type: typeof LOAD_BILL_FAIL;
  payload: {
    error: string;
  };
}

interface DeleteBillsRequest {
  type: typeof DELETE_BILLS_REQUEST;
}

interface DeleteBillsSuccess {
  type: typeof DELETE_BILLS_SUCCESS;
}

interface DeleteBillsFail {
  type: typeof DELETE_BILLS_FAIL;
  payload: {
    error: string;
  };
}

interface DeleteProductBillsRequest {
  type: typeof DELETE_PRODUCT_BILLS_REQUEST;
}

interface DeleteProductBillsSuccess {
  type: typeof DELETE_PRODUCT_BILLS_SUCCESS;
}

interface DeleteProductBillsFail {
  type: typeof DELETE_PRODUCT_BILLS_FAIL;
  payload: {
    error: string;
  };
}

export type BillsActionTypes =
  | GetBillChartRequest
  | GetBillChartSuccess
  | GetBillChartFailuer
  | LoadBillsRequest
  | LoadBillsSuccess
  | LoadBillsFail
  | DeleteBillsRequest
  | DeleteBillsSuccess
  | DeleteBillsFail
  | GetBillDetailRequest
  | GetBillDetailSuccess
  | GetBillDetailFailuer
  | DeleteProductBillsRequest
  | DeleteProductBillsSuccess
  | DeleteProductBillsFail;
