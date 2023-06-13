import { UrlConstants } from "../../../constants";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userService } from "services/user.service";
import { AppState } from "store";
import { logout } from "store/account/actions";
import { AuthenticatedUser } from "store/account/types";

const TopBar = () => {
  const [isShowDropDown, setIsShowDropDown] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector<AppState>(
    (state) => state.account.user
  ) as AuthenticatedUser;

  const [avatar, setAvatar] = useState<File | null>(null);

  useEffect(() => {
    const getAvatar = async (email: string) => {
      if (user) {
        const res = await userService.getAvatarUser(email);
        setAvatar(res);
      }
    };
    getAvatar(user.email);
  }, [user]);

  return (
    <>
      {/* Topbar */}
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        {/* Sidebar Toggle (Topbar) */}
        <button
          id="sidebarToggleTop"
          className="btn btn-link d-md-none rounded-circle mr-3"
        >
          <i className="fa fa-bars" />
        </button>
        {/* Topbar Search */}
        <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
          <div className="input-group">
            <input
              type="text"
              className="form-control bg-light border-0 small"
              placeholder="Search for..."
              aria-label="Search"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button">
                <i className="fas fa-search fa-sm" />
              </button>
            </div>
          </div>
        </form>
        {/* Topbar Navbar */}
        <ul className="navbar-nav ml-auto">
          {/* Nav Item - Search Dropdown (Visible Only XS) */}
          <li className="nav-item dropdown no-arrow d-sm-none">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="searchDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-search fa-fw" />
            </a>
          </li>
          <div className="topbar-divider d-none d-sm-block" />
          {/* Nav Item - User Information */}
          <li className="nav-item dropdown no-arrow">
            <a
              className={"nav-link dropdown-toggle"}
              href="#"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded={isShowDropDown ? "true" : "false"}
              onClick={() => setIsShowDropDown(!isShowDropDown)}
            >
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                {user.name}
              </span>
              <img
                className="img-profile rounded-circle"
                src={avatar ? URL.createObjectURL(avatar) : ""}
                alt="avatar"
              />
            </a>
            {/* Dropdown - User Information */}
            <div
              className={
                "dropdown-menu dropdown-menu-right shadow animated--grow-in" +
                (isShowDropDown ? " show" : "")
              }
              aria-labelledby="userDropdown"
            >
              <Link
                className="dropdown-item"
                to={UrlConstants.INFO}
                onClick={() => setIsShowDropDown(!isShowDropDown)}
              >
                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                Profile
              </Link>
              <div className="dropdown-divider" />
              <a
                className="dropdown-item"
                href="#"
                data-toggle="modal"
                data-target="#logoutModal"
                onClick={() => dispatch(logout())}
              >
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                Logout
              </a>
            </div>
          </li>
        </ul>
      </nav>
      {/* End of Topbar */}
    </>
  );
};

export default TopBar;
