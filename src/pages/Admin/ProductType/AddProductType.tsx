import { UrlConstants } from "constants/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppState } from "store";
import { addProductType } from "store/productTypes/action";
import { IAddProductTypeRequest } from "store/productTypes/types";
import { useFormik } from "formik";
import * as Yup from "yup";
import checkNameExist from "helpers/CheckExist/checkName.productType";
import { toast } from "react-toastify";

interface FormValues {
  name: string;
  description: string;
}

const AddProductType = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues: FormValues = {
    name: "",
    description: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Vui lòng nhập loại sản phẩm.")
      .test(
        "name-exist",
        "Tên của loại sản phẩm đã tồn tại.",
        async (value) => {
          const isNameExist = await checkNameExist(value);
          return !isNameExist;
        }
      ),
    description: Yup.string().required("Vui lòng nhập miêu tả."),
  });

  const onSubmit = async (values: FormValues) => {
    const { description, name } = values;
    if (description && name) {
      const productType: IAddProductTypeRequest = {
        name,
        description,
      };
      await dispatch(addProductType(productType) as any);
      navigate(UrlConstants.PRODUCT_TYPE_LIST);
      toast.success("Thêm người dùng thành công!");
    }
  };

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const loading = useSelector<AppState>(
    (state) => state.productTypes.loading
  ) as boolean;

  return (
    <>
      <h1 className="h3 mb-4 text-gray-800">Thêm mới loại sản phẩm</h1>
      <div className="card">
        <div className="card-header">Thông tin loại sản phẩm</div>
        <div className="card-body">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Tên loại sản phẩm</label>
              <input
                type="text"
                className={
                  "form-control" +
                  (formik.touched.name && formik.errors.name
                    ? " is-invalid"
                    : "")
                }
                name="name"
                id="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                // onBlur={formik.handleBlur}
                placeholder="Nhập tên của loại sản phẩm ..."
              />
              {formik.touched.name && formik.errors.name && (
                <div className="invalid-feedback">{formik.errors.name}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="description">Miêu tả</label>
              <input
                type="text"
                className={
                  "form-control" +
                  (formik.touched.description && formik.errors.description
                    ? " is-invalid"
                    : "")
                }
                onChange={formik.handleChange}
                value={formik.values.description}
                name="description"
                id="description"
                placeholder="Vui lòng nhập miêu tả..."
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

export default AddProductType;
