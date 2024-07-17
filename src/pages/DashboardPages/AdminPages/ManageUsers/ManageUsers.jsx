import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import Loading from "../../../../components/Loading/Loading";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const [search, setSearch] = useState("");
  const axiosSecure = useAxiosSecure();
  const searchFormRef = useRef();

  console.log(search);
  const {
    data: users = [],
    isPending: usersLoading,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${search}`);
      return res.data;
    },
  });

  const handleActivate = (user) => {
    axiosSecure.patch(`/users/activate/${user._id}`, { status: "activated", role: user?.role, isNew: user?.isNew, balance: user?.balance }).then((data) => {
      if (data.data.modifiedCount) {
        Swal.fire({
          title: "Activated!",
          text: "Activated successfully.",
          icon: "success",
        });
        refetchUsers();
      }
    });
  };

  const handleBlock = (user) => {
    axiosSecure.patch(`/users/block/${user?._id}`, { status: "blocked" }).then((data) => {
      console.log(data);
      if (data.data.modifiedCount) {
        Swal.fire({
          title: "Blocked!",
          text: "Blocked successfully.",
          icon: "success",
        });
        refetchUsers();
      }
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.search_box.value;
    setSearch(searchText);
  };

  return (
    <div className="p-10">
      <h2 className="mb-9 text-5xl font-medium">Manage Users</h2>
      <div className="p-6 rounded-3xl bg-white">
        <h3 className="text-3xl font-medium mb-6">All Users</h3>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <form ref={searchFormRef} onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-4">
            <label className="input input-bordered flex items-center gap-2 rounded-full w-full sm:w-auto">
              <input type="text" name="search_box" className="grow" placeholder="Search by name" required />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
            <button className="btn bg-primary-color hover:bg-primary-color hover:brightness-90 text-white rounded-full w-full sm:w-fit">Search</button>
          </form>
          {search && (
            <button
              onClick={() => {
                searchFormRef.current.reset();
                setSearch("");
              }}
              className="btn bg-error hover:bg-error hover:brightness-90 text-white rounded-full w-full sm:w-fit"
            >
              Clear
            </button>
          )}
        </div>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Activate
                </th>
                <th scope="col" className="px-6 py-3">
                  Block
                </th>
              </tr>
            </thead>
            {usersLoading ? (
              <Loading></Loading>
            ) : (
              <tbody>
                {users.map((user) => (
                  <tr key={user?._id} className="odd:bg-white even:bg-gray-50 border-b">
                    <td className="px-6 py-4 md:max-w-[17.8125rem]" style={{ wordBreak: "break-all" }}>
                      {user?.name}
                    </td>
                    <td className="px-6 py-4 md:max-w-[17.8125rem]" style={{ wordBreak: "break-all" }}>
                      {user?.email}
                    </td>
                    <td className="px-6 py-4 md:max-w-[17.8125rem]" style={{ wordBreak: "break-all" }}>
                      {user?.mobileNumber}
                    </td>
                    <td className="px-6 py-4">{user?.role}</td>
                    <td className="px-6 py-4">{user?.status}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleActivate(user)}
                        className="btn btn-sm bg-primary-color hover:bg-primary-color hover:brightness-90 text-white font-medium"
                        disabled={user?.status === "activated"}
                      >
                        Activate
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleBlock(user)}
                        className="btn btn-sm btn-error text-white btn-sm-white font-medium"
                        disabled={user?.status === "blocked"}
                      >
                        Block
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
