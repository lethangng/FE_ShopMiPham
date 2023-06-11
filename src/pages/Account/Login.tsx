import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../store";
import { useDispatch } from "react-redux";
import { login, logout } from "../../store/account/actions";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import "./Login.scss";
// import checkLogin from "helpers/CheckExist/checkLogin";
import checkEmailExist from "helpers/CheckExist/checkEmail";
import { UrlConstants } from "../../constants";

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Vui lòng nhập email.")
      .test("mail-exist", "Email không chính xác", async (value) => {
        const isNameExist = await checkEmailExist(value);
        // true thì cho qua, false thì giữ lại
        return isNameExist;
      }),
    password: Yup.string().required("Vui lòng nhập mật khẩu."),
    // .test(
    //   "password-exsit",
    //   "Mật khẩu không chính xác.",
    //   async (value, context) => {
    //     const email = context.parent?.email;
    //     console.log(email);
    //     const isLogin = await checkLogin(email, value);
    //     // true thì cho qua, false thì giữ lại
    //     return email && isLogin;
    //   }
    // ),
  });

  const loading = useSelector<AppState>((state) => {
    return state.account.loading;
  }) as boolean;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  const onSubmit = async (values: FormValues) => {
    const { email, password } = values;
    if (email && password) {
      await dispatch(login(email, password) as any);
      navigate("/admin", { replace: true });
    }
  };

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="container">
      {/* Outer Row */}
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              {/* Nested Row within Card Body */}
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                    </div>
                    <form
                      className="user"
                      // onSubmit={(event) => handleSubmit(event)}
                      onSubmit={formik.handleSubmit}
                    >
                      <div className="form-group">
                        <input
                          type="email"
                          className={
                            "form-control form-control-user " +
                            (formik.touched.email && formik.errors.email
                              ? " is-invalid"
                              : "")
                          }
                          id="exampleInputEmail"
                          aria-describedby="emailHelp"
                          placeholder="Vui lòng nhập email ..."
                          // onChange={(event) => handleChangeInputs(event)}
                          name="email"
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
                            placeholder="Vui lòng nhập mật khẩu"
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
                          {formik.touched.password &&
                            formik.errors.password && (
                              <div className="invalid-feedback">
                                {formik.errors.password}
                              </div>
                            )}
                        </div>
                      </div>

                      <div className="form-group">
                        <button
                          className="btn btn-primary btn-user btn-block"
                          type="submit"
                        >
                          {loading && (
                            <span className="spinner-border spinner-border-sm mr-1"></span>
                          )}{" "}
                          Đăng nhập
                        </button>
                      </div>
                    </form>
                    <hr />
                    <div className="text-center">
                      <a className="small" href="#">
                        Quên mật khẩu?
                      </a>
                    </div>
                    <div className="text-center">
                      <Link className="small" to={UrlConstants.REGITER}>
                        Tạo tài khoản mới!
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
