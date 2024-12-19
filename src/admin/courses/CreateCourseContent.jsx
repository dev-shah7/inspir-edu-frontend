import React from "react";
import { useForm } from "react-hook-form";
import useModalStore from "../store/useModalStore";
import GradingContent from "../Grading/GradingContent";

const CreateCourseContent = () => {
  const { closeModal, queueModal } = useModalStore();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const isDeadlineBased = watch("deadlineBased") === "Yes";

  const onSubmit = (data) => {
    console.log("Form Data:", data);

    queueModal("Add Grading", <GradingContent />);
    closeModal();
  };

  return (
    <div className="my-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-16">
        {/* Course Name */}
        <div>
          <label className="block mb-2 text-md font-light text-[#031F42]">
            Course Name
          </label>
          <input
            type="text"
            {...register("courseName", {
              required: "Course name is required",
            })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter course name"
          />
          {errors.courseName && (
            <p className="text-md text-red-500">{errors.courseName.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 text-md font-light text-[#031F42]">
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
            placeholder="Enter description"
          ></textarea>
          {errors.description && (
            <p className="text-md text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* Deadline Based */}
        <div>
          <label className="block mb-2 text-md font-light text-[#031F42]">
            Do you want the course to be deadline-based?
          </label>
          <div className="flex items-center space-x-6 font-light">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="Yes"
                {...register("deadlineBased", {
                  required: "Please select if the course is deadline-based",
                })}
                className="w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-400"
              />
              <span className="text-md text-[#031F42]">Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="No"
                {...register("deadlineBased", {
                  required: "Please select if the course is deadline-based",
                })}
                className="w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-400"
              />
              <span className="text-md text-[#031F42]">No</span>
            </label>
          </div>
          {errors.deadlineBased && (
            <p className="text-md text-red-500">
              {errors.deadlineBased.message}
            </p>
          )}
        </div>

        {isDeadlineBased && (
          <div>
            <label className="block mb-2 text-md font-light text-[#031F42]">
              Time (hours)
            </label>
            <input
              type="number"
              {...register("time", {
                required: "Time is required when deadline-based",
                min: {
                  value: 1,
                  message: "Time must be at least 1 hour",
                },
                max: {
                  value: 100,
                  message: "Time cannot exceed 100 hours",
                },
              })}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter time in hours"
            />
            {errors.time && (
              <p className="text-md text-red-500">{errors.time.message}</p>
            )}
          </div>
        )}

        <div className="flex justify-center space-x-8 mt-8">
          {/* Cancel Button */}
          <button
            className="px-6 py-2 bg-[#C6433D] text-white font-medium rounded-md hover:bg-[#B91C1C] transition"
            onClick={closeModal}
          >
            Cancel
          </button>

          {/* Dynamic Action Button */}
          <button
            type="submit"
            className="px-6 py-2 bg-[#1A73E8] text-white font-medium rounded-md hover:bg-[#1E40AF] transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourseContent;
