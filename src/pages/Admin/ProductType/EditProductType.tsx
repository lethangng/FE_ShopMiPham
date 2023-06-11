import { UrlConstants } from "constants/index";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppState } from "store";
import {
  getProductTypeById,
  updateProductType,
} from "store/productTypes/action";
import { IUpdateProductTypeRequest } from "store/productTypes/types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

interface FormValues {
  name: string;
  description: string;
}

const EditProductType = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let id = useParams().id as string;

  const productType = useSelector(
    (state: AppState) => state.productTypes.editProductType
  );
  useEffect(() => {
    dispatch(getProductTypeById(id) as any);
  }, [dispatch, id]);

  useEffect(() => {
    if (productType !== null) {
      formik.setValues({
        description: productType.description,
        name: productType.name,
      });
    }
  }, [productType]);

  const initialValues = {
    description: "",
    name: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Vui lòng nhập loại sản phẩm."),
    description: Yup.string().required("Vui lòng nhập miêu tả."),
  });

  const loading = useSelector<AppState>(
    (state) => state.productTypes.loading
  ) as boolean;

  const onSubmit = async (values: FormValues) => {
    const { name, description } = values;
    console.log(values);
    if (description && name) {
      const productType: IUpdateProductTypeRequest = {
        description,
        name,
      };
      await dispatch(updateProductType(id as any, productType) as any);
      navigate(UrlConstants.PRODUCT_TYPE_LIST);
      toast.success("Sửa loại sản phẩm thành công!");
    }
  };
  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <>
      <h1 className="h3 mb-4 text-gray-800">Cập nhập loại sản phẩm</h1>
      <div className="card">
        <div className="card-header">Thông tin loại sản phẩm</div>
        <div className="card-body">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Tên loại sản phẩm</label>
              <input
                id="name"
                type="text"
                className={"form-control"}
                name="name"
                value={formik.values.name}
                // onChange={formik.handleChange}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Miêu tả</label>
              <input
                id="description"
                type="text"
                className={
                  "form-control" +
                  (formik.touched.description && formik.errors.description
                    ? " is-invalid"
                    : "")
                }
                name="description"
                placeholder="Vui lòng nhập miêu tả ..."
                onChange={formik.handleChange}
                value={formik.values.description}
              />
              {formik.touched.description && formik.errors.description && (
                <div className="invalid-feedback">
                  {formik.errors.description}
                </div>
              )}
            </div>

            <div className="form-group d-flex justify-content-end">
              <button className="btn btn-primary mr-3" type="submit">
                {loading && (
                  <span className="spinner-boder spinner-boder-sm mr-1"></span>
                )}{" "}
                Lưu
              </button>
              <Link
                className="btn btn-danger"
                to={UrlConstants.PRODUCT_TYPE_LIST}
              >
                Hủy
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProductType;
