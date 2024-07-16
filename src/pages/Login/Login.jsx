import { useState } from "react";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import { MdEmail, MdOutlineKey } from "react-icons/md";
import { Link } from "react-router-dom";
import image from "../../assets/images/login.avif";
import logo from "../../assets/images/logo.png";

const Login = () => {
  // Password Show / Hide Toggle
  const [passToggle, setPassToggle] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const loginData = { email, password };
    console.log(loginData);
  };
  return (
    <div className="py-8 min-h-screen flex flex-row-reverse justify-around items-center">
      <div className="text-center sm:min-h-[80vh] lg:min-h-0 sm:flex lg:block justify-center items-center">
        <div className="w-fit mx-auto">
          <div className="max-w-[15.625rem] mx-auto mb-3">
            <Link to="/">
              <img className="w-full" src={logo} alt="logo" />
            </Link>
          </div>
          <h4 className="text-4xl font-bold">
            Welcome <span className="text-primary-color">Back</span>
          </h4>
          <p className="text-lg font-medium mt-2 text-slate-600 mb-6">Please Login to continue!</p>

          {/* login form */}
          <form onSubmit={handleSubmit}>
            {/* email */}
            <div className="w-full mx-auto flex items-center gap-3 text-base border-2 text-[#acacac] border-[#c1c8d0] rounded-full py-3 px-4 pl-6">
              <MdEmail className="text-xl" />
              <input type="email" placeholder="Email" name="email" className="bg-transparent w-full text-black outline-none" required />
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

            {/* submit button */}
            <input
              type="submit"
              value="Log In"
              className="w-full mx-auto mt-6 btn h-auto min-h-0 bg-primary-color hover:bg-[#474747] text-white text-base rounded-full py-3 px-10"
            />
          </form>

          <p className="text-slate-500 mt-5">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-black font-bold underline opacity-90">
              Register
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
  );
};

export default Login;
