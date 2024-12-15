import { useState } from "react";
import { z } from "zod";
import InputField from "../common/InputField/InputField";
import Button from "../common/Button/Button";
import { FiUser, FiMail, FiLock, FiSend } from "react-icons/fi";
import { Link } from 'react-router';

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
    <div className="flex-1 bg-form-bg shadow-lg rounded-xl p-8">
      <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
        SignUp
      </h2>
      <p className="text-center text-gray-600 mb-6">CREATE AN ACCOUNT</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <InputField
          type="text"
          placeholder="Name *"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          onBlur={(e) => validateField("name", e.target.value)}
          error={errors.name}
          Icon={FiUser}
        />

        {/* Email Field */}
        <InputField
          type="email"
          placeholder="Email address *"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          onBlur={(e) => validateField("email", e.target.value)}
          error={errors.email}
          Icon={FiMail}
        />

        {/* Password Field */}
        <InputField
          type="password"
          placeholder="Password * (at least 8 character)"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          onBlur={(e) => validateField("password", e.target.value)}
          error={errors.password}
          Icon={FiLock}
        />

        {/* Terms Checkbox */}
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="terms"
            checked={formData.terms}
            onChange={(e) =>
              setFormData({ ...formData, terms: e.target.checked })
            }
            className="mr-2"
          />
          <label htmlFor="terms" className="text-gray-700 text-sm">
            I agree to the terms of service
          </label>
        </div>
        {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}

        {/* Register Button */}
        <Button text="Register Now" Icon={FiSend} />

        {/* Footer */}
        <p className="text-center mt-6 text-gray-700">
          Already a member?{" "}
          <Link to={'/login'} className="text-link-blue hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
