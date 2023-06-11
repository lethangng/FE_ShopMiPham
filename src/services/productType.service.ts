import { api } from "helpers/api";
import {
  IAddProductTypeRequest,
  IUpdateProductTypeRequest,
} from "store/productTypes/types";

const getProductTypesPaging = async (
  keyword: string,
  currentPage: number | null
) => {
  try {
    const res = await api.get(
      `v1/product-types/${currentPage}?keyword=${keyword}`
    );
    if (res && res.data && res.data.errCode === 0) {
      return res.data;
    }
    throw Error("Get list products fail!");
  } catch (error: any) {
    throw Error(error.message);
  }
};

const addProductType = async (product: IAddProductTypeRequest) => {
  try {
    const res = await api.post(`/v1/product-type`, product);
    if (res && res.data && res.data.errCode === 0) {
      return res;
    }
    throw Error("Add product fail!");
  } catch (error: any) {
    throw Error(error.message);
  }
};

const updateProductType = async (
  id: string,
  product: IUpdateProductTypeRequest
) => {
  try {
    const res = await api.put(`/v1/product-type/${id}`, product);
    if (res && res.data && res.data.errCode === 0) {
      return res;
    }
    throw Error("Update product fail!");
  } catch (error: any) {
    throw Error(error.message);
  }
};

const getProductTypeById = async (id: string) => {
  try {
    const res = await api.get(`/v1/product-type/${id}`);
    if (res && res.data && res.data.errCode === 0) {
      return res.data.data;
    }
    throw Error("Get product by id fail!");
  } catch (error: any) {
    throw Error(error.message);
  }
};

const deleteProductTypes = async (ids: string[]) => {
  try {
    const body = { data: ids };
    const res = await api.delete("/v1/product-types", body);
    if (res && res.data && res.data.errCode === 0) {
      return res.data.data;
    }
    throw Error("Delete products fail!");
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const productTypeService = {
  getProductTypesPaging,
  addProductType,
  updateProductType,
  getProductTypeById,
  deleteProductTypes,
};
