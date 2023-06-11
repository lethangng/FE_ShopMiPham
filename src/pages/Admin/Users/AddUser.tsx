import { UrlConstants } from "constants/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppState } from "store";
import { addUser } from "store/users/action";
import { IAddUserRequest } from "store/users/types";
import { useFormik } from "formik";
import * as Yup from "yup";
import checkEmailExist from "helpers/CheckExist/checkEmail";
import { toast } from "react-toastify";
import "./AddUser.scss";
import { useState } from "react";
import "./AddUser.scss";

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  roleId: number;
}

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showComfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showComfirmPassword);
  };

  const initialValues: FormValues = {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    roleId: 2,
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(5, "Tên vui lòng nhập trong khoảng từ 5 đến 35 ký tự.")
      .max(35, "Tên vui lòng nhập trong khoảng từ 5 đến 35 ký tự.")
      .required("Vui lòng nhập tên."),
    email: Yup.string()
      .email("Email không chính xác.")
      .required("Vui lòng nhập email.")
      .test("email-exist", "Email đã tồn tại.", async (value) => {
        const isEmailExist = await checkEmailExist(value);
        return !isEmailExist;
      }),
    password: Yup.string()
      .min(8, "Mật khẩu phải lớn hơn 8 ký tự")
      .required("Vui lòng nhập mật khẩu."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Nhập lại mật khẩu không chính xác.")
      .required("Vui lòng nhập lại mật khẩu."),
    roleId: Yup.number()
      .required("Vui lòng chọn chức vụ")
      .oneOf([1, 2], "Chức vụ không hợp lệ."),
  });

  const onSubmit = async (values: FormValues) => {
    const { email, password, confirmPassword, name, roleId } = values;
    console.log(">>> check", roleId);
    if (email && password && confirmPassword && name && roleId) {
      const user: IAddUserRequest = {
        email,
        password,
        confirmPassword,
        name,
        roleId,
      };
      await dispatch(addUser(user) as any);
      navigate("/admin/users");
      toast.success("Thêm người dùng thành công!");
    }
  };

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const loading = useSelector<AppState>(
    (state) => state.users.loading
  ) as boolean;

  return (
    <>
      <h1 className="h3 mb-4 text-gray-800">Thêm mới người dùng</h1>
      <div className="card">
        <div className="card-header">Thông tin người dùng</div>
        <div className="card-body">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Tên</label>
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
                placeholder="Nhập tên của bạn ..."
              />
              {formik.touched.name && formik.errors.name && (
                <div className="invalid-feedback">{formik.errors.name}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className={
                  "form-control" +
                  (formik.touched.email && formik.errors.email
                    ? " is-invalid"
                    : "")
                }
                onChange={formik.handleChange}
                value={formik.values.email}
                name="email"
                id="email"
                placeholder="email@example.com"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="invalid-feedback">{formik.errors.email}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  className={
                    "form-control form-control-user" +
                    (formik.touched.password && formik.errors.password
                      ? " is-invalid"
                      : "")
                  }
                  id="password"
                  placeholder="Vui lòng nhập mật khẩu ..."
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <span
                  className={`toggle-password ${showPassword ? "show" : ""}`}
                  onClick={handleTogglePasswordVisibility}
                >
                  <i
                    className={`fas ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </span>
                {formik.touched.password && formik.errors.password && (
                  <div className="invalid-feedback">
                    {formik.errors.password}
                  </div>
                )}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password">Nhập lại mật khẩu</label>
              <div className="password-input">
                <input
                  type={showComfirmPassword ? "text" : "password"}
                  className={
                    "form-control form-control-user" +
                    (formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? " is-invalid"
                      : "")
                  }
                  id="confirmPassword"
                  placeholder="Vui lòng nhập lại mật khẩu ..."
                  name="confirmPassword"
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                />
                <span
                  className={`toggle-password ${
                    showComfirmPassword ? "show" : ""
                  }`}
                  onClick={handleToggleConfirmPasswordVisibility}
                >
                  <i
                    className={`fas ${
                      showComfirmPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </span>
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <div className="invalid-feedback">
                      {formik.errors.confirmPassword}
                    </div>
                  )}
              </div>
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

export default AddUser;
