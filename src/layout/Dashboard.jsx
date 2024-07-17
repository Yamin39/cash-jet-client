import toast, { Toaster } from "react-hot-toast";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import Sidebar from "../components/Sidebar/Sidebar";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const { currentUser, loading, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate("/");
    logOut();
    toast.success("Log out Successful");
  };

  return (
    <div className="flex flex-col md:flex-row font-kanit">
      <div className="flex">
        <Sidebar></Sidebar>
      </div>
      <div className="w-11/12 md:w-auto md:flex-grow max-w-[1440px] mx-auto mt-7 md:mt-0">
        <div className="hidden md:flex items-center gap-10 pr-10 justify-end">
          <div className="leading-[1.4] py-5">
            <h5 className="font-semibold text-2xl">{currentUser?.name}</h5>
            <p>{currentUser?.email}</p>
          </div>
          <div>
            <button className="btn btn-error text-white rounded-full" onClick={handleLogOut}>
              <CiLogout className="text-base" />
              Logout
            </button>
          </div>
        </div>
        <div className="bg-[#F1F1F1] min-h-screen rounded-[2.5rem] md:rounded-none md:rounded-tl-[2.5rem]">
          {loading ? (
            <div className="min-h-screen">
              <Loading></Loading>
            </div>
          ) : (
            // <Outlet></Outlet>
            <div className="p-10">
              <div className="w-full rounded-3xl min-h-96 bg-gray-700"></div>
            </div>
          )}
        </div>
      </div>
      <Toaster></Toaster>
    </div>
  );
};

export default Dashboard;
