import axios, { AxiosInstance } from "axios";
import { AppState, store } from "store";
import { logout } from "store/account/actions";
import {
  REFRESH_TOKEN_FAIL,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
} from "store/account/types";

const apiUpload: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const refreshAccessToken = async (refreshToken: string): Promise<any> => {
  try {
    // Gửi yêu cầu lấy token mới từ server
    const res = await apiUpload.post("/v1/user/refresh-token", {
      refreshToken,
    });
    // console.log(res);
    if (res && res.data && res.data.errCode === 0) {
      return res.data;
    }
    throw Error("Refresh token fail!");
  } catch (error: any) {
    throw Error(error.message);
  }
};

// Lắng nghe sự thay đổi của của trạng thái redux
// Mỗi lần token thay đổi thì tự động set lại token
let currentState = store.getState() as AppState;
store.subscribe(() => {
  let previousState = currentState;
  currentState = store.getState() as AppState;

  if (previousState.account.token !== currentState.account.token) {
    const token = currentState.account.token;

    // Gán token cho request
    if (token) {
      // setAuthToken(token);
      apiUpload.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete apiUpload.defaults.headers.common["Authorization"];
    }
  }
});

apiUpload.interceptors.response.use(
  (res) => res,
  async (err) => {
    // Giữ lại yêu cầu gốc gây lỗi
    const originalRequest = err.config;

    // Kiểm tra lỗi mã trạng thái 401 Unauthorized và không phải là yêu cầu refreshToken đã được gửi trước đó
    if (err.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const currentState = store.getState() as AppState;
      const refreshToken = currentState.account.refreshToken;
      if (refreshToken) {
        try {
          store.dispatch({
            type: REFRESH_TOKEN_REQUEST,
          });
          const res = await refreshAccessToken(refreshToken);

          store.dispatch({
            type: REFRESH_TOKEN_SUCCESS,
            payload: {
              token: res.data.token,
              refreshToken: res.data.refreshToken,
            },
          });
          originalRequest.headers["Authorization"] = `Bearer ${res.data.token}`;

          // Thực hiện lại yêu cầu gốc
          return apiUpload(originalRequest);
        } catch (error: any) {
          store.dispatch({
            type: REFRESH_TOKEN_FAIL,
            payload: {
              error: error.message,
            },
          });
          store.dispatch(logout());
        }
      }
    }
    // Trả về lỗi gốc nếu không phải là lỗi mã trạng thái 401 Unauthorized
    return Promise.reject(err);
  }
);

export { apiUpload };
