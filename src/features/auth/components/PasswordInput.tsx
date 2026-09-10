import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

interface PasswordInputProps {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  showRememberMe?: boolean;
  disabled?: boolean;
}

function PasswordInput({
  password,
  setPassword,
  showRememberMe = true,
  disabled = false,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Password
        </label>

        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete={showRememberMe ? "current-password" : "new-password"}
            disabled={disabled}
            className="w-full bg-gray-50 text-black border border-gray-300 rounded-lg py-3 px-4 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none placeholder-gray-400"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            disabled={disabled}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed"
          >
            {showPassword ? (
              <IoEye className="text-xl cursor-pointer" />
            ) : (
              <IoEyeOff className="text-xl cursor-pointer" />
            )}
          </button>
        </div>
      </div>

      {/* Remember me & Forgot password - Only show for login */}
      {showRememberMe && (
        <div className="flex items-center justify-between mt-6 mb-8">
          <label className="flex items-center text-sm text-gray-700">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={disabled}
              className="mr-2"
            />
            Remember me
          </label>

          <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
            Forgot password?
          </a>
        </div>
      )}
    </>
  );
}

export default PasswordInput;
