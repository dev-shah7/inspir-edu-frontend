import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import useModalStore from "../store/useModalStore";
import useCourseStore from "../store/useCourseStore";
import useAuthStore from "../../store/auth/useAuthStore";

const FAST_API_BASE_URL = import.meta.env.VITE_FAST_API_BASE_URL;

const steps = [
  "Basic Information",
  "Content Details",
  "Question Settings",
  "Access & Grading",
];

const initialStepStates = [
  { topic: "", audience: "", audience_level: "high_school" },
  { content_type: "text", tone_style: "", key_points: "" },
  {
    question_format: "multiple_choice",
    questions_per_module: 5,
    number_of_modules: 3,
  },
  { grading_method: "minimum_percentage", allow_retake: true },
];

const Stepper = ({ steps, activeStep }) => {
  const progressPercentage = ((activeStep + 1) / steps.length) * 100;

  return (
    <div className="px-4 md:px-8 py-6">
      {/* Progress Bar at the top */}
      <div className="mb-8">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="flex items-center justify-between">
        {steps.map((label, idx) => {
          const isActive = idx === activeStep;
          const isCompleted = idx < activeStep;

          return (
            <div
              key={label}
              className="flex-1 flex flex-col items-center relative"
            >
              {/* Connector line between steps */}
              {idx < steps.length - 1 && (
                <div
                  className={`absolute left-1/2 top-6 w-full h-0.5 -z-10 ${
                    idx < activeStep ? "bg-blue-500" : "bg-gray-300"
                  }`}
                />
              )}

              {/* Step Circle */}
              <div
                className={`
                  relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg ring-4 ring-blue-100"
                      : isCompleted
                      ? "bg-blue-500 text-white"
                      : "bg-white border-2 border-gray-300 text-gray-400"
                  }
                `}
              >
                {isCompleted && !isActive ? (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <span className="font-bold text-base">{idx + 1}</span>
                )}
              </div>

              {/* Step Label */}
              <span
                className={`
                  mt-2 text-xs md:text-sm font-medium transition-colors duration-300 text-center
                  ${
                    isActive
                      ? "text-blue-700 font-semibold"
                      : isCompleted
                      ? "text-blue-600"
                      : "text-gray-500"
                  }
                `}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CourseCreationStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [stepStates, setStepStates] = useState(initialStepStates);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { closeModal } = useModalStore();
  const { fetchCourses, fetchGuestCourseById } = useCourseStore();
  const { user } = useAuthStore();

  // Handlers for each field in each step
  const handleFieldChange = (stepIdx, field, value) => {
    setStepStates((prev) => {
      const updated = [...prev];
      updated[stepIdx] = { ...updated[stepIdx], [field]: value };
      return updated;
    });
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = [
      { value: stepStates[0].topic, name: "Topic" },
      { value: stepStates[0].audience, name: "Target Audience" },
      { value: stepStates[1].tone_style, name: "Tone Style" },
      { value: stepStates[1].key_points, name: "Key Points" },
    ];

    const missingFields = requiredFields.filter(
      (field) => !field.value?.trim()
    );

    if (missingFields.length > 0) {
      toast.error(
        `Please fill in the following required fields: ${missingFields
          .map((f) => f.name)
          .join(", ")}`,
        {
          duration: 4000,
          position: "top-right",
        }
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Authentication required. Please log in again.");
        return;
      }

      // Merge all step states and add hardcoded fields
      const courseData = {
        // Basic Information (Step 0)
        topic: stepStates[0].topic.trim(),
        audience: stepStates[0].audience.trim(),
        audience_level: stepStates[0].audience_level,

        // Content Details (Step 1)
        content_type: stepStates[1].content_type,
        tone_style: stepStates[1].tone_style.trim(),
        key_points: stepStates[1].key_points
          ? stepStates[1].key_points
              .split("\n")
              .filter((k) => k.trim())
              .map((k) => k.trim())
          : [],

        questions_per_module: parseInt(stepStates[2].questions_per_module),
        number_of_modules: parseInt(stepStates[2].number_of_modules),

        // Access & Grading (Step 3)
        grading_method: stepStates[3].grading_method,
        allow_retake: stepStates[3].allow_retake,

        // Hardcoded fields as requested
        upload_or_ai: "manual",
        assignment_type: "quiz",
        include_media: false,
        media_type: "code_snippets",
        time_limit_minutes: 30,
        access_list: ["student1@example.com", "student2@example.com"],
      };

      console.log("Sending course data:", courseData);

      // Make API call to FastAPI endpoint
      const response = await axios.post(
        `${FAST_API_BASE_URL}/courses/create`,
        courseData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Course creation response:", response.data);

      toast.success("Course created successfully!", {
        duration: 4000,
        position: "top-right",
      });

      // Close modal and refresh course list
      closeModal();

      // Refresh the course list
      try {
        if (user) {
          await fetchCourses();
        } else {
          const guestCourseId = sessionStorage.getItem("guestCourseId");
          if (guestCourseId) {
            await fetchGuestCourseById(guestCourseId);
          }
        }
      } catch (refreshError) {
        console.error("Error refreshing course list:", refreshError);
        // Don't show error to user as the course was created successfully
      }

      // Reset form
      setActiveStep(0);
      setStepStates(initialStepStates);
    } catch (error) {
      console.error("Error creating course:", error);

      let errorMessage = "Failed to create course. Please try again.";

      if (error.response?.data?.detail) {
        // Handle FastAPI validation errors
        if (Array.isArray(error.response.data.detail)) {
          errorMessage = error.response.data.detail
            .map((err) => `${err.loc?.join(".")} - ${err.msg}`)
            .join(", ");
        } else {
          errorMessage = error.response.data.detail;
        }
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage, {
        duration: 6000,
        position: "top-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6 max-w-md mx-auto">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Topic <span className="text-red-500">*</span>
              </label>
              <input
                value={stepStates[0].topic}
                onChange={(e) => handleFieldChange(0, "topic", e.target.value)}
                className="w-full px-4 py-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base transition border-gray-300"
                placeholder="Enter course topic"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Audience <span className="text-red-500">*</span>
              </label>
              <input
                value={stepStates[0].audience}
                onChange={(e) =>
                  handleFieldChange(0, "audience", e.target.value)
                }
                className="w-full px-4 py-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base transition border-gray-300"
                placeholder="Who is this course for?"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Audience Level
              </label>
              <select
                value={stepStates[0].audience_level}
                onChange={(e) =>
                  handleFieldChange(0, "audience_level", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base transition"
              >
                <option value="high_school">High School</option>
                <option value="professional">Professional</option>
                <option value="no_experience">No Experience</option>
              </select>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6 max-w-md mx-auto">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content Type
              </label>
              <select
                value={stepStates[1].content_type}
                onChange={(e) =>
                  handleFieldChange(1, "content_type", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base transition"
              >
                <option value="text">Text</option>
                {/* <option value="video">Video</option>
                <option value="mixed">Mixed</option> */}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tone Style <span className="text-red-500">*</span>
              </label>
              <input
                value={stepStates[1].tone_style}
                onChange={(e) =>
                  handleFieldChange(1, "tone_style", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base transition"
                placeholder="e.g., casual and friendly"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Key Points <span className="text-red-500">*</span>
              </label>
              <textarea
                value={stepStates[1].key_points}
                onChange={(e) =>
                  handleFieldChange(1, "key_points", e.target.value)
                }
                rows={4}
                placeholder="Enter key points (one per line)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base transition resize-none"
                required
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question Format
              </label>
              <select
                value={stepStates[2].question_format}
                onChange={(e) =>
                  handleFieldChange(2, "question_format", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base transition"
              >
                <option value="multiple_choice">Multiple Choice</option>
                <option value="true_false">True/False</option>
                <option value="short_answer">Short Answer</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Questions per Module
              </label>
              <input
                type="number"
                min="1"
                value={stepStates[2].questions_per_module}
                onChange={(e) =>
                  handleFieldChange(2, "questions_per_module", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base transition"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Modules
              </label>
              <input
                type="number"
                min="1"
                value={stepStates[2].number_of_modules}
                onChange={(e) =>
                  handleFieldChange(2, "number_of_modules", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base transition"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 max-w-md mx-auto">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grading Method
              </label>
              <select
                value={stepStates[3].grading_method}
                onChange={(e) =>
                  handleFieldChange(3, "grading_method", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base transition"
              >
                <option value="minimum_percentage">Minimum Percentage</option>
                <option value="pass_fail">Pass/Fail</option>
                <option value="letter_grade">Letter Grade</option>
              </select>
            </div>
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                checked={stepStates[3].allow_retake}
                onChange={(e) =>
                  handleFieldChange(3, "allow_retake", e.target.checked)
                }
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition"
              />
              <label className="ml-3 block text-base text-gray-700 select-none">
                Allow students to retake this course
              </label>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-6">
      {/* Stepper */}
      <Stepper steps={steps} activeStep={activeStep} />

      {/* Form Content */}
      <div className="mt-8 px-4">
        <form
          onSubmit={
            activeStep === steps.length - 1
              ? handleSubmit
              : (e) => {
                  e.preventDefault();
                  handleNext();
                }
          }
        >
          <div className="min-h-[300px]">{renderStepContent(activeStep)}</div>

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-4 mt-12">
            <button
              type="button"
              onClick={handleBack}
              disabled={activeStep === 0}
              className={`px-8 py-3 rounded-lg font-medium transition-all ${
                activeStep === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:shadow-md"
              }`}
            >
              Back
            </button>

            {activeStep === steps.length - 1 ? (
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 rounded-lg font-medium shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isSubmitting
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating Course...
                  </div>
                ) : (
                  "Create Course"
                )}
              </button>
            ) : (
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium shadow-md hover:bg-blue-700 hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Next
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseCreationStepper;
