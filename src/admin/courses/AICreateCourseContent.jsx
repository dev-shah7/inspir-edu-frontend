import { useState, memo } from "react";
import { toast } from "react-hot-toast";
import useModalStore from "../store/useModalStore";
import useCourseStore from "../store/useCourseStore";
import useAuthStore from "../../store/auth/useAuthStore";
import useModuleStore from "../store/useModuleStore";
import PropTypes from "prop-types";
import axios from "axios";

const FAST_API_BASE_URL = import.meta.env.VITE_FAST_API_BASE_URL;

// AI Loading Modal Component
const AILoadingModal = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <div className="flex flex-col items-center">
          {/* AI Icon Animation */}
          <div className="relative w-24 h-24 mb-6">
            <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping"></div>
            <div className="relative flex items-center justify-center w-full h-full rounded-full bg-blue-500">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                ></path>
              </svg>
            </div>
          </div>

          {/* Title and Description */}
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Generating Your Course
          </h3>
          <div className="space-y-2 text-center mb-8">
            <p className="text-gray-600">
              Our AI is analyzing your media and creating comprehensive course
              content.
            </p>
            <p className="text-sm text-gray-500">
              This process may take a few minutes...
            </p>
          </div>

          {/* Progress Steps */}
          <div className="w-full space-y-4">
            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <svg
                  className="w-5 h-5 animate-spin"
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
              </div>
              <div className="ml-4 flex-1">
                <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full animate-loading"></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-sm font-medium text-gray-600">
              <div className="flex flex-col items-center">
                <div className="w-2 h-2 rounded-full bg-blue-500 mb-1 animate-pulse"></div>
                <span>Analyzing Media</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-2 h-2 rounded-full bg-blue-500 mb-1 animate-pulse delay-100"></div>
                <span>Creating Modules</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-2 h-2 rounded-full bg-blue-500 mb-1 animate-pulse delay-200"></div>
                <span>Generating Questions</span>
              </div>
            </div>
          </div>

          {/* Processing Status */}
          <div className="mt-8 text-sm text-gray-500 flex items-center">
            <svg
              className="w-4 h-4 mr-2 animate-spin"
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
            Processing your request...
          </div>
        </div>
      </div>
    </div>
  );
};

AILoadingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

// Memoize MediaPreview component
const MediaPreview = memo(({ type, file }) => {
  if (!file) return null;

  if (type === "Image") {
    return (
      <div className="mt-4">
        <img
          src={URL.createObjectURL(file)}
          alt="Preview"
          className="w-48 h-48 object-cover rounded-md mx-auto"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "path/to/fallback-image.png";
          }}
        />
      </div>
    );
  }

  if (type === "Video") {
    return (
      <div className="mt-4">
        <video
          className="w-full max-w-lg mx-auto rounded-md"
          controls
          src={URL.createObjectURL(file)}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <p className="text-sm text-gray-600">Selected File: {file?.name}</p>
    </div>
  );
});

MediaPreview.propTypes = {
  type: PropTypes.oneOf(["Image", "Video", "Pdf"]).isRequired,
  file: PropTypes.shape({
    name: PropTypes.string,
  }),
};

MediaPreview.displayName = "MediaPreview";

const mediaTypes = [
  { label: "PDF", value: "Pdf", icon: "337/337946" },
  { label: "Image", value: "Image", icon: "1000/1000917" },
  { label: "Video", value: "Video", icon: "1384/1384060" },
];

const difficulties = ["Beginner", "Intermediate", "Advanced"];

function buildCourseFormData({
  file,
  name,
  description,
  numberOfModules,
  questionsPerModule,
  difficulty,
}) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("course_name", name);
  formData.append("course_description", description);
  formData.append("num_modules", numberOfModules);
  formData.append("questions_per_module", questionsPerModule);
  formData.append("difficulty_level", difficulty);
  return formData;
}

