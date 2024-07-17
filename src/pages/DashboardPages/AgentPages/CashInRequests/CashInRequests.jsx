import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Loading from "../../../../components/Loading/Loading";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const CashInRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { profileLoader, setProfileLoader } = useAuth();

  const {
    data: cashInRequests = [],
    isPending: cashInRequestsLoading,
    refetch: refetchCashInRequests,
  } = useQuery({
    queryKey: ["cashInRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/pending-requests?requestType=cashIn`);
      return res.data;
    },
  });

  const handleApprove = (cashInRequest) => {
    const { _id, amount, userId, agentId, requestType } = cashInRequest;

    const data = { status: "approved", amount, userId, agentId, requestType };

    axiosSecure.patch(`/approve-request/${_id}`, data).then((res) => {
      console.log(res.data);
      if (res.data.result?.modifiedCount) {
        Swal.fire({
          title: "Approved!",
          text: "Request approved successfully.",
          icon: "success",
        });
        refetchCashInRequests();
        setProfileLoader(!profileLoader);
      } else {
        toast.error(res?.data?.result?.message);
      }
    });
  };

  const handleReject = (cashInRequest) => {
    axiosSecure.patch(`/reject-request/${cashInRequest?._id}`, { status: "rejected" }).then((data) => {
      console.log(data?.data);
      if (data.data.modifiedCount) {
        Swal.fire({
          title: "Rejected!",
          text: "Request rejected successfully.",
          icon: "success",
        });
        refetchCashInRequests();
      }
    });
  };
  return (
    <div className="p-10">
      <h2 className="mb-9 text-5xl font-medium">Cash In Requests</h2>
      <div className="flex-grow p-6 rounded-3xl bg-white flex-1">
        <h3 className="text-3xl font-medium mb-6">All cash-in requests to you</h3>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Transaction ID
                </th>
                <th scope="col" className="px-6 py-3">
                  User Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Accept
                </th>
                <th scope="col" className="px-6 py-3">
                  Reject
                </th>
              </tr>
            </thead>
            {cashInRequestsLoading ? (
              <Loading></Loading>
            ) : (
              <tbody>
                {cashInRequests.map((cashInRequest) => (
                  <tr key={cashInRequest?._id} className="odd:bg-white even:bg-gray-50 border-b">
                    <td className="px-6 py-4 md:max-w-[17.8125rem] word-break-all">{cashInRequest?._id}</td>
                    <td className="px-6 py-4 md:max-w-[17.8125rem] word-break-all">{cashInRequest?.userEmail}</td>
                    <td className="px-6 py-4 md:max-w-[17.8125rem] word-break-all">{cashInRequest?.amount}</td>
                    <td className="px-6 py-4">{moment(cashInRequest?.timestamp).format("DD MMMM YYYY")}</td>
                    <td className="px-6 py-4">{cashInRequest?.status}</td>
                    <td className="px-6 py-4">
                      <button onClick={() => handleApprove(cashInRequest)} className="btn btn-sm btn-success text-white font-medium">
                        Approve
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => handleReject(cashInRequest)} className="btn btn-sm btn-error text-white font-medium">
                        Reject
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

export default CashInRequests;
