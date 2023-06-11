import { UrlConstants } from "constants/index";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppState } from "store";
import { getUserById, updateUser } from "store/users/action";
import { IUpdateUserRequest } from "store/users/types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
  roleId: number;
}

const EditUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let id = useParams().id as string;

  const user = useSelector((state: AppState) => state.users.editUser);
  useEffect(() => {
    dispatch(getUserById(id) as any);
  }, [dispatch, id]);

  useEffect(() => {
    if (user !== null) {
      formik.setValues({
        email: user.email,
        name: user.name,
        phone: user.phone ? user.phone : "",
        address: user.address ? user.address : "",
        roleId: user.roleId,
      });
    }
  }, [user]);

  const initialValues = {
    email: "",
    name: "",
    phone: "",
    address: "",
    roleId: 2,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(5, "Tên vui lòng nhập trong khoảng từ 5 đến 35 ký tự.")
      .max(35, "Tên vui lòng nhập trong khoảng từ 5 đến 35 ký tự.")
      .required("Vui lòng nhập tên."),
    email: Yup.string()
      .email("Email không chính xác.")
      .required("Vui lòng nhập email."),
    phone: Yup.string(),
    address: Yup.string(),
    roleId: Yup.number()
      .required("Vui lòng chọn chức vụ")
      .oneOf([1, 2], "Chức vụ không hợp lệ."),
  });

  const loading = useSelector<AppState>(
    (state) => state.users.loading
  ) as boolean;

  const onSubmit = async (values: FormValues) => {
    const { email, name, address, phone, roleId } = values;
    console.log(values);
    if (email && name) {
      const user: IUpdateUserRequest = {
        email,
        name,
        address,
        phone,
        roleId,
      };
      await dispatch(updateUser(id as any, user) as any);
      navigate("/admin/users");
      toast.success("Sửa người dùng thành công!");
    }
  };
  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <>
      <h1 className="h3 mb-4 text-gray-800">Cập nhập người dùng</h1>
      <div className="card">
        <div className="card-header">Thông tin người dùng</div>
        <div className="card-body">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                className={"form-control"}
                name="email"
                value={formik.values.email}
                // onChange={formik.handleChange}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Tên</label>
              <input
                id="name"
                type="text"
                className={
                  "form-control" +
                  (formik.touched.name && formik.errors.name
                    ? " is-invalid"
                    : "")
                }
                name="name"
                placeholder="Nhập tên của bạn ..."
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="invalid-feedback">{formik.errors.name}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="phone">SĐT</label>
              <input
                id="phone"
                type="text"
                className={
                  "form-control" +
                  (formik.touched.phone && formik.errors.phone
                    ? " is-invalid"
                    : "")
                }
                name="phone"
                placeholder="Nhập SĐT của bạn ..."
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="invalid-feedback">{formik.errors.phone}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="address">Địa chỉ</label>
              <input
                id="address"
                type="text"
                className={
                  "form-control" +
                  (formik.touched.address && formik.errors.address
                    ? " is-invalid"
                    : "")
                }
                name="address"
                placeholder="Nhập địa chỉ của bạn ..."
                onChange={formik.handleChange}
                value={formik.values.address}
              />
              {formik.touched.address && formik.errors.address && (
                <div className="invalid-feedback">{formik.errors.address}</div>
              )}
            </div>
            <div className="">
              <label className="mr-2 d-flex">Chức vụ</label>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="roleId"
                  id="adminRoleId"
                  value={1}
                  onChange={formik.handleChange}
                  checked={formik.values.roleId == 1}
                />
                <label className="form-check-label" htmlFor="adminRoleId">
                  Admin
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="roleId"
                  id="userRoleId"
                  value={2}
                  onChange={formik.handleChange}
                  checked={formik.values.roleId == 2}
                />
                <label className="form-check-label" htmlFor="userRoleId">
                  User
                </label>
              </div>
            </div>

            <div className="form-group d-flex justify-content-end">
              <button className="btn btn-primary mr-3" type="submit">
                {loading && (
                  <span className="spinner-boder spinner-boder-sm mr-1"></span>
                )}{" "}
                Lưu
              </button>
              <Link className="btn btn-danger" to={UrlConstants.USER_LIST}>
                Hủy
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditUser;
