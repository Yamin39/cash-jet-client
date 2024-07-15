import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import "./Register.css";

const Register = ({ children }) => {
  return (
    <div className="min-h-screen py-8">
      <ul id="register-nav" className="my-5 p-2 flex bg-[#cdcdcd7e] rounded-full sm:text-[1.4rem]">
        <li className="w-1/2 text-center">
          <NavLink className="register-nav-item p-[0.1875rem] w-full inline-block rounded-[3.125rem]" to="/register-user">
            User registration
          </NavLink>
        </li>
        <li className="w-1/2 text-center">
          <NavLink className="register-nav-item p-[0.1875rem] w-full inline-block rounded-[3.125rem]" to="/register-agent">
            Agent registration
          </NavLink>
        </li>
      </ul>
      <div>{children}</div>
    </div>
  );
};

Register.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Register;
