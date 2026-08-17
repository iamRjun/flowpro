import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";
import SocialLogin from "../components/SocialLogin";
import { supabase } from "../../../lib/supabase";

function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();

  // ✅ Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session) {
          navigate("/dashboard", { replace: true });
        }
      } catch (error) {
        console.error("Auth check error:", error);
      } finally {
        setCheckingAuth(false);
      }
    };
    checkAuth();
  }, [navigate]);

  const handleSignUp = async (
    email: string,
    password: string,
    username: string,
  ) => {
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username,
            full_name: username,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        setSuccessMessage(
          "✅ Account created! Please check your email for confirmation link.",
        );

        // ✅ Redirect to login after 3 seconds
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 3000);
      }
    } catch (error) {
      if (error instanceof Error) {
        const errorMessages: Record<string, string> = {
          "User already registered":
            "This email is already registered. Please login.",
          "Password should be at least 6 characters":
            "Password must be at least 6 characters.",
          "Unable to validate email address":
            "Please enter a valid email address.",
        };

        setError(errorMessages[error.message] || error.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Show loading while checking auth
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#9FA1FF]">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#9FA1FF]">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Account
          </h1>
          <p className="text-gray-500">Join us today!</p>
        </div>

        {/* Sign Up Form */}
        <SignUpForm
          onSubmit={handleSignUp}
          isLoading={isLoading}
          error={error}
          successMessage={successMessage}
        />

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
          <p className="text-gray-600">Already have an account?</p>
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:text-blue-800"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
