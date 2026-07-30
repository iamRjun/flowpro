import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { supabase } from "../../../lib/supabase";

function SocialLogin() {
  const handleSocialLogin = async (provider: "google" | "github") => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error("Social login error:", error);
    }
  };

  return (
    <div className="flex gap-4 mb-8">
      <button
        onClick={() => handleSocialLogin("google")}
        className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition"
      >
        <FcGoogle className="text-xl" />
        Google
      </button>
      <button
        onClick={() => handleSocialLogin("github")}
        className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition"
      >
        <FaGithub className="text-xl" />
        GitHub
      </button>
    </div>
  );
}

export default SocialLogin;
