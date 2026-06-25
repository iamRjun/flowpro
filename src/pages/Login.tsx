import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#9FA1FF]">
      {/* Main container - changed to white background with proper padding */}
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl max-w-md w-full">
        {/* Header section - dark text */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-500">Sign in to your account</p>
        </div>

        {/* Form fields */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <IoEye className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Remember me & Forgot password */}
        <div className="flex items-center justify-between mt-6 mb-8">
          <label className="flex items-center text-sm text-gray-700">
            <input type="checkbox" id="remember" className="mr-2" />
            Remember me
          </label>
          <a className="text-sm text-blue-600 hover:text-blue-800" href="#">
            Forgot password?
          </a>
        </div>

        {/* Sign In button */}
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition mb-8">
          Sign In
        </button>

        {/* Divider */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">
              or continue with
            </span>
          </div>
        </div>

        {/* Social buttons */}
        <div className="flex gap-4 mb-8">
          <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition">
            <FcGoogle className="text-xl" />
            Google
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition">
            <FaGithub className="text-xl" />
            GitHub
          </button>
        </div>

        {/* Sign up link */}
        <div className="flex items-center justify-center gap-2 text-sm">
          <p className="text-gray-600">Don't have an account?</p>
          <a
            className="text-blue-600 font-semibold hover:text-blue-800"
            href="#"
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
