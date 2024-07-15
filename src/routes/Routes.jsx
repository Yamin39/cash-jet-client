import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register/Register";
import RegisterAgent from "../pages/Register/RegisterAgent/RegisterAgent";
import RegisterUser from "../pages/Register/RegisterUser/RegisterUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register-user",
        element: (
          <Register>
            <RegisterUser></RegisterUser>
          </Register>
        ),
      },
      {
        path: "/register-agent",
        element: (
          <Register>
            <RegisterAgent></RegisterAgent>
          </Register>
        ),
      },
    ],
  },
]);

export default router;
