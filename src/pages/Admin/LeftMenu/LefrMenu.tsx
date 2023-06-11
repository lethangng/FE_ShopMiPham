import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeThong from "./HeThong";
import Setting from "./Setting";
import { UrlConstants } from "../../../constants";

const LefrMenu = () => {
  const [isToggle, setIsToggle] = useState(false);

  return (
    <>
      {/* Sidebar */}
      <ul
        className={
          "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" +
          (isToggle ? " toggled" : "")
        }
        id="accordionSidebar"
      >
        {/* Sidebar - Brand */}
        <Link
          className="sidebar-brand d-flex align-items-center justify-content-center"
          to={UrlConstants.HOME}
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink" />
          </div>
          <div className="sidebar-brand-text mx-3">Admin</div>
        </Link>
        {/* Divider */}
        <hr className="sidebar-divider my-0" />
        {/* Nav Item - Dashboard */}
        <li className="nav-item active">
          <Link className="nav-link" to={UrlConstants.HOME}>
            <span>Bảng điều khiển</span>
          </Link>
        </li>
        {/* Divider */}
        <hr className="sidebar-divider" />
        {/* Heading */}
        <div className="sidebar-heading">Giao diện</div>
        <HeThong />

        {/* Nav Item - Utilities Collapse Menu */}
        <Setting />

        {/* Divider */}
        <hr className="sidebar-divider" />
        {/* Heading */}
        <div className="sidebar-heading">Hỗ trợ</div>

        {/* Nav Item - Charts */}
        <li className="nav-item">
          <Link className="nav-link" to={UrlConstants.CHART}>
            <i className="fas fa-fw fa-chart-area" />
            <span>Thống kê hóa đơn</span>
          </Link>
        </li>
        {/* Divider */}
        <hr className="sidebar-divider d-none d-md-block" />
        {/* Sidebar Toggler (Sidebar) */}
        <div className="text-center d-none d-md-inline">
          <button
            className="rounded-circle border-0"
            id="sidebarToggle"
            onClick={() => setIsToggle(!isToggle)}
          />
        </div>
      </ul>
      {/* End of Sidebar */}
    </>
  );
};

export default LefrMenu;
