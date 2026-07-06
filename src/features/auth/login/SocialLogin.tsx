import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

function SocialLogin() {
  return (
    <>
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
    </>
  );
}
export default SocialLogin;
