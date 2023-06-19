import { Route, RouteProps, Routes } from "react-router-dom";
import Login from "../pages/Account/Login";
import { AccountState } from "../store/account/types";
import { useSelector } from "react-redux";
import { AppState } from "../store";
import { Navigate } from "react-router-dom";
import Admin from "pages/Admin/Admin";
import Home from "pages/Admin/Home/Home";
import Users from "pages/Admin/Users/Users";
import NotFound from "pages/NotFound";
import AddUser from "pages/Admin/Users/AddUser";
import EditUser from "pages/Admin/Users/EditUser";
import { UrlConstants } from "../constants";
import ProductType from "pages/Admin/ProductType/ProductType";
import AddProductType from "pages/Admin/ProductType/AddProductType";
import EditProductType from "pages/Admin/ProductType/EditProductType";
import Product from "pages/Admin/Product/Product";
import AddProduct from "pages/Admin/Product/AddProduct";
import EditProduct from "pages/Admin/Product/EditProduct";
// import UploadForm from "./UploadForm/UploadForm";
import DetailProduct from "pages/Admin/Product/DetailProduct";
import Regiter from "pages/Account/Regiter";
import ChartBill from "pages/Admin/Chart/ChartBill";
import Bill from "pages/Admin/Bill/Bill";
import DetailBill from "pages/Admin/Bill/DetailBill";
import Info from "pages/Admin/Info/Info";
import ChartTop10Product from "pages/Admin/Chart/ChartTop10Product";
import ChartRevenue from "pages/Admin/Chart/ChartRevenue";

function AccountRoute({ path, ...rest }: RouteProps) {
  const account: AccountState = useSelector((state: AppState) => {
    return state.account;
  });
  return (
    <Routes>
      <Route path="/" element={<Navigate to={UrlConstants.LOGIN} />} />
      <Route path={UrlConstants.LOGIN} element={<Login />} />
      <Route
        path={path}
        element={
          account.token ? (
            <Admin />
          ) : (
            <Navigate to={UrlConstants.LOGIN} replace />
          )
        }
      >
        {/* Route users */}
        <Route index path={UrlConstants.HOME} element={<Home />} />
        <Route path={`${UrlConstants.USER_LIST}`} element={<Users />} />
        <Route path={`${UrlConstants.USER_ADD}`} element={<AddUser />} />
        <Route path={`${UrlConstants.USER_EDIT}/:id`} element={<EditUser />} />

        {/* Router productType */}
        <Route
          path={`${UrlConstants.PRODUCT_TYPE_LIST}`}
          element={<ProductType />}
        />
        <Route
          path={`${UrlConstants.PRODUCT_TYPE_ADD}`}
          element={<AddProductType />}
        />
        <Route
          path={`${UrlConstants.PRODUCT_TYPE_EDIT}/:id`}
          element={<EditProductType />}
        />

        {/* Router product */}
        <Route path={`${UrlConstants.PRODUCT_LIST}`} element={<Product />} />
        <Route path={`${UrlConstants.PRODUCT_ADD}`} element={<AddProduct />} />
        <Route
          path={`${UrlConstants.PRODUCT_EDIT}/:id`}
          element={<EditProduct />}
        />
        <Route
          path={`${UrlConstants.PRODUCT_DETAIL}/:id`}
          element={<DetailProduct />}
        />
        <Route path={UrlConstants.CHART_BILL} element={<ChartBill />} />
        <Route
          path={UrlConstants.CHART_TOP_10_PRODUCT}
          element={<ChartTop10Product />}
        />
        <Route path={UrlConstants.CHART_REVENUE} element={<ChartRevenue />} />
        <Route path={UrlConstants.BILL_LIST} element={<Bill />} />
        <Route
          path={`${UrlConstants.BILL_DETAIL}/:id/:page`}
          element={<DetailBill />}
        />
        <Route path={`${UrlConstants.INFO}`} element={<Info />} />
      </Route>
      <Route path={UrlConstants.REGITER} element={<Regiter />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AccountRoute;
