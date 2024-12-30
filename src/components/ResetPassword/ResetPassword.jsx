import { useState } from "react";
import { z } from "zod";
import { useNavigate, useSearchParams } from "react-router-dom";
import InputField from "../common/InputField/InputField";
import Button from "../common/Button/Button";
import { FiLock, FiSave } from "react-icons/fi";
import { toast } from "react-hot-toast";
import useAuthStore from "../../store/auth/useAuthStore";

// Zod validation schema
const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const navigate = useNavigate();
  const { resetPassword, isLoading } = useAuthStore();

  if (!token || !email) {
    toast.error("Invalid reset link");
    navigate("/login");
    return null;
  }

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    try {
      if (name === "confirmPassword") {
        resetPasswordSchema.parse(formData);
      } else {
        resetPasswordSchema.shape[name].parse(value);
      }
      setErrors((prev) => ({ ...prev, [name]: "" }));
      return true;
    } catch (err) {
      const fieldErrors = {};
      err.errors.forEach((error) => {
        fieldErrors[error.path[0]] = error.message;
      });
      setErrors((prev) => ({ ...prev, ...fieldErrors }));
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      resetPasswordSchema.parse(formData);
      await resetPassword(token, email, formData.password);
      toast.success("Password has been reset successfully");
      navigate("/login");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        toast.error(error.message || "Failed to reset password");
      }
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
                  Reset Password
                </h2>
                <p className="text-gray-600 font-medium text-sm sm:text-base">
                  ENTER YOUR NEW PASSWORD
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <InputField
                    label="New Password"
                    placeholder="Enter new password"
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    onBlur={(e) => validateField("password", e.target.value)}
                    Icon={FiLock}
                    error={errors.password}
                  />
                </div>

                <div>
                  <InputField
                    label="Confirm Password"
                    placeholder="Confirm new password"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    onBlur={(e) =>
                      validateField("confirmPassword", e.target.value)
                    }
                    Icon={FiLock}
                    error={errors.confirmPassword}
                  />
                </div>

                <Button
                  text={isLoading ? "Resetting..." : "Reset Password"}
                  icon={FiSave}
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition disabled:bg-blue-300"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
