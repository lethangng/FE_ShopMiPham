import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import checkEmailExist from "helpers/CheckExist/checkEmail";
import { regiter } from "store/account/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppState } from "store";
import { toast } from "react-toastify";
import { UrlConstants } from "../../constants";
import "./Regiter.scss";

interface FormValues {
  email: string;
  password: string;
  phone: string;
  name: string;
  confirmPassword: string;
  address: string;
}

const phoneRegExp = /^[0-9]{10}$/;

const Regiter = () => {
  const initialValues: FormValues = {
    email: "",
    password: "",
    phone: "",
    name: "",
    confirmPassword: "",
    address: "",
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showComfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showComfirmPassword);
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Vui lòng nhập email.")
      .test("mail-exist", "Email đã tồn tại.", async (value) => {
        const isNameExist = await checkEmailExist(value);
        // true thì cho qua, false thì giữ lại
        return !isNameExist;
      }),
    password: Yup.string()
      .required("Vui lòng nhập mật khẩu.")
      .min(8, "Mật khẩu phải lớn hơn 8 ký tự"),
    confirmPassword: Yup.string()
      .required("Vui lòng nhập lại mật khẩu")
      .oneOf([Yup.ref("password")], "Nhập lại mật khẩu không chính xác."),
    name: Yup.string()
      .required("Vui lòng nhập tên")
      .max(35, "Vui lòng nhập tên dưới 35 ký tự"),
    address: Yup.string().required("Vui lòng nhập địa chỉ."),
    phone: Yup.string()
      .required("Vui lòng nhập SĐT")
      .matches(phoneRegExp, "Số điện thoại không hợp lệ"),
  });

  const loading = useSelector<AppState>((state) => {
    return state.account.loading;
  }) as boolean;

  const onSubmit = async (values: FormValues) => {
    const { email, password, confirmPassword, name, phone, address } = values;
    if (email && password && confirmPassword && name && phone && address) {
      const user = {
        email,
        password,
        confirmPassword,
        name,
        phone,
        address,
      };
      await dispatch(regiter(user) as any);
      navigate(UrlConstants.LOGIN);
      toast.success("Đăng ký thành công!");
    }
  };

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="container">
      <div className="card o-hidden border-0 shadow-lg my-5">
        <div className="card-body p-0">
          {/* Nested Row within Card Body */}
          <div className="row">
            <div className="col-lg-5 d-none d-lg-block bg-login-image" />
            <div className="col-lg-7">
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-4">Tạo mới tài khoản!</h1>
                </div>
                <form className="user" onSubmit={formik.handleSubmit}>
                  <div className="form-group row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                      <input
                        type="text"
                        className={
                          "form-control form-control-user" +
                          (formik.touched.name && formik.errors.name
                            ? " is-invalid"
                            : "")
                        }
                        id="name"
                        placeholder="Tên"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                      />
                      {formik.touched.name && formik.errors.name && (
                        <div className="invalid-feedback">
                          {formik.errors.name}
                        </div>
                      )}
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className={
                          "form-control form-control-user" +
                          (formik.touched.phone && formik.errors.phone
                            ? " is-invalid"
                            : "")
                        }
                        id="sdt"
                        placeholder="SĐT"
                        name="phone"
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                      />
                      {formik.touched.phone && formik.errors.phone && (
                        <div className="invalid-feedback">
                          {formik.errors.phone}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className={
                        "form-control form-control-user" +
                        (formik.touched.email && formik.errors.email
                          ? " is-invalid"
                          : "")
                      }
                      id="email"
                      placeholder="Email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="invalid-feedback">
                        {formik.errors.email}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className={
                        "form-control form-control-user" +
                        (formik.touched.address && formik.errors.address
                          ? " is-invalid"
                          : "")
                      }
                      id="address"
                      placeholder="Địa chỉ"
                      onChange={formik.handleChange}
                      value={formik.values.address}
                    />
                    {formik.touched.address && formik.errors.address && (
                      <div className="invalid-feedback">
                        {formik.errors.address}
                      </div>
                    )}
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-6 mb-3 mb-sm-0 password-input">
                      <input
                        type={showPassword ? "text" : "password"}
                        className={
                          "form-control form-control-user" +
                          (formik.touched.password && formik.errors.password
                            ? " is-invalid"
                            : "")
                        }
                        id="password"
                        placeholder="Mật khẩu"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                      />
                      <span
                        className={`toggle-password ${
                          showPassword ? "show" : ""
                        }`}
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
                    <div className="col-sm-6 password-input">
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
                        placeholder="Nhập lại mật khẩu"
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
                  <button
                    type="submit"
                    className="btn btn-primary btn-user btn-block"
                  >
                    {loading && (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}{" "}
                    Đăng ký
                  </button>
                </form>
                <hr />
                <div className="text-center">
                  <a className="small" href="#">
                    Quên mật khẩu?
                  </a>
                </div>
                <div className="text-center">
                  <Link className="small" to={UrlConstants.LOGIN}>
                    Đã có tài khoản? Đăng nhập!
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Regiter;
