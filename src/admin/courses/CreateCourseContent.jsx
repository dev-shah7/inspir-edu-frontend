import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useModalStore from "../store/useModalStore";
import GradingContent from "../Grading/GradingContent";
import { courseService } from "../../services/api/courseService";
import useCourseStore from "../store/useCourseStore";

const CreateCourseContent = ({ mode = "add", courseId }) => {
  const { closeModal, queueModal } = useModalStore();
  const { saveCourse, fetchCourses } = useCourseStore();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      courseName: "",
      description: "",
      deadlineBased: "No",
      time: 0,
      type: 0, // Default type
    },
  });

  const isDeadlineBased = watch("deadlineBased") === "Yes";

  useEffect(() => {
    if (mode === "edit" && courseId) {
      const fetchCourseData = async () => {
        try {
          const response = await courseService.getCourse(courseId);
          const courseData = response.data;

          // Set form values
          setValue("courseName", courseData.name);
          setValue("description", courseData.description);
          setValue("deadlineBased", courseData.isDeadlineBase ? "Yes" : "No");
          setValue("time", courseData.defaultDeadlineHrs);
          setValue("type", courseData.type);
        } catch (error) {
          console.error("Error fetching course data:", error);
          // You might want to show an error message to the user
        }
      };

      fetchCourseData();
    }
  }, [mode, courseId, setValue]);

  const onSubmit = async (data) => {
    try {
      const courseData = {
        id: mode === "edit" ? parseInt(courseId) : 0,
        name: data.courseName,
        description: data.description,
        isDeadlineBase: data.deadlineBased === "Yes",
        type: 0,
        defaultDeadlineHrs:
          data.deadlineBased === "Yes" ? parseInt(data.time) : 0,
      };

      await saveCourse(courseData);

      if (mode === "edit") {
        closeModal();
        await fetchCourses();
      } else {
        await fetchCourses();
        queueModal("Add Grading", <GradingContent />);
        closeModal();
      }
    } catch (error) {
      console.error("Error saving course:", error);
    }
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
            {mode === "edit" ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourseContent;
