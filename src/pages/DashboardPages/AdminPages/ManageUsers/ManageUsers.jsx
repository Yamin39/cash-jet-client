import { useQuery } from "@tanstack/react-query";
import { RiDeleteBin6Line } from "react-icons/ri";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    isPending: usersLoading,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  //   const handleAccept = (id, email) => {
  //     axiosSecure.patch(`/accept-agreement/${id}`, { status: "checked" }).then((data) => {
  //       if (data.data.modifiedCount) {
  //         axiosSecure.patch(`/users/${email}`, { role: "member" }).then((data) => {
  //           if (data.data.modifiedCount) {
  //             Swal.fire({
  //               title: "Accepted!",
  //               text: "Agreement accepted successfully.",
  //               icon: "success",
  //             });
  //             refetchAgreements();
  //           }
  //         });
  //       }
  //     });
  //   };

  //   const handleReject = (agreement_id, apartmentRoom_id) => {
  //     axiosSecure.patch(`/rooms/${apartmentRoom_id}`, { availability: true }).then((data) => {
  //       if (data.data.modifiedCount) {
  //         axiosSecure.patch(`/reject-agreement/${agreement_id}`, { status: "checked" }).then((data) => {
  //           if (data.data.modifiedCount) {
  //             Swal.fire({
  //               title: "Rejected!",
  //               text: "Agreement rejected successfully.",
  //               icon: "success",
  //             });
  //             refetchAgreements();
  //           }
  //         });
  //       }
  //     });
  //   };

  return (
    <div className="p-10">
      <h2 className="mb-9 text-5xl font-medium">Manage Users</h2>
      <div className="p-6 rounded-3xl bg-white">
        <h3 className="text-3xl font-medium mb-6">All Users</h3>

        {/* <div className="overflow-x-auto">
          <table className="w-full table-xs table-zebra">
            <thead>
              <tr className="text-left text-gray-500 text-xs">
                <th>Name</th>
                <th>Email</th>
                <th>Number</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            {!usersLoading && (
              <tbody>
                {users.map((user) => (
                  <tr key={user?._id} className="text-xs">
                    <td style={{ wordBreak: "break-all" }}>{user?.name}</td>
                    <td style={{ wordBreak: "break-all" }}>{user?.email}</td>
                    <td style={{ wordBreak: "break-all" }}>{user?.mobileNumber}</td>
                    <td style={{ wordBreak: "break-all" }}>{user?.role}</td>
                    <td style={{ wordBreak: "break-all" }}>{user?.status}</td>
                    <td className="flex flex-col gap-2">
                      <button
                        onClick={() => handleAccept(agreement._id, agreement?.user_email)}
                        className="btn btn-xs bg-blue-500 text-white hover:bg-blue-500 hover:brightness-90 h-auto min-h-0 text-base rounded-xl py-2"
                      >
                        <FaCheck />
                        Activate
                      </button>

                      <button
                        onClick={() => handleReject(agreement._id, agreement?.apartmentRoom_id)}
                        className="btn btn-xs bg-red-500 text-white hover:bg-red-500 hover:brightness-90 h-auto min-h-0 text-base rounded-xl py-2"
                      >
                        <RxCross2 />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div> */}

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
                  Action
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            {!usersLoading && (
              <tbody>
                {users.map((user) => (
                  <tr key={user?._id} className="odd:bg-white even:bg-gray-50 border-b">
                    {/* <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {user?.name}
                    </th> */}
                    <td className="px-6 py-4">{user?.name}</td>
                    <td className="px-6 py-4">{user?.email}</td>
                    <td className="px-6 py-4">{user?.mobileNumber}</td>
                    <td className="px-6 py-4">{user?.role}</td>
                    <td className="px-6 py-4">{user?.status}</td>
                    <td className="px-6 py-4">
                      <button className="btn btn-sm bg-primary-color hover:bg-primary-color hover:brightness-90 text-white font-medium">Activate</button>
                    </td>
                    <td className="px-6 py-4">
                      <button className="btn btn-sm btn-error text-white btn-sm-white font-medium">
                        <RiDeleteBin6Line />
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
