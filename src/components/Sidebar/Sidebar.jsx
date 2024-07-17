import { BiMoneyWithdraw } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { GrTransaction } from "react-icons/gr";
import { IoPeopleOutline } from "react-icons/io5";
import { RiMenu3Fill } from "react-icons/ri";
import { TbCreditCardPay, TbCreditCardRefund, TbZoomMoney } from "react-icons/tb";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import useAuth from "../../hooks/useAuth";
import "./Sidebar.css";

const Sidebar = () => {
  const { currentUser, loading } = useAuth();

  return (
    <>
      <div className="z-50 drawer md:drawer-open px-4">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-6 pb-0 flex items-center justify-between md:hidden">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} className="max-w-[11rem]" />
            </Link>
          </div>

          <label htmlFor="my-drawer-2" className="btn drawer-button">
            <RiMenu3Fill className="text-3xl" />
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul id="sidebar" className="menu bg-white p-4 w-56 min-h-full">
            <div className="mt-2 mb-10">
              <Link to="/" className="flex flex-col items-center gap-3">
                <img src={logo} className="max-w-[11rem]" />
              </Link>
            </div>

            {loading ? (
              <div className="min-h-20 flex justify-center items-center">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : (
              <>
                {/* user */}
                {currentUser?.role === "user" && (
                  <>
                    <li>
                      <NavLink to="/dashboard">
                        <CgProfile className="text-base" />
                        Overview
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/send-money">
                        <TbCreditCardPay className="text-base" />
                        Send Money
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/cash-out">
                        <BiMoneyWithdraw className="text-base" />
                        Cash Out
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/cash-in">
                        <TbCreditCardRefund className="text-base" />
                        Cash In
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/balance">
                        <TbZoomMoney className="text-base" />
                        Balance
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/transactions">
                        <GrTransaction className="text-base" />
                        Transactions
                      </NavLink>
                    </li>
                  </>
                )}

                {/* member */}
                {currentUser?.role === "agent" && (
                  <>
                    <li>
                      <NavLink to="/dashboard">
                        <CgProfile className="text-base" />
                        Overview
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/cash-in-requests">
                        <TbCreditCardRefund className="text-base" />
                        Cash In Requests
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/cash-out-requests">
                        <BiMoneyWithdraw className="text-base" />
                        Cash Out Requests
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/balance">
                        <TbZoomMoney className="text-base" />
                        Balance
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/transactions">
                        <GrTransaction className="text-base" />
                        Transactions
                      </NavLink>
                    </li>
                  </>
                )}

                {/* admin */}
                {currentUser?.role === "admin" && (
                  <>
                    <li>
                      <NavLink to="/dashboard">
                        <CgProfile className="text-base" />
                        Overview
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/manage-users">
                        <IoPeopleOutline className="text-base" />
                        Manage Users
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/transactions">
                        <GrTransaction className="text-base" />
                        Transactions
                      </NavLink>
                    </li>
                  </>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
