import { useState } from "react";
import PasswordInput from "./PasswordInput";
import SocialLogin from "./SocialLogin";
import { supabase } from "../../../lib/supabase";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState({
    email: "",
    password: "",
    general: "",
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    // Clear email error while typing
    setError((prev) => ({
      ...prev,
      email: "",
    }));
  };

  // Wrapper around setPassword
  // Keeps the same React setter type
  const handlePasswordChange: React.Dispatch<React.SetStateAction<string>> = (
    value,
  ) => {
    setPassword(value);

    setError((prev) => ({
      ...prev,
      password: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear old errors
    setError({
      email: "",
      password: "",
      general: "",
    });

    let hasError = false;

    // Email validation
    if (!email.trim()) {
      setError((prev) => ({
        ...prev,
        email: "Email is required.",
      }));

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
      setError((prev) => ({
        ...prev,
        password: "Password is required.",
      }));

      hasError = true;
    }

    // Stop submission
    if (hasError) {
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      console.log("Logged in user:", data.user);

      // Optional: clear the form after successful login
      setEmail("");
      setPassword("");

      // Later you can redirect the user here:
      // navigate("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        setError((prev) => ({
          ...prev,
          general: error.message,
        }));
      } else {
        setError((prev) => ({
          ...prev,
          general: "Something went wrong.",
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
              Welcome Back
            </h1>

            <p className="text-gray-500">Sign in to your account</p>
          </div>

          {/* Inputs */}

          <div className="space-y-6">
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
                className="w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4"
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
              />

              {error.password && (
                <p className="text-red-500 text-sm mt-1">{error.password}</p>
              )}
            </div>
          </div>

          {/* General error */}

          {error.general && (
            <p className="text-red-500 text-sm mt-4 text-center">
              {error.general}
            </p>
          )}

          {/* Button */}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition mb-8 mt-6 flex items-center justify-center gap-2 ${
              loading
                ? "bg-blue-400 cursor-not-allowed text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
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

          {/* Social */}

          <SocialLogin />

          {/* Footer */}

          <div className="flex items-center justify-center gap-2 text-sm">
            <p className="text-gray-600">Don't have an account?</p>

            <a className="text-blue-600 font-semibold hover:text-blue-800">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
