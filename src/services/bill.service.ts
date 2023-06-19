import { api } from "helpers/api";

const getBillByYear = async (year: string | number) => {
  try {
    const res = await api.get(`/v1/bill/${year}`);
    // console.log(res.data);

    if (res && res.data && res.data.errCode === 0) {
      return res.data.data;
    }
    throw new Error("Get bill by year fail!");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const revenueBills = async (month: string | number, year: string | number) => {
  try {
    // console.log(month, year);
    const res = await api.get(`/v1/bill-revenue?month=${month}&year=${year}`);
    // console.log(res.data);

    if (res && res.data && res.data.errCode === 0) {
      return res.data.data;
    }
    throw new Error("Get revenue bills fail!");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getBillsPaging = async (keyword: string, currentPage: number | null) => {
  try {
    const res = await api.get(`v1/bills/${currentPage}?keyword=${keyword}`);
    if (res && res.data && res.data.errCode === 0) {
      return res.data;
    }
    throw new Error("Get bill fail!");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const deleteBills = async (ids: string[]) => {
  try {
    const body = { data: ids };
    const res = await api.delete("/v1/bills", body);
    if (res && res.data && res.data.errCode === 0) {
      return res.data.data;
    }
    throw new Error("Delete bills fail!");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getProductBillById = async (
  id: string | number,
  keyword: string,
  currentPage: number | null
) => {
  try {
    const res = await api.get(
      `v1/bill/detail/${id}/${currentPage}?keyword=${keyword}`
    );
    if (res && res.data && res.data.errCode === 0) {
      return res.data;
    }
    throw new Error("Get bill detail fail!");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const deleteProductBills = async (ids: string[]) => {
  try {
    const body = { data: ids };
    const res = await api.delete("/v1/product-bills", body);
    if (res && res.data && res.data.errCode === 0) {
      return res.data.data;
    }
    throw new Error("Delete product bills fail!");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const billService = {
  getBillByYear,
  getBillsPaging,
  deleteBills,
  getProductBillById,
  deleteProductBills,
  revenueBills,
};