async function createAICourse({ formData, token }) {
  return axios.post(`${FAST_API_BASE_URL}/courses/generate`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
}

const AICreateCourseContent = () => {
  const { closeModal } = useModalStore();
  const { fetchCourses } = useCourseStore();
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    mediaType: "Pdf",
    numberOfModules: 3,
    questionsPerModule: 5,
    difficulty: "Beginner",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAILoading, setIsAILoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error("Please select a file");
      return;
    }

    setIsSubmitting(true);
    setIsAILoading(true);
    try {
      const fd = buildCourseFormData({
        file: selectedFile,
        name: formData.name,
        description: formData.description,
        numberOfModules: formData.numberOfModules,
        questionsPerModule: formData.questionsPerModule,
        difficulty: formData.difficulty,
      });
      const response = await createAICourse({ formData: fd, token });
      if (response.status !== 200)
        throw new Error(`HTTP error! status: ${response.status}`);
      await fetchCourses();
      toast.success(
        "Course generation started! You'll be notified when it's ready.",
        { duration: 4000, position: "bottom-right" }
      );
      closeModal();
    } catch (error) {
      console.error("Error generating course:", error);
      const errorMessage =
        error.response?.data?.detail?.[0]?.msg ||
        error.response?.data?.message ||
        "Failed to generate course";
      toast.error(errorMessage, { duration: 4000, position: "bottom-right" });
    } finally {
      setIsAILoading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="my-2">
      <AILoadingModal isOpen={isAILoading} />
      <form onSubmit={handleSubmit} className="space-y-6 px-16">
        {/* Course Name */}
        <div>
          <label className="block mb-2 text-md font-light text-[#031F42]">
            Course Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter course name"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 text-sm font-medium text-[#0F172A]">
            Description
          </label>
          <textarea
            value={formData.description}
            name="description"
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
            placeholder="Enter course description"
            required
          />
        </div>

        {/* Media Section */}
        <div>
          <div className="mb-6">
            <div className="flex justify-center space-x-6">
              {mediaTypes.map(({ label, value, icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, mediaType: value }))
                  }
                  className={`p-4 w-40 h-40 flex flex-col items-center justify-center border rounded-lg ${
                    formData.mediaType === value
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 bg-gray-100 opacity-50"
                  } hover:shadow-md transition`}
                >
                  <img
                    src={`https://cdn-icons-png.flaticon.com/512/${icon}.png`}
                    alt={label}
                    className="w-12"
                  />
                  <p className="text-sm mt-2">{label}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-[#0F172A]">
              Select file
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              accept={
                formData.mediaType === "Image"
                  ? "image/*"
                  : formData.mediaType === "Video"
                  ? "video/*"
                  : ".pdf"
              }
              className="w-full p-2 border rounded-md focus:outline-none"
            />
            <MediaPreview type={formData.mediaType} file={selectedFile} />
          </div>
        </div>

        {/* Number of Modules */}
        <div>
          <label className="block mb-2 text-sm font-medium text-[#0F172A]">
            Number of Modules
          </label>
          <input
            type="number"
            name="numberOfModules"
            value={formData.numberOfModules}
            onChange={handleInputChange}
            min="1"
            max="10"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Questions per Module */}
        <div>
          <label className="block mb-2 text-sm font-medium text-[#0F172A]">
            Questions per Module
          </label>
          <input
            type="number"
            name="questionsPerModule"
            value={formData.questionsPerModule}
            onChange={handleInputChange}
            min="1"
            max="10"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Difficulty Level */}
        <div>
          <label className="block mb-2 text-sm font-medium text-[#0F172A]">
            Difficulty Level
          </label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {difficulties.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={() => closeModal()}
            className="px-6 py-2 bg-[#C6433D] text-white font-medium rounded-md hover:bg-[#B91C1C] transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 bg-[#1A73E8] text-white font-medium rounded-md hover:bg-[#1E40AF] transition ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Starting..." : "Generate Course"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AICreateCourseContent;
