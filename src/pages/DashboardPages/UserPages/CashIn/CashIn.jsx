import { useState } from "react";
import toast from "react-hot-toast";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import { MdEmail, MdOutlineKey } from "react-icons/md";
import { TbCoinTakaFilled } from "react-icons/tb";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const CashIn = () => {
  const { currentUser } = useAuth();
  const [passToggle, setPassToggle] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [isLoading, setIsLoading] = useState(false);

  if (currentUser?.status !== "activated") {
    return (
      <div className="p-6">
        <h1 className="text-2xl">Account status &quot;{currentUser?.status}&quot; users are not allowed</h1>
      </div>
    );
  }

  // send cash in request
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target;
    const email = form.email.value;
    const amount = Number(form.amount.value);
    const pin = form.pin.value;
    const requestType = "cashIn";
    const timestamp = new Date().toISOString();
    const cashInData = { email, amount, pin, requestType, timestamp };

    console.log(cashInData);

    axiosSecure.post("/cash-in-request", cashInData).then((res) => {
      console.log(res.data);
      if (res.data.result?.insertedId) {
        form.reset();
        Swal.fire({
          title: "Success!",
          html: `<p>Cash In request sent successfully! Please wait for the agent to approve. <strong>When approved, the amount will be added to your balance.</strong> </p> <br /> 
          <p class="text-green-500">Your transaction id: ${res.data.result.insertedId}</p> <br /> <p>Thank you!</p>`,
          icon: "success",
        });
        setIsLoading(false);
      } else {
        toast.error(res?.data?.result?.message);
        setIsLoading(false);
      }
    });
  };

  return (
    <div className="p-10">
      <h2 className="mb-9 text-5xl font-medium">Cash In</h2>
      <div className="flex flex-col md:flex-row gap-7">
        <div className="flex-grow p-6 md:p-10 rounded-3xl bg-white w-full">
          <h3 className="text-3xl font-medium">Send a Cash In request to an Agent</h3>

          <form onSubmit={handleSubmit} className="mt-10">
            <div>
              <label htmlFor="email" className="flex items-center gap-3 text-xl font-semibold">
                Enter Agent&apos;s Email Address
                <div className="tooltip tooltip-left cursor-pointer" data-tip="Cash-in requests can only be sent to activated agents.">
                  <BsFillInfoCircleFill className="text-base" />
                </div>
              </label>
              <div className="mt-3 flex items-center gap-3 text-base border-2 text-[#acacac] border-[#c1c8d0] rounded-full py-3 px-4 pl-6">
                <MdEmail className="text-xl" />
                <input id="email" type="email" placeholder="Email" name="email" className="bg-transparent text-black outline-none w-full" required />
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="amount" className="text-xl font-semibold">
                Enter Cash-In Amount
              </label>
              <div className="mt-2 flex items-center gap-3 text-base border-2 text-[#acacac] border-[#c1c8d0] rounded-full py-3 px-4 pl-6">
                <TbCoinTakaFilled className="text-xl" />
                <input id="amount" type="number" placeholder="Amount" name="amount" className="bg-transparent text-black outline-none w-full" required />
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="pin" className="text-xl font-semibold">
                Enter Your Pin
              </label>
              <div className="mt-2 w-full mx-auto flex justify-between items-center gap-3 text-base border-2 text-[#acacac] border-[#c1c8d0] rounded-full py-3 px-6">
                <div className="flex gap-3 items-center">
                  <MdOutlineKey className="text-xl" />
                  <input
                    type={passToggle ? "text" : "password"}
                    placeholder="Pin"
                    name="pin"
                    id="pin"
                    maxLength={5}
                    className="bg-transparent w-full text-black outline-none"
                    required
                  />
                </div>
                <div onClick={() => setPassToggle(!passToggle)} className="text-[1.4rem] cursor-pointer">
                  {passToggle ? <IoEyeOffSharp /> : <IoEyeSharp />}
                </div>
              </div>
            </div>

            <button
              className="w-full mt-6 btn h-auto min-h-0 bg-primary-color hover:bg-[#474747] text-white text-base rounded-full py-3 px-10"
              disabled={isLoading}
            >
              {isLoading && <span className="loading loading-spinner loading-md"></span>} Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CashIn;

/*


  const {
    data: cashInRequests = [],
    isPending: cashInRequestsLoading,
    refetch: refetchCashInRequests,
  } = useQuery({
    queryKey: ["cashInRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/pending-cash-in-requests`);
      return res.data;
    },
  });

 */

/*


        <div className="flex-grow p-6 rounded-3xl bg-white flex-1">
          <h3 className="text-3xl font-medium">Your pending cash in requests</h3>

          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Transaction ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Agent Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Time
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              {cashInRequestsLoading ? (
                <Loading></Loading>
              ) : (
                <tbody>
                  {cashInRequests.map((cashInRequest) => (
                    <tr key={cashInRequest?._id} className="odd:bg-white even:bg-gray-50 border-b">
                      <td className="px-6 py-4 md:max-w-[17.8125rem]" style={{ wordBreak: "break-all" }}>
                        {cashInRequest?._id}
                      </td>
                      <td className="px-6 py-4 md:max-w-[17.8125rem]" style={{ wordBreak: "break-all" }}>
                        {cashInRequest?.agentEmail}
                      </td>
                      <td className="px-6 py-4 md:max-w-[17.8125rem]" style={{ wordBreak: "break-all" }}>
                        {cashInRequest?.amount}
                      </td>
                      <td className="px-6 py-4">{moment(cashInRequest?.timestamp).format("DD MMMM YYYY")}</td>
                      <td className="px-6 py-4">{cashInRequest?.status}</td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>

   */
