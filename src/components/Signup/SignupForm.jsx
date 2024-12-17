import { useState } from "react";
import { z } from "zod";
import InputField from "../common/InputField/InputField";
import Button from "../common/Button/Button";
import { FiUser, FiMail, FiLock, FiSend } from "react-icons/fi";
import { Link } from "react-router";

// Zod Validation Schema
const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  terms: z
    .boolean()
    .refine((val) => val === true, "You must agree to the terms"),
});

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});

  // Validation on blur
  const validateField = (name, value) => {
    try {
      signupSchema.pick({ [name]: signupSchema.shape[name] }).parse({
        [name]: value,
      });
      setErrors((prev) => ({ ...prev, [name]: "" }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, [name]: err.errors[0].message }));
    }
  };

  // Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      signupSchema.parse(formData);
      console.log("Form Submitted Successfully:", formData);
      setErrors({});
    } catch (err) {
      const fieldErrors = {};
      err.errors.forEach((error) => {
        fieldErrors[error.path[0]] = error.message;
      });
      setErrors(fieldErrors);
    }
  };

  return (
    <div className="w-full flex justify-center items-center px-4">
      <div className="w-full max-w-lg bg-blue-100 rounded-xl shadow-lg p-8 space-y-6">
        {/* Title Section */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
            SignUp
          </h2>
          <p className="text-gray-600 font-medium text-sm sm:text-base">
            CREATE AN ACCOUNT
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <InputField
            type="text"
            placeholder="Name *"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            onBlur={(e) => validateField("name", e.target.value)}
            error={errors.name}
            Icon={FiUser}
            className="w-full py-2 px-4 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          {/* Email Field */}
          <InputField
            type="email"
            placeholder="Email address *"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            onBlur={(e) => validateField("email", e.target.value)}
            error={errors.email}
            Icon={FiMail}
            className="w-full py-2 px-4 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          {/* Password Field */}
          <InputField
            type="password"
            placeholder="Password * (at least 8 characters)"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            onBlur={(e) => validateField("password", e.target.value)}
            error={errors.password}
            Icon={FiLock}
            className="w-full py-2 px-4 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          {/* Terms Checkbox */}
          <div className="flex items-center text-sm text-gray-600">
            <input
              type="checkbox"
              id="terms"
              checked={formData.terms}
              onChange={(e) =>
                setFormData({ ...formData, terms: e.target.checked })
              }
              className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="terms" className="ml-2">
              I agree to the terms of service
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-xs mt-1">{errors.terms}</p>
          )}

          {/* Submit Button */}
          <Button
            text="Register Now"
            icon={FiSend}
            type="submit"
            className="w-full flex justify-center items-center bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition"
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
          {/* Footer */}
          <div className="text-center text-gray-600 text-sm">
            Already a member?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
