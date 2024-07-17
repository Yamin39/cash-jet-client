import toast, { Toaster } from "react-hot-toast";
import { CiLogout } from "react-icons/ci";
import { GoCheckCircleFill } from "react-icons/go";
import { ImBlocked } from "react-icons/im";
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

              {currentUser?.status === "blocked" && (
                <div className="tooltip tooltip-bottom cursor-pointer" data-tip="Blocked">
                  <ImBlocked className="text-xl text-red-400" />
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

        {currentUser?.status === "pending" && (
          <div role="alert" className="alert alert-warning mb-6 rounded-3xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span className="leading-[1.5]">Warning: Your account status is pending! Your account will be Activated by the Admin</span>
          </div>
        )}

        {currentUser?.status === "blocked" && (
          <div role="alert" className="alert alert-error mb-6 rounded-3xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="leading-[1.5]">Your account has been blocked by the Admin.</span>
          </div>
        )}

        <div className="bg-[#F1F1F1] min-h-screen rounded-[2.5rem] md:rounded-none md:rounded-tl-[2.5rem] md:rounded-bl-[2.5rem]">
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
