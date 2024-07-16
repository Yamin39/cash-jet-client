import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen">
        <Loading></Loading>
      </div>
    );
  }
  console.log({ currentUser, loading });

  if (currentUser || localStorage.getItem("token")) {
    return children;
  }

  return <Navigate to="/login"></Navigate>;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
