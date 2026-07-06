import { useState } from "react";
import PasswordInput from "./PasswordInput";
import SocialLogin from "./SocialLogin";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    email: "",
    password: "",
    general: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Email:", email);
      console.log("Password:", password);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred:", error);
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

          {/* Form fields */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>

              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="you@example.com"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4"
              />
            </div>

            <PasswordInput password={password} setPassword={setPassword} />
          </div>

          {/* Sign In button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition mb-8 flex items-center justify-center gap-2 ${
              loading
                ? "bg-blue-400 cursor-not-allowed text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {/* Divider (FIXED - CLOSED PROPERLY) */}
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
