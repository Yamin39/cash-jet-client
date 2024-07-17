import PropTypes from "prop-types";
import Loading from "../components/Loading/Loading";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children, role }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen">
        <Loading></Loading>
      </div>
    );
  }

  if (currentUser?.role === role) {
    return children;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl">You don&apos; have permission to access this page</h1>
    </div>
  );
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  role: PropTypes.string.isRequired,
};

export default ProtectedRoute;
