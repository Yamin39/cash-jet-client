import { useState } from "react";
import { FaPhone, FaRegUserCircle } from "react-icons/fa";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import { MdEmail, MdOutlineKey } from "react-icons/md";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import image from "../../../assets/images/register-agent.avif";

const RegisterAgent = () => {
  // Password Show / Hide Toggle
  const [passToggle, setPassToggle] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const password = form.password.value;
    const mobileNumber = form.mobileNumber.value;
    const email = form.email.value;
    const agentData = { name, password, mobileNumber, email, role: "agent" };

    console.log(agentData);
  };
  return (
    <>
      <div className="flex flex-row-reverse justify-around items-center">
        <div className="text-center sm:flex lg:block justify-center items-center">
          <div className="w-fit mx-auto">
            <div className="max-w-[15.625rem] mx-auto mb-3">
              <Link to="/">
                <img className="w-full" src={logo} alt="logo" />
              </Link>
            </div>
            <h4 className="text-4xl font-bold">
              <span className="text-primary-color">Agent</span> Registration
            </h4>
            <p className="text-lg font-medium mt-2 text-slate-600 mb-6">Create an agent account!</p>

            {/* Registration form */}
            <form onSubmit={handleSubmit}>
              {/* name */}
              <div className="w-full mx-auto flex items-center gap-3 text-base border-2 text-[#acacac] border-[#c1c8d0] rounded-full py-3 px-4 pl-6">
                <FaRegUserCircle className="text-xl" />
                <input type="text" placeholder="Name" name="name" className="bg-transparent w-full text-black outline-none" required />
              </div>

              {/* password */}
              <div className="mt-4 w-full mx-auto flex justify-between items-center gap-3 text-base border-2 text-[#acacac] border-[#c1c8d0] rounded-full py-3 px-6">
                <div className="flex gap-3 items-center">
                  <MdOutlineKey className="text-xl" />
                  <input
                    type={passToggle ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    className="bg-transparent w-full text-black outline-none"
                    required
                  />
                </div>
                <div onClick={() => setPassToggle(!passToggle)} className="text-[1.4rem] cursor-pointer">
                  {passToggle ? <IoEyeOffSharp /> : <IoEyeSharp />}
                </div>
              </div>

              {/* mobile number */}
              <div className="mt-4 w-full mx-auto flex items-center gap-3 text-base border-2 text-[#acacac] border-[#c1c8d0] rounded-full py-3 px-4 pl-6">
                <FaPhone className="text-xl" />
                <input type="tel" placeholder="Mobile number" name="mobileNumber" className="bg-transparent w-full text-black outline-none" required />
              </div>

              {/* email */}
              <div className="mt-4 w-full mx-auto flex items-center gap-3 text-base border-2 text-[#acacac] border-[#c1c8d0] rounded-full py-3 px-4 pl-6">
                <MdEmail className="text-xl" />
                <input type="email" placeholder="Email" name="email" className="bg-transparent w-full text-black outline-none" required />
              </div>

              {/* submit button */}
              <input
                type="submit"
                value="Register"
                className="w-full mx-auto mt-6 btn h-auto min-h-0 bg-primary-color hover:bg-[#474747] text-white text-base rounded-full py-3 px-10"
              />
            </form>

            <p className="text-slate-500 mt-5">
              Already have an account?{" "}
              <Link to="/login" className="text-black font-bold underline opacity-90">
                Login
              </Link>
            </p>
          </div>
        </div>
        {/* image */}
        <div className="hidden md:block">
          <div>
            <img className="rounded-3xl max-h-[37.5rem]" src={image} alt="image" />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterAgent;
