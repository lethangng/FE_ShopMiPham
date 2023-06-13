import { api } from "helpers/api";
import { RegiterUser } from "store/account/types";
import { IAddUserRequest, IUpdateUserRequest } from "store/users/types";

const login = async (email: string, password: string) => {
  try {
    const body = { email, password };
    const res = await api.post(`v1/user/login`, body);
    if (res && res.data && res.data && res.data.errCode === 0) {
      return res.data;
    }
    throw Error("Login fail!");
  } catch (error: any) {
    throw Error(error.message);
  }
};

const regiter = async (user: RegiterUser) => {
  try {
    const res = await api.post(`v1/user/signup`, user);
    if (res && res.data && res.data && res.data.errCode === 0) {
      return res.data;
    }
    throw new Error("Regiter fail!");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getUsersPaging = async (keyword: string, currentPage: number | null) => {
  try {
    const res = await api.get(`v1/users/${currentPage}?keyword=${keyword}`);
    if (res && res.data && res.data && res.data.errCode === 0) {
      return res.data;
    }
    throw new Error("Get list users fail!");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const addUser = async (user: IAddUserRequest) => {
  try {
    const res = await api.post(`/v1/user/create`, user);
    if (res && res.data && res.data && res.data.errCode === 0) {
      return res;
    }
    throw new Error("Add user fail!");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const updateUser = async (id: string, user: IUpdateUserRequest) => {
  try {
    const res = await api.put(`/v1/user/${id}`, user);
    if (res && res.data && res.data && res.data.errCode === 0) {
      return res;
    }
    throw new Error("Update user fail!");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getUserById = async (id: string) => {
  try {
    const res = await api.get(`/v1/user/${id}`);
    if (res && res.data && res.data && res.data.errCode === 0) {
      return res.data.data;
    }
    throw new Error("Get user by id fail!");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const deleteUsers = async (ids: string[]) => {
  try {
    const body = { data: ids };
    const res = await api.delete("/v1/users", body);
    if (res && res.data && res.data && res.data.errCode === 0) {
      return res.data.data;
    }
    throw new Error("Delete users fail!");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getAvatarUser = async (email: string) => {
  // console.log(email);
  try {
    const body = {
      email,
    };
    const res = await api.post("/v1/user/info", body, { responseType: "blob" });
    if (res) {
      // console.log(res);
      // console.log(new File([res.data], res.data.file));
      return new File([res.data], "avatar.jpg");
    }
    throw new Error("Get avatar user fail!");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const userService = {
  login,
  getUsersPaging,
  addUser,
  updateUser,
  getUserById,
  deleteUsers,
  regiter,
  getAvatarUser,
};
