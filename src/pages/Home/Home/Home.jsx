import Loading from "../../../components/Loading/Loading";
import useAuth from "../../../hooks/useAuth";

const Home = () => {
  const { logOut, currentUser, loading } = useAuth();
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="min-h-screen flex justify-center items-center">
      <h1 className="underline font-bold text-3xl">Hello {currentUser?.name}</h1>
      <button className="text-white btn btn-error" onClick={logOut}>
        LogOut
      </button>
    </div>
  );
};

export default Home;
