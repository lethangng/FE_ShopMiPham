import { UrlConstants } from "constants/index";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppState } from "store";

const Info = () => {
  const user = useSelector((state: AppState) => state.account.user);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  // console.log(">>> check:", user);

  useEffect(() => {
    if (user !== null) {
      setUserInfo(user);
    }
  }, [user]);

  // const loading = useSelector<AppState>(
  //   (state) => state.productTypes.loading
  // ) as boolean;

  return (
    <>
      <h1 className="h3 mb-4 text-gray-800">Thông tin cá nhân</h1>
      <div className="card">
        <div className="card-header">Thông tin cá nhân</div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label htmlFor="name">Tên</label>
              <input
                id="name"
                type="text"
                className={"form-control"}
                name="name"
                value={userInfo.name}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                className={"form-control"}
                name="email"
                value={userInfo.email}
                readOnly
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">SĐT</label>
              <input
                id="phone"
                type="text"
                className={"form-control"}
                name="phone"
                value={userInfo.phone}
                readOnly
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Địa chỉ</label>
              <input
                id="address"
                type="text"
                className={"form-control"}
                name="address"
                value={userInfo.address}
                readOnly
              />
            </div>

            <div className="form-group d-flex justify-content-end">
              {/* <button className="btn btn-primary mr-3" type="submit">
                {loading && (
                  <span className="spinner-boder spinner-boder-sm mr-1"></span>
                )}{" "}
                Lưu
              </button> */}
              <Link className="btn btn-primary" to={UrlConstants.HOME}>
                Quay lại
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Info;
