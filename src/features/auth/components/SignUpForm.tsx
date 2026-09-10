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

    setValidationErrors((prev) => ({
      ...prev,
      email: "",
    }));
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);

    setValidationErrors((prev) => ({
      ...prev,
      username: "",
    }));
  };

  // Compatible with PasswordInput's setPassword prop
  const handlePasswordChange: React.Dispatch<React.SetStateAction<string>> = (
    value,
  ) => {
    setPassword(value);

    setValidationErrors((prev) => ({
      ...prev,
      password: "",
    }));
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(e.target.value);

    setValidationErrors((prev) => ({
      ...prev,
      confirmPassword: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    // Username validation
    if (!username.trim()) {
      errors.username = "Username is required.";
    } else if (username.trim().length < 3) {
      errors.username = "Username must be at least 3 characters.";
    }

    // Email validation
    if (!email.trim()) {
      errors.email = "Email is required.";
    } else if (!validateEmail(email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    // Password validation
    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    // Confirm password validation
    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setValidationErrors(errors);

    // Stop submission if validation fails
    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }

    await onSubmit(email.trim(), password, username.trim());
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
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Username
          </label>

          <input
            id="username"
            onChange={handleUsernameChange}
            value={username}
            type="text"
            placeholder="johndoe"
            autoComplete="username"
            disabled={isLoading}
            className="w-full bg-gray-50 text-black border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none placeholder-gray-400"
          />

          {validationErrors.username && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.username}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email Address
          </label>

          <input
            id="email"
            onChange={handleEmailChange}
            value={email}
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            disabled={isLoading}
            className="w-full bg-gray-50 text-black border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none placeholder-gray-400"
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
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Confirm Password
          </label>

          <input
            id="confirmPassword"
            onChange={handleConfirmPasswordChange}
            value={confirmPassword}
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            disabled={isLoading}
            className="w-full bg-gray-50 text-black border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none placeholder-gray-400"
          />

          {validationErrors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.confirmPassword}
            </p>
          )}
        </div>
      </div>

      {/* General Error */}
      {error && (
        <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
      )}

      {/* Submit Button */}
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
