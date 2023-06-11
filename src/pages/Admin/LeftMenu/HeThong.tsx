import React, { useState } from "react";
import { UrlConstants } from "../../../constants";
import { Link } from "react-router-dom";

const HeThong = () => {
  const [isComponentShow, setIsComponentShow] = useState(false);
  return (
    <>
      <li className="nav-item">
        <a
          className={"nav-link " + (isComponentShow ? "" : "collapsed")}
          href="#"
          data-toggle="collapse"
          data-target="#collapseTwo"
          aria-expanded={isComponentShow ? "true" : "false"}
          aria-controls="collapseTwo"
          onClick={() => setIsComponentShow(!isComponentShow)}
        >
          <i className="fas fa-fw fa-cog" />
          <span>Hệ thống</span>
        </a>
        <div
          id="collapseTwo"
          className={"collapse " + (isComponentShow ? "show" : "")}
          aria-labelledby="headingTwo"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Quản lý:</h6>
            <Link className="collapse-item" to={UrlConstants.USER_LIST}>
              Người dùng
            </Link>
            <Link className="collapse-item" to={UrlConstants.PRODUCT_TYPE_LIST}>
              Loại sản phẩm
            </Link>
            <Link className="collapse-item" to={UrlConstants.PRODUCT_LIST}>
              Sản phẩm
            </Link>
          </div>
        </div>
      </li>
    </>
  );
};

export default HeThong;
