import {
  BillsActionTypes,
  BillsState,
  GET_BILL_CHART_FAIL,
  GET_BILL_CHART_REQUEST,
  GET_BILL_CHART_SUCCESS,
  LOAD_BILL_REQUEST,
  LOAD_BILL_FAIL,
  LOAD_BILL_SUCCESS,
  GET_BILL_DETAIL_FAIL,
  GET_BILL_DETAIL_REQUEST,
  GET_BILL_DETAIL_SUCCESS,
} from "./types";

const initState: BillsState = {
  charts: [],
  items: [],
  billDetail: [],
  page: 1,
  total: 0,
  loading: false,
  pageSize: 0,
  deleteCount: 0,
  error: null,
};

const billsReducer = (
  state: BillsState = initState,
  action: BillsActionTypes
): BillsState => {
  switch (action.type) {
    case GET_BILL_CHART_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_BILL_CHART_SUCCESS: {
      return {
        ...state,
        charts: action.payload.charts,
        loading: false,
        error: null,
      };
    }
    case GET_BILL_CHART_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }
    case LOAD_BILL_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOAD_BILL_SUCCESS: {
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
    case LOAD_BILL_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }
    case GET_BILL_DETAIL_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_BILL_DETAIL_SUCCESS: {
      return {
        ...state,
        billDetail: action.payload.data,
        total: action.payload.total,
        page: action.payload.page,
        pageSize: action.payload.pageSize,
        loading: false,
        error: null,
      };
    }
    case GET_BILL_DETAIL_FAIL: {
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

export { billsReducer };
