import { useState } from "react";
import { z } from "zod";
import InputField from "../common/InputField/InputField";
import Button from "../common/Button/Button";
import { FiMail, FiSend } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAuthStore from "../../store/auth/useAuthStore";

// Zod validation schema
const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const { forgotPassword, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const validateField = (value) => {
    try {
      forgotPasswordSchema.parse({ email: value });
      setErrors({});
      return true;
    } catch (err) {
      const fieldErrors = {};
      err.errors.forEach((error) => {
        fieldErrors[error.path[0]] = error.message;
      });
      setErrors(fieldErrors);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateField(email)) return;

    try {
      await forgotPassword(email);
      toast.success(
        "Password reset instructions have been sent to your email address"
      );
      setEmail("");
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Failed to process password reset request");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row items-stretch lg:space-x-8">
        {/* Left Section - Fixed (40%) */}
        <div className="w-full lg:w-[40%] flex flex-col justify-center items-center p-8 text-center space-y-4">
          <h1 className="font-outfit text-4xl sm:text-5xl leading-[3rem] sm:leading-[5rem] font-semibold text-gray-700">
            WELCOME <br /> TO
          </h1>
          <h2 className="text-4xl sm:text-6xl font-bold text-button-blue flex items-center justify-center mb-6">
            <span className="text-yellow-400 mr-2">💡</span> inspirEDU
          </h2>
        </div>

        {/* Right Section - Scrollable (60%) */}
        <div className="w-full lg:w-[60%] flex justify-center items-center lg:h-screen lg:overflow-hidden">
          <div className="w-full lg:max-h-screen lg:overflow-y-auto custom-scrollbar">
            <div className="w-full max-w-lg mx-auto bg-blue-100 rounded-xl shadow-lg p-8 space-y-6">
              {/* Title Section */}
              <div className="text-center space-y-2">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
                  Forgot Password
                </h2>
                <p className="text-gray-600 font-medium text-sm sm:text-base">
                  RESET YOUR PASSWORD
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <InputField
                    label="Email address"
                    placeholder="Enter your email address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={(e) => validateField(e.target.value)}
                    Icon={FiMail}
                    error={errors.email}
                  />
                </div>

                <Button
                  text={isLoading ? "Sending..." : "Send Reset Link"}
                  icon={FiSend}
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition disabled:bg-blue-300"
                />
              </form>

              {/* Footer */}
              <div className="text-center text-gray-600 text-sm">
                Remember your password?{" "}
                <Link to="/login" className="text-blue-500 hover:underline">
                  Login here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
