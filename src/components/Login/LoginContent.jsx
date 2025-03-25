import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useModalStore from "../../admin/store/useModalStore";
import useAuthStore from "../../store/auth/useAuthStore";
import InviteUsersContent from "../../admin/users/InviteUsersContent";
import { useNavigate } from "react-router-dom";
const LoginContent = ({ courseId, message, inviteUsers = false }) => {
  const { closeModal, queueModal } = useModalStore();
  const { registerGuestUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await registerGuestUser({ email: data.email, courseId: courseId });
      toast.success("Registration successful!");
      if (inviteUsers) {
        queueModal("Invite Users", <InviteUsersContent courseId={courseId} withCourse={true} />);
      }
      closeModal();
      navigate("/admin/courses");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-lg text-blue-700">
                {message || "Please submit your email first to be able to invite users."}
              </p>
            </div>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-lg font-medium text-gray-600 mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
          />
          {errors.email && (
            <p className="text-md text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300 transition disabled:opacity-50"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginContent;
