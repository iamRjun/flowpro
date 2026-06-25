import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { IoEye } from "react-icons/io5"; //<IoEye />
import { IoEyeOff } from "react-icons/io5"; //<IoEyeOff />

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#9FA1FF]">
      <div className="bg-[#A8AAFF] p-8 rounded-2xl text-white shadow-2xl  border-0 border-white">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p>Sign in to your account</p>
        </div>
        <br />
        <div className="flex flex-col gap-8">
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            className="bg-[#C1C5FF] rounded-lg py-3 px-4"
          />
          <div className="relative flex items-center">
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="bg-[#C1C5FF] rounded-lg w-full py-3 px-4"
            />
            <IoEye className="absolute right-4 bg-[#C1C5FF]" />
          </div>
        </div>

        <div className="flex items-center justify-between my-4">
          <label>
            <input type="checkbox" id="remember" />
            Remember me
          </label>
          <a className="text-blue-500" href="https://www.w3schools.com/">
            Forgot password?
          </a>
        </div>
        <div className="flex items-center justify-center my-4">
          <button className="bg-blue-500 w-sm text-white p-3  rounded-lg">
            Sign In
          </button>
        </div>
        <div className="relative flex items-center my-6">
          <div className="grow border-t-2 border-white/30"></div>
          <span className="shrink mx-4 text-white/80 text-sm font-medium">
            or continue with
          </span>
          <div className="grow border-t-2 border-white/30"></div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <button className="flex-1 flex items-center justify-center gap-2 bg-[#C1C5FF] text-white p-3 rounded-lg">
            <FcGoogle />
            Google
          </button>
          <button className="flex-1 flex items-center justify-center  gap-2 bg-[#C1C5FF] text-white p-3 rounded-lg">
            <FaGithub />
            GitHub
          </button>
        </div>
        <div className="flex items-center justify-center gap-2">
          <p className="text-white/80">Don't have an account?</p>
          <a className="text-blue-500" href="https://www.w3schools.com/">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
