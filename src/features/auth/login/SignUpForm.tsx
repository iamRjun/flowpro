import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "./PasswordInput";
import SocialLogin from "./SocialLogin";

function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    general: "",
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError((prev) => ({ ...prev, email: "" }));
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setError((prev) => ({ ...prev, username: "" }));
  };

  const handlePasswordChange: React.Dispatch<React.SetStateAction<string>> = (
    value,
  ) => {
    setPassword(value);
    setError((prev) => ({ ...prev, password: "" }));
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(e.target.value);
    setError((prev) => ({ ...prev, confirmPassword: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear old errors
    setError({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      general: "",
    });
    setSuccessMessage("");

    let hasError = false;

    // Username validation
    if (!username.trim()) {
      setError((prev) => ({ ...prev, username: "Username is required." }));
      hasError = true;
    } else if (username.length < 3) {
      setError((prev) => ({
        ...prev,
        username: "Username must be at least 3 characters.",
      }));
      hasError = true;
    }

    // Email validation
    if (!email.trim()) {
      setError((prev) => ({ ...prev, email: "Email is required." }));
      hasError = true;
    } else if (!validateEmail(email)) {
      setError((prev) => ({
        ...prev,
        email: "Please enter a valid email address.",
      }));
      hasError = true;
    }

    // Password validation
    if (!password.trim()) {
      setError((prev) => ({ ...prev, password: "Password is required." }));
      hasError = true;
    } else if (password.length < 6) {
      setError((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters.",
      }));
      hasError = true;
    }

    // Confirm password validation
    if (!confirmPassword.trim()) {
      setError((prev) => ({
        ...prev,
        confirmPassword: "Please confirm your password.",
      }));
      hasError = true;
    } else if (password !== confirmPassword) {
      setError((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match.",
      }));
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);

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

      // Check if user was created
      if (data.user) {
        setSuccessMessage(
          "✅ Account created! Please check your email for confirmation link.",
        );

        // Clear form
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setUsername("");

        // Optional: Redirect to login after 3 seconds
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      if (error instanceof Error) {
        // User-friendly error messages
        const errorMessages: Record<string, string> = {
          "User already registered":
            "This email is already registered. Please login.",
          "Password should be at least 6 characters":
            "Password must be at least 6 characters.",
          "Unable to validate email address":
            "Please enter a valid email address.",
        };

        setError((prev) => ({
          ...prev,
          general: errorMessages[error.message] || error.message,
        }));
      } else {
        setError((prev) => ({
          ...prev,
          general: "Something went wrong. Please try again.",
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="min-h-screen flex items-center justify-center bg-[#9FA1FF]">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </h1>
            <p className="text-gray-500">Join us today!</p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
              {successMessage}
            </div>
          )}

          {/* Inputs */}
          <div className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                onChange={handleUsernameChange}
                value={username}
                type="text"
                placeholder="johndoe"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              {error.username && (
                <p className="text-red-500 text-sm mt-1">{error.username}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                onChange={handleEmailChange}
                value={email}
                type="text"
                placeholder="you@example.com"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              {error.email && (
                <p className="text-red-500 text-sm mt-1">{error.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <PasswordInput
                password={password}
                setPassword={handlePasswordChange}
                showRememberMe={false} // We'll modify PasswordInput to accept this prop
              />
              {error.password && (
                <p className="text-red-500 text-sm mt-1">{error.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                onChange={handleConfirmPasswordChange}
                value={confirmPassword}
                type="password"
                placeholder="••••••••"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              {error.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {error.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {/* General error */}
          {error.general && (
            <p className="text-red-500 text-sm mt-4 text-center">
              {error.general}
            </p>
          )}

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition mt-6 mb-8 flex items-center justify-center gap-2 ${
              loading
                ? "bg-blue-400 cursor-not-allowed text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Creating account..." : "Create Account"}
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

          {/* Social Login */}
          <SocialLogin isSignUp={true} />

          {/* Footer - Link to Login */}
          <div className="flex items-center justify-center gap-2 text-sm">
            <p className="text-gray-600">Already have an account?</p>
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:text-blue-800 transition"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SignUpForm;
//after 2
