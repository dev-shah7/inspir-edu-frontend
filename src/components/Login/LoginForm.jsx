import { useState } from "react";
import { z } from "zod";
import useAuthStore from "../../store/auth/useAuthStore";
import InputField from "../common/InputField/InputField";
import Button from "../common/Button/Button";
import { FiSend } from "react-icons/fi"; // Icon example from react-icons
import { Link } from "react-router";

// Zod validation schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginForm = () => {
  const { email, password, setEmail, setPassword } = useAuthStore();

  // State for validation errors
  const [errors, setErrors] = useState({});

  // Validate a single field dynamically on blur
  const validateField = (name, value) => {
    try {
      // Validate only the specific field dynamically
      loginSchema
        .pick({ [name]: loginSchema.shape[name] })
        .parse({ [name]: value });
      setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error for the field
    } catch (err) {
      setErrors((prev) => ({ ...prev, [name]: err.errors[0].message })); // Set specific error
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the entire form
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      // Map all errors
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
      console.log("Form Submitted Successfully:", { email, password });
      // Proceed with login logic here
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 bg-form-bg shadow-lg rounded-xl p-8"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
        Login
      </h2>
      <p className="text-center text-gray-600 mb-6">SIGN INTO YOUR ACCOUNT</p>

      {/* Input Fields */}
      <div className="space-y-6">
        {/* Email Field */}
        <div>
          <InputField
            type="email"
            placeholder="Email address *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => validateField("email", e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
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
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>
      </div>

      {/* Remember Me and Forgot */}
      <div className="flex justify-end items-center mt-4">
        <Link to="/" className="text-link-blue hover:underline">
          Forgot your password?
        </Link>
      </div>

      {/* Submit Button */}
      <Button
        text="Login Now"
        icon={FiSend}
        className="mt-4"
        onClick={handleSubmit}
      />

      {/* Footer */}
      <p className="text-center mt-6 text-gray-700">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-link-blue hover:underline">
          Register here
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
