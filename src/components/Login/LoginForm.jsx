import { useState } from "react";
import { z } from "zod";
import useAuthStore from "../../store/auth/useAuthStore";
import InputField from "../common/InputField/InputField";
import Button from "../common/Button/Button";
import { FiSend } from "react-icons/fi";
import { Link } from "react-router";

// Zod validation schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginForm = () => {
  const { email, password, setEmail, setPassword } = useAuthStore();

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    try {
      loginSchema
        .pick({ [name]: loginSchema.shape[name] })
        .parse({ [name]: value });
      setErrors((prev) => ({ ...prev, [name]: "" }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, [name]: err.errors[0].message }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
      console.log("Form Submitted Successfully:", { email, password });
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
          {/* Email Field */}
          <div>
            <InputField
              type="email"
              placeholder="Email address *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => validateField("email", e.target.value)}
              className="w-full py-2 px-4 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <InputField
              type="password"
              placeholder="Password *"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={(e) => validateField("password", e.target.value)}
              className="w-full py-2 px-4 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Remember Me and Forgot */}
          <div className="flex items-center justify-between text-sm text-gray-600">
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
            <Link to="/forgot-password" className="text-blue-500 hover:underline">
              Forgot your password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            text="Login Now"
            icon={FiSend}
            type="submit"
            className="w-full flex justify-center items-center bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition"
          />

          {/* Or Login With */}
          <div className="flex items-center justify-center text-sm text-gray-500 space-x-2">
            <div className="w-full border-t border-gray-300"></div>
            <span className="text-xs uppercase font-semibold">or Login with</span>
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
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
