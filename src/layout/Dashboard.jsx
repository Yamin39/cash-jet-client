import toast, { Toaster } from "react-hot-toast";
import { CiLogout } from "react-icons/ci";
import { GoCheckCircleFill } from "react-icons/go";
import { PiWarningCircleFill } from "react-icons/pi";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import Sidebar from "../components/Sidebar/Sidebar";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const { currentUser, loading, logOut } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) {
    return <Loading />;
  }

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
            <div className="flex gap-2 items-center">
              <h5 className="font-semibold text-2xl">{currentUser?.name}</h5>

              {currentUser?.status === "pending" && (
                <div className="tooltip tooltip-bottom cursor-pointer" data-tip="Pending">
                  <PiWarningCircleFill className="text-xl text-orange-400" />
                </div>
              )}

              {currentUser?.status === "activated" && (
                <div className="tooltip tooltip-bottom cursor-pointer" data-tip="Activated">
                  <GoCheckCircleFill className="text-xl text-green-400" />
                </div>
              )}
            </div>
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
            <Outlet></Outlet>
          )}
        </div>
      </div>
      <Toaster></Toaster>
    </div>
  );
};

export default Dashboard;
