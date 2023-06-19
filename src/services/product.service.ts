import { apiUpload } from "helpers/apiUpload";
import { api } from "helpers/api";
import {
  IAddProductRequest,
  IUpdateProductRequest,
} from "store/products/types";
import JSZip from "jszip";

const getProductsPaging = async (
  keyword: string,
  currentPage: number | null
) => {
  try {
    const res = await api.get(`v1/products/${currentPage}?keyword=${keyword}`);
    if (res && res.data && res.data && res.data.errCode === 0) {
      return res.data;
    }
    throw Error("Get list products fail!");
  } catch (error: any) {
    throw Error(error.message);
  }
};

const addProduct = async (product: IAddProductRequest) => {
  try {
    const formData = new FormData();
    for (let i = 0; i < product.listPhoto.length; i++) {
      formData.append("images", product.listPhoto[i]);
    }
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("importPrice", product.importPrice.toString());
    formData.append("quantity", product.quantity.toString());
    formData.append("price", product.price.toString());
    formData.append("productTypeId", product.productTypeId.toString());

    const res = await apiUpload.post(`/v1/product`, formData);
    if (res && res.data && res.data && res.data.errCode === 0) {
      return res;
    }
    throw Error("Add product fail!");
  } catch (error: any) {
    throw Error(error.message);
  }
};

const updateProduct = async (id: string, product: IUpdateProductRequest) => {
  try {
    const formData = new FormData();
    for (let i = 0; i < product.listPhoto.length; i++) {
      formData.append("images", product.listPhoto[i]);
    }
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("importPrice", product.importPrice.toString());
    formData.append("quantity", product.quantity.toString());
    formData.append("price", product.price.toString());
    formData.append("productTypeId", product.productTypeId.toString());

    const res = await apiUpload.put(`/v1/product/${id}`, formData);
    if (res && res.data && res.data && res.data.errCode === 0) {
      return res;
    }

    throw new Error("Update product fail!");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getProductById = async (id: string) => {
  try {
    const res = await api.get(`/v1/product/${id}`);

    const listImageProducts = await getListImgProducts(id);
    if (res && res.data && res.data && res.data.errCode === 0) {
      return {
        ...res.data.data,
        listPhoto: listImageProducts,
      };
    }
    throw new Error("Get product by id fail!");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const deleteProducts = async (ids: string[]) => {
  try {
    const body = { data: ids };
    const res = await api.delete("/v1/products", body);
    if (res && res.data && res.data && res.data.errCode === 0) {
      return res.data.data;
    }
    throw Error("Delete products fail!");
  } catch (error: any) {
    throw Error(error.message);
  }
};

const getListImgProducts = async (id: string | number) => {
  try {
    const res = await api.get(`/v1/product/upload/${id}`, {
      responseType: "arraybuffer",
    });
    const zipData = res.data;
    const zip = await JSZip.loadAsync(zipData);

    // Giải nén tệp và truy cập danh sách các hình ảnh
    const files = await Promise.all(
      Array.from(Object.values(zip.files)).map(async (file) => {
        const imageBlob = await file.async("blob");
        return new File([imageBlob], file.name);
      })
    );

    // console.log(files);

    return files;
  } catch (error: any) {
    throw Error(error.message);
  }
};

const getTop10Product = async (
  month: string | number,
  year: string | number
) => {
  try {
    const res = await api.get(`/v1/bill/${month}/${year}`);
    // console.log(res.data);

    if (res && res.data && res.data.errCode === 0) {
      return res.data.data;
    }
    throw new Error("Get bill by year fail!");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const productService = {
  getProductsPaging,
  addProduct,
  updateProduct,
  getProductById,
  deleteProducts,
  getListImgProducts,
  getTop10Product,
};
