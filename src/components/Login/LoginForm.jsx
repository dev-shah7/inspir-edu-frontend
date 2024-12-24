import { useState } from "react";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/auth/useAuthStore";
import InputField from "../common/InputField/InputField";
import Button from "../common/Button/Button";
import { FiSend } from "react-icons/fi";
import { Link } from "react-router-dom";

// Zod validation schema - Only validate on submit, not during input
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  isForStudentPortal: z.boolean(),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, isLoading, error: authError, clearError } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    isForStudentPortal: false,
  });
  const [errors, setErrors] = useState({});

  // Only validate on blur, not during typing
  const validateField = (name, value) => {
    if (!value) return; // Don't validate empty fields during typing

    try {
      if (name in loginSchema.shape) {
        loginSchema.shape[name].parse(value);
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    } catch (err) {
      setErrors((prev) => ({ ...prev, [name]: err.errors[0].message }));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (authError) clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const validatedData = loginSchema.parse(formData);
      await login(validatedData);
      navigate("/");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        console.error("Login failed");
      }
    }
  };

  return (
    <div className="w-full flex justify-center items-center px-4">
      <div className="w-full max-w-lg bg-blue-100 rounded-xl shadow-lg p-8 space-y-6">
        {/* Title Section */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
            Login
          </h2>
          <p className="text-gray-600 font-medium text-sm sm:text-base">
            SIGN INTO YOUR ACCOUNT
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Display auth error if exists */}
          {authError && (
            <div className="text-red-500 text-sm text-center bg-red-100 p-2 rounded">
              {authError}
            </div>
          )}

          {/* Email Field */}
          <div>
            <InputField
              label="Email address"
              placeholder="Email address "
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              onBlur={(e) => validateField("email", e.target.value)}
            />

            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <InputField
              label="Password"
              placeholder="Password"
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              onBlur={(e) => validateField("password", e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Remember Me and Portal Selection */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="remember" className="ml-2">
                  Remember me
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isForStudentPortal"
                  name="isForStudentPortal"
                  checked={formData.isForStudentPortal}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isForStudentPortal" className="ml-2">
                  Student Portal
                </label>
              </div>
            </div>
            <Link
              to="/forgot-password"
              className="text-blue-500 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            text={isLoading ? "Logging in..." : "Login Now"}
            icon={FiSend}
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition disabled:bg-blue-300"
          />

          {/* Or Login With */}
          <div className="flex items-center justify-center text-sm text-gray-500 space-x-2">
            <div className="w-full border-t border-gray-300"></div>
            <span className="text-xs uppercase font-semibold">
              or Login with
            </span>
            <div className="w-full border-t border-gray-300"></div>
          </div>

          <div className="flex justify-center space-x-4">
            <button className="w-10 h-10 flex items-center justify-center bg-blue-200 rounded-full hover:bg-blue-300">
              <span className="text-blue-600">G</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center bg-blue-200 rounded-full hover:bg-blue-300">
              <span className="text-blue-600">f</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center bg-blue-200 rounded-full hover:bg-blue-300">
              <span className="text-blue-600">in</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center bg-blue-200 rounded-full hover:bg-blue-300">
              <span className="text-blue-600">t</span>
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
