import React from "react";
import { Link } from "react-router-dom";
import { UrlConstants } from "../../../constants";

const Home = () => {
  return (
    <>
      {/* Page Heading */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Quản lý</h1>
      </div>
      {/* Content Row */}
      <div className="row">
        {/* Earnings (Monthly) Card Example */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <Link
                    className="text-200 font-weight-bold text-primary text-uppercase mb-1"
                    to={UrlConstants.USER_LIST}
                  >
                    Quản lý người dùng
                  </Link>
                  {/* <div className="h5 mb-0 font-weight-bold text-gray-800">
                    $40,000
                  </div> */}
                </div>
                <div className="col-auto">
                  {/* <i className="fas fa-calendar fa-2x text-gray-300" /> */}
                  <i className="fas fa-user fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Earnings (Monthly) Card Example */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <Link
                    className="font-weight-bold text-success text-uppercase mb-1 text-200"
                    to={UrlConstants.PRODUCT_TYPE_LIST}
                  >
                    Quản lý loại sản phẩm
                  </Link>
                  {/* <div className="h5 mb-0 font-weight-bold text-gray-800">
                    $215,000
                  </div> */}
                </div>
                <div className="col-auto">
                  {/* <i className="fas fa-dollar-sign fa-2x text-gray-300" /> */}
                  <i className="fas fa-receipt fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Earnings (Monthly) Card Example */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <Link
                    className="text-200 font-weight-bold text-info text-uppercase mb-1"
                    to={UrlConstants.PRODUCT_LIST}
                  >
                    Quản lý sản phẩm
                  </Link>
                </div>
                <div className="col-auto">
                  {/* <i className="fas fa-clipboard-list fa-2x text-gray-300" /> */}
                  <i className="fas fa-shopping-bag fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Pending Requests Card Example */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-200 font-weight-bold text-warning text-uppercase mb-1">
                    Thống kê
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-comments fa-2x text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
