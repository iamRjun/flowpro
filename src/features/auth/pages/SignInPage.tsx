import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../components/SignInForm";
import SocialLogin from "../components/SocialLogin";
import { supabase } from "../../../lib/supabase";

function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      console.log("Logged in user:", data.user);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#9FA1FF]">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-500">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} />

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

        {/* Social Login */}
        <SocialLogin />

        {/* Footer */}
        <div className="flex items-center justify-center gap-2 text-sm">
          <p className="text-gray-600">Don't have an account?</p>
          <Link
            to="/signup"
            className="text-blue-600 font-semibold hover:text-blue-800"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
