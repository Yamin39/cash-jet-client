import useAuth from "../../../hooks/useAuth";
import useCapitalizeFirstLetter from "../../../hooks/useCapitalizeFirstLetter";

const Overview = () => {
  const { currentUser } = useAuth();
  const capitalizeFirstLetter = useCapitalizeFirstLetter();

  const { name, mobileNumber, role, status, balance, email } = currentUser;

  return (
    <div className="p-10">
      <h2 className="mb-9 text-5xl font-medium">Overview</h2>
      <div className="flex flex-col-reverse md:flex-row gap-7">
        <div className="flex-grow p-6 rounded-3xl bg-white">
          <h3 className="text-3xl font-medium">Account Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <div>
              <h3 className="text-xl font-semibold">Name</h3>
              <p className="text-gray-500" style={{ wordBreak: "break-all" }}>
                {capitalizeFirstLetter(name)}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Email Address</h3>
              <p className="text-gray-500" style={{ wordBreak: "break-all" }}>
                {email}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Mobile Number</h3>
              <p className="text-gray-500" style={{ wordBreak: "break-all" }}>
                {mobileNumber}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Account Type</h3>
              <p className="text-gray-500">{capitalizeFirstLetter(role)}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row md:flex-col gap-7">
          <div className="bg-black text-white p-6 w-full md:min-w-64 rounded-3xl text-lg">
            <p className="font-medium">Balance</p>
            <h3 className="text-2xl font-medium" style={{ wordBreak: "break-all" }}>
              {balance} BDT
            </h3>
          </div>
          {status && (
            <div className="bg-primary-color text-white p-6 w-full md:min-w-64 rounded-3xl text-lg">
              <p className="font-medium">Account Status</p>
              <h3 className="text-2xl font-medium">{capitalizeFirstLetter(status)}</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;

{
  /* <div className="rounded-3xl min-h-96 bg-white">
<div className="flex items-center justify-between p-10 border-b">
  <div>
    <h3 className="text-2xl font-semibold">Total Balance</h3>
    <p className="text-gray-500">Your total balance</p>
  </div>
  <div>
    <h3 className="text-2xl font-semibold">NGN 0.00</h3>
  </div>
</div>
<div className="flex items-center justify-between p-10 border-b">
  <div>
    <h3 className="text-2xl font-semibold">Total Cash In</h3>
    <p className="text-gray-500">Your total cash in</p>
  </div>
  <div>
    <h3 className="text-2xl font-semibold">NGN 0.00</h3>
  </div>
</div>
<div className="flex items-center justify-between p-10 border-b">
  <div>
    <h3 className="text-2xl font-semibold">Total Cash Out</h3>
    <p className="text-gray-500">Your total cash out</p>
  </div>
  <div>
    <h3 className="text-2xl font-semibold">NGN 0.00</h3>
  </div>
</div>
<div className="flex items-center justify-between p-10">
  <div>
    <h3 className="text-2xl font-semibold">Total Transaction</h3>
    <p className="text-gray-500">Your total transaction</p>
  </div>
  <div>
    <h3 className="text-2xl font-semibold">0</h3>
  </div>
</div>
</div> */
}
