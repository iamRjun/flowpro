import { useState } from "react";
import PasswordInput from "./PasswordInput";

interface SignInFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  isLoading?: boolean;
  error?: string;
}

function SignInForm({
  onSubmit,
  isLoading = false,
  error = "",
}: SignInFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setValidationErrors((prev) => ({ ...prev, email: "" }));
  };

  const handlePasswordChange: React.Dispatch<React.SetStateAction<string>> = (
    value,
  ) => {
    setPassword(value);
    setValidationErrors((prev) => ({ ...prev, password: "" }));
  };

  const clearForm = () => {
    setEmail("");
    setPassword("");
    setValidationErrors({ email: "", password: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setValidationErrors({ email: "", password: "" });

    let hasError = false;

    if (!email.trim()) {
      setValidationErrors((prev) => ({ ...prev, email: "Email is required." }));
      hasError = true;
    } else if (!validateEmail(email)) {
      setValidationErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address.",
      }));
      hasError = true;
    }

    if (!password.trim()) {
      setValidationErrors((prev) => ({
        ...prev,
        password: "Password is required.",
      }));
      hasError = true;
    }

    if (hasError) return;

    await onSubmit(email, password);
    clearForm();
  };

  return (
    <form onSubmit={handleSubmit}>
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
            className="w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            disabled={isLoading}
          />
          {validationErrors.email && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <PasswordInput
            password={password}
            setPassword={handlePasswordChange}
            disabled={isLoading}
          />
          {validationErrors.password && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.password}
            </p>
          )}
        </div>
      </div>

      {/* General error */}
      {error && (
        <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
      )}

      {/* Button */}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 rounded-lg font-semibold transition mb-8 mt-6 flex items-center justify-center gap-2 ${
          isLoading
            ? "bg-blue-400 cursor-not-allowed text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}

export default SignInForm;
