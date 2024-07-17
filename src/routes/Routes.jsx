import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layout/Dashboard";
import Root from "../layout/Root";
import ManageUsers from "../pages/DashboardPages/AdminPages/ManageUsers/ManageUsers";
import Overview from "../pages/DashboardPages/Overview/Overview";
import CashIn from "../pages/DashboardPages/UserPages/CashIn/CashIn";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register/Register";
import PrivateRoute from "./PrivateRoute";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Home></Home>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>,
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/overview",
        element: <Overview></Overview>,
      },

      // user routes
      {
        path: "/dashboard/cash-in",
        element: (
          <ProtectedRoute role="user">
            <CashIn></CashIn>
          </ProtectedRoute>
        ),
      },

      // admins routes
      {
        path: "/dashboard/manage-users",
        element: (
          <ProtectedRoute role="admin">
            <ManageUsers></ManageUsers>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
