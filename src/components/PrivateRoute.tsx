import { Route, RouteProps, Routes } from "react-router-dom";
import Login from "../pages/Account/Login";
import { AccountState } from "../store/account/types";
import { useSelector } from "react-redux";
import { AppState } from "../store";
// import Admin from '../pages/Admin/Admin';

const PrivateRoute = ({ children, ...rest }: RouteProps): JSX.Element => {
  const account: AccountState = useSelector((state: AppState) => {
    return state.account;
  });
  return account.token ? (
    <Routes>
      <Route {...rest} />
    </Routes>
  ) : (
    <Login />
  );
};

export default PrivateRoute;
