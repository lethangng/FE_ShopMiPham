import "./App.scss";
import "./styles/scss/sb-admin-2.scss";
import "./styles/font-awesome/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router } from "react-router-dom";

// import PrivateRoute from './components/PrivateRoute';
import AccountRoute from "./components/AccountRoute";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App" id="wrapper">
      <Router>
        <AccountRoute />
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
