import { useState } from "react";
import PasswordInput from "./PasswordInput";

interface SignUpFormProps {
  onSubmit: (
    email: string,
    password: string,
    username: string,
  ) => Promise<void>;
  isLoading?: boolean;
  error?: string;
  successMessage?: string;
}

function SignUpForm({
  onSubmit,
  isLoading = false,
  error = "",
  successMessage = "",
}: SignUpFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setValidationErrors((prev) => ({ ...prev, email: "" }));
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setValidationErrors((prev) => ({ ...prev, username: "" }));
  };

  const handlePasswordChange: React.Dispatch<React.SetStateAction<string>> = (
    value,
  ) => {
    setPassword(value);
    setValidationErrors((prev) => ({ ...prev, password: "" }));
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(e.target.value);
    setValidationErrors((prev) => ({ ...prev, confirmPassword: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setValidationErrors({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    let hasError = false;

    if (!username.trim()) {
      setValidationErrors((prev) => ({
        ...prev,
        username: "Username is required.",
      }));
      hasError = true;
    } else if (username.length < 3) {
      setValidationErrors((prev) => ({
        ...prev,
        username: "Username must be at least 3 characters.",
      }));
      hasError = true;
    }

    if (!email.trim()) {
      setValidationErrors((prev) => ({
        ...prev,
        email: "Email is required.",
      }));
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
    } else if (password.length < 6) {
      setValidationErrors((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters.",
      }));
      hasError = true;
    }

    if (!confirmPassword.trim()) {
      setValidationErrors((prev) => ({
        ...prev,
        confirmPassword: "Please confirm your password.",
      }));
      hasError = true;
    } else if (password !== confirmPassword) {
      setValidationErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match.",
      }));
      hasError = true;
    }

    if (hasError) return;

    await onSubmit(email, password, username);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
          {successMessage}
        </div>
      )}

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
            disabled={isLoading}
          />
          {validationErrors.username && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.username}
            </p>
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
            showRememberMe={false}
            disabled={isLoading}
          />
          {validationErrors.password && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.password}
            </p>
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
            disabled={isLoading}
          />
          {validationErrors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.confirmPassword}
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
        className={`w-full py-3 rounded-lg font-semibold transition mt-6 mb-8 flex items-center justify-center gap-2 ${
          isLoading
            ? "bg-blue-400 cursor-not-allowed text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {isLoading ? "Creating account..." : "Create Account"}
      </button>
    </form>
  );
}

export default SignUpForm;
