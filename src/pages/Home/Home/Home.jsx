import { Navigate } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import useAuth from "../../../hooks/useAuth";

const Home = () => {
  const { loading } = useAuth();
  if (loading) {
    return <Loading></Loading>;
  }
  return <Navigate to="/dashboard" />;
};

export default Home;
