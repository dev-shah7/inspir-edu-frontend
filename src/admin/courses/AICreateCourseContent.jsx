import { useState, memo } from "react";
import { toast } from "react-hot-toast";
import useModalStore from "../store/useModalStore";
import useCourseStore from "../store/useCourseStore";
import useAuthStore from "../../store/auth/useAuthStore";
import useModuleStore from "../store/useModuleStore";
import PropTypes from "prop-types";
import axios from "axios";

const FAST_API_BASE_URL = "http://127.0.0.1:8000/api/v1";

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

const questionOptions = [
  { value: "Multiple choice", label: "Multiple choice" },
  { value: "True/False", label: "True/False" },
  { value: "Yes/No", label: "Yes/No" },
  { value: "Short Answer", label: "Short Answer" },
  { value: "Multi Select", label: "Multi Select" },
];

function buildCourseFormData({
  file,
  name,
  description,
  numberOfModules,
  questionsPerModule,
  difficulty,
  mediaSource,
  // AI specific fields
  intendedAudience,
  mainTopic,
  educationLevel,
  tone,
  keyPoints,
  questionFormat,
  deadlineBased,
  time,
  additionalInstructions,
  includeMedia = true,
  audienceType,
  moduleTopic,
  audienceExperienceLevel,
  mediaType,
  questionTypes,
  randomizeQuestions = true,
  userGeneratedQuestions = false
}) {
  if (mediaSource === "own") {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("course_name", name);
    formData.append("course_description", description);
    formData.append("num_modules", numberOfModules);
    formData.append("questions_per_module", questionsPerModule);
    formData.append("difficulty_level", difficulty);
    return formData;
  } else {
    // For AI generation, return the JSON payload directly
    let deadlineForPayload = null;
    if (deadlineBased === "Yes") {
      const durationHours = parseInt(time);
      if (!isNaN(durationHours) && durationHours > 0) {
        deadlineForPayload = new Date(Date.now() + durationHours * 60 * 60 * 1000).toISOString();
      }
    }

    return {
      course_name: name,
      course_description: description,
      target_audience: intendedAudience,
      education_level: educationLevel?.toLowerCase() || "intermediate",
      num_modules: parseInt(numberOfModules) || 5,
      questions_per_module: parseInt(questionsPerModule) || 5,
      deadline: deadlineForPayload,
      additional_instructions: additionalInstructions || "",
      include_media: Boolean(includeMedia),
      audience_type: audienceType || "",
      module_topic: moduleTopic || "",
      audience_experience_level: audienceExperienceLevel || "",
      tone: tone?.toLowerCase() || "formal",
      key_points: keyPoints ? keyPoints.split('\n').filter(point => point.trim()) : [],
      media_type: mediaType?.toLowerCase() || "pdf",
      question_types: questionFormat.length > 0 ? questionFormat.map(qf => qf.toLowerCase().replace(/\s+/g, '_')) : ["mcq"],
      randomize_questions: Boolean(randomizeQuestions),
      user_generated_questions: Boolean(userGeneratedQuestions),
      is_course_deadline_enabled: deadlineBased,
      course_deadline_duration_hours: time
    };
  }
}

async function createAICourse({ formData, token, mediaSource }) {
  const endpoint = mediaSource === 'ai'
    ? `${FAST_API_BASE_URL}/enhanced-courses/generate-enhanced`
    : `${FAST_API_BASE_URL}/courses/generate`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      ...(mediaSource === 'ai'
        ? { 'Content-Type': 'application/json' }
        : { 'Content-Type': 'multipart/form-data' })
    }
  };

  return axios.post(endpoint, formData, config);
}

const AICreateCourseContent = () => {
  const { closeModal } = useModalStore();
  const { fetchCourses } = useCourseStore();
  const token = localStorage.getItem("token");
  const [mediaSource, setMediaSource] = useState("own");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    mediaType: "pdf",
    numberOfModules: 5,
    questionsPerModule: 5,
    difficulty: "Beginner",
    // AI Generation specific fields
    intendedAudience: "",
    mainTopic: "",
    educationLevel: "intermediate",
    tone: "formal",
    keyPoints: "",
    questionFormat: [],
    deadlineBased: "No",
    time: "24",
    additionalInstructions: "",
    includeMedia: true,
    audienceType: "",
    moduleTopic: "",
    audienceExperienceLevel: "",
    mediaType: "pdf",
    questionTypes: ["mcq"],
    randomizeQuestions: true,
    userGeneratedQuestions: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAILoading, setIsAILoading] = useState(false);
  const [aiConfigStep, setAiConfigStep] = useState(1);
  const totalAiConfigSteps = 3;

  const handleInputChange = (e) => {
    const { name, value, type, selectedOptions } = e.target;
    if (type === "select-multiple") {
      const values = Array.from(selectedOptions, option => option.value);
      setFormData(prev => ({ ...prev, [name]: values }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mediaSource === "own" && !selectedFile) {
      toast.error("Please select a file");
      return;
    }

    setIsSubmitting(true);
    setIsAILoading(true);
    try {
      const payload = buildCourseFormData({
        file: selectedFile,
        name: formData.name,
        description: formData.description,
        numberOfModules: formData.numberOfModules,
        questionsPerModule: formData.questionsPerModule,
        difficulty: formData.difficulty,
        mediaSource: mediaSource,
        // AI generation specific data
        ...(mediaSource === "ai" && {
          intendedAudience: formData.intendedAudience,
          mainTopic: formData.mainTopic,
          educationLevel: formData.educationLevel,
          tone: formData.tone,
          keyPoints: formData.keyPoints,
          questionFormat: formData.questionFormat,
          deadlineBased: formData.deadlineBased,
          time: formData.time,
          additionalInstructions: formData.additionalInstructions,
          includeMedia: formData.includeMedia,
          audienceType: formData.audienceType,
          moduleTopic: formData.moduleTopic,
          audienceExperienceLevel: formData.audienceExperienceLevel,
          mediaType: formData.mediaType,
          questionTypes: formData.questionTypes,
          randomizeQuestions: formData.randomizeQuestions,
          userGeneratedQuestions: formData.userGeneratedQuestions
        })
      });

      const response = await createAICourse({
        formData: payload,
        token,
        mediaSource
      });

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
      <form onSubmit={handleSubmit} className="space-y-6 px-16 text-lg">
        {/* Course Name */}
        <div>
          <label className="block mb-2 text-xl font-semibold text-[#031F42]">
            Course Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-3 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter course name"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 text-xl font-semibold text-[#0F172A]">
            Description
          </label>
          <textarea
            value={formData.description}
            name="description"
            onChange={handleInputChange}
            className="w-full p-3 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
            placeholder="Enter course description"
            required
          />
        </div>

        {/* Media Source Selection */}
        <div>
          <label className="block mb-2 text-xl font-semibold text-[#0F172A]">
            Choose Media Source
          </label>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setMediaSource("own")}
              className={`flex-1 p-4 border rounded-lg ${mediaSource === "own"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300"
                } text-lg`}
            >
              Use Your Own Media
            </button>
            <button
              type="button"
              onClick={() => setMediaSource("ai")}
              className={`flex-1 p-4 border rounded-lg ${mediaSource === "ai"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300"
                } text-lg`}
            >
              Generate AI Media
            </button>
          </div>
        </div>

        {/* Is Course Deadline Enabled Radio Group */}
        <div>
          <label className="block mb-2 text-xl font-semibold text-[#0F172A]">
            Enable Course Deadline Duration?
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center text-lg">
              <input
                type="radio"
                name="deadlineBased"
                value="Yes"
                checked={formData.deadlineBased === "Yes"}
                onChange={handleInputChange}
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center text-lg">
              <input
                type="radio"
                name="deadlineBased"
                value="No"
                checked={formData.deadlineBased === "No"}
                onChange={handleInputChange}
                className="mr-2"
              />
              No
            </label>
          </div>
        </div>

        {/* Course Deadline Duration Input (Conditional) */}
        {formData.deadlineBased === "Yes" && (
          <div>
            <label className="block mb-2 text-xl font-semibold text-[#0F172A]">
              Course Deadline Duration (hours)
            </label>
            <input
              type="number"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              min="1"
              max="8760"
              className="w-full p-3 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter duration in hours (e.g., 24)"
              required
            />
          </div>
        )}

        {/* Common Fields */}
        <div className="space-y-4">
          {/* Number of Modules - Stepper Implementation */}
          <div>
            <label className="block mb-2 text-xl font-semibold text-[#0F172A]">
              Number of Modules (1-5)
            </label>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => {
                  const currentValue = parseInt(formData.numberOfModules) || 1;
                  if (currentValue > 1) { // Min value is 1
                    handleInputChange({ target: { name: "numberOfModules", value: currentValue - 1 } });
                  }
                }}
                className="px-4 py-2 border rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
              >
                -
              </button>
              <input
                type="text"
                name="numberOfModulesDisplay"
                value={formData.numberOfModules}
                readOnly
                className="w-16 p-3 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
              />
              <button
                type="button"
                onClick={() => {
                  const currentValue = parseInt(formData.numberOfModules) || 0;
                  if (currentValue < 5) { // Max value is now 5
                    handleInputChange({ target: { name: "numberOfModules", value: currentValue + 1 } });
                  }
                }}
                className="px-4 py-2 border rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
              >
                +
              </button>
            </div>
            {/* Original input hidden but kept for form submission/validation */}
            <input
              type="number"
              name="numberOfModules"
              value={formData.numberOfModules}
              onChange={handleInputChange}
              min="1"
              max="5" // Updated max value to 5
              className="hidden"
              required
            />
          </div>

          {/* Questions per Module */}
          <div>
            <label className="block mb-2 text-xl font-semibold text-[#0F172A]">
              Questions per Module
            </label>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => {
                  const currentValue = parseInt(formData.questionsPerModule) || 1;
                  if (currentValue > 1) { // Min value is 1
                    handleInputChange({ target: { name: "questionsPerModule", value: currentValue - 1 } });
                  }
                }}
                className="px-4 py-2 border rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
              >
                -
              </button>
              <input
                type="text"
                name="questionsPerModuleDisplay"
                value={formData.questionsPerModule}
                readOnly
                className="w-16 p-3 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
              />
              <button
                type="button"
                onClick={() => {
                  const currentValue = parseInt(formData.questionsPerModule) || 0;
                  if (currentValue < 20) { // Max value is 20
                    handleInputChange({ target: { name: "questionsPerModule", value: currentValue + 1 } });
                  }
                }}
                className="px-4 py-2 border rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
              >
                +
              </button>
            </div>
            {/* Original input can be hidden or removed. For now, let's keep it hidden if direct typing is ever needed or for validation hooking */}
            <input
              type="number"
              name="questionsPerModule"
              value={formData.questionsPerModule}
              onChange={handleInputChange} // This ensures formData is updated correctly
              min="1"
              max="20"
              className="hidden" // Hide the original input
              required
            />
          </div>

          {/* Difficulty Level */}
          <div>
            <label className="block mb-2 text-xl font-semibold text-[#0F172A]">
              Difficulty Level
            </label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleInputChange}
              className="w-full p-3 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              {difficulties.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Media Source Specific Fields */}
        {mediaSource === "own" ? (
          // Own Media Upload Section
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
                    className={`p-4 w-40 h-40 flex flex-col items-center justify-center border rounded-lg ${formData.mediaType === value
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
              <label className="block mb-2 text-xl font-semibold text-[#0F172A]">
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
                required={mediaSource === "own"}
              />
              <MediaPreview type={formData.mediaType} file={selectedFile} />
            </div>
          </div>
        ) : (
          // AI Generation Fields - Stepper Implementation
          <div className="space-y-6">
            {/* Step 1: Audience and Topic */}
            {aiConfigStep === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <label className="block mb-2 text-xl font-semibold text-[#0F172A]">
                    Who is the intended audience?
                  </label>
                  <input
                    type="text"
                    name="intendedAudience"
                    value={formData.intendedAudience}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="e.g., employees, students, contractors"
                    required={mediaSource === "ai"}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-xl font-semibold text-[#0F172A]">
                    What is the topic or main idea of this course?
                  </label>
                  <input
                    type="text"
                    name="mainTopic"
                    value={formData.mainTopic}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="e.g., safety training, customer service basics"
                    required={mediaSource === "ai"}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Education Level and Tone */}
            {aiConfigStep === 2 && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <label className="block mb-2 text-xl font-semibold text-[#0F172A]">
                    What is the education or experience level of the audience?
                  </label>
                  <input
                    type="text"
                    name="educationLevel"
                    value={formData.educationLevel}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="e.g., high school, professional, no experience"
                    required={mediaSource === "ai"}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-xl font-semibold text-[#0F172A]">
                    What is the tone or style you want?
                  </label>
                  <select
                    name="tone"
                    value={formData.tone}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required={mediaSource === "ai"}
                  >
                    <option value="formal">Formal</option>
                    <option value="casual">Casual</option>
                    <option value="technical">Technical</option>
                    <option value="conversational">Conversational</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 3: Key Points and Question Formats */}
            {aiConfigStep === 3 && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <label className="block mb-2 text-xl font-semibold text-[#0F172A]">
                    What are the key points or concepts that must be covered?
                  </label>
                  <textarea
                    name="keyPoints"
                    value={formData.keyPoints}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    rows="3"
                    placeholder="Enter key points, one per line"
                    required={mediaSource === "ai"}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-xl font-semibold text-[#0F172A]">
                    How should the questions be formatted?
                  </label>
                  {/* Tag display and input area - Reintegrating the tag input */}
                  <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 min-h-[40px]">
                    {formData.questionFormat.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center justify-center px-3 py-1.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full"
                      >
                        {questionOptions.find(opt => opt.value === tag)?.label || tag}
                        <button
                          type="button"
                          className="ml-2 text-blue-700 hover:text-blue-900 focus:outline-none"
                          onClick={() => {
                            setFormData(prev => ({
                              ...prev,
                              questionFormat: prev.questionFormat.filter(t => t !== tag)
                            }));
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      name="questionFormatInput"
                      list="questionFormatOptions"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.target.value.trim() !== '') {
                          e.preventDefault();
                          const inputValue = e.target.value.trim();
                          const selectedOption = questionOptions.find(opt => opt.label.toLowerCase() === inputValue.toLowerCase());
                          const valueToAdd = selectedOption ? selectedOption.value : inputValue;
                          if (valueToAdd && !formData.questionFormat.includes(valueToAdd)) {
                            setFormData(prev => ({
                              ...prev,
                              questionFormat: [...prev.questionFormat, valueToAdd]
                            }));
                          }
                          e.target.value = '';
                        }
                      }}
                      onInput={(e) => {
                        const inputValue = e.target.value;
                        const selectedOption = questionOptions.find(opt => opt.label === inputValue);
                        if (selectedOption && !formData.questionFormat.includes(selectedOption.value)) {
                          setFormData(prev => ({
                            ...prev,
                            questionFormat: [...prev.questionFormat, selectedOption.value]
                          }));
                          e.target.value = '';
                        }
                      }}
                      className="flex-grow p-1 text-sm focus:outline-none bg-transparent placeholder-gray-400"
                      placeholder={formData.questionFormat.length > 0 ? "" : "Add question format..."}
                    />
                    <datalist id="questionFormatOptions">
                      {questionOptions
                        .filter(opt => !formData.questionFormat.includes(opt.value))
                        .map(opt => (
                          <option key={opt.value} value={opt.label} />
                        ))}
                    </datalist>
                  </div>
                  {formData.questionFormat.length === 0 && mediaSource === "ai" && (
                    <p className="text-xs text-red-600 mt-1 pl-1">At least one question format is required.</p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-xl font-semibold text-[#0F172A]">
                    Additional Instructions (optional)
                  </label>
                  <textarea
                    name="additionalInstructions"
                    value={formData.additionalInstructions}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    rows="2"
                    placeholder="Any extra instructions for the AI? (optional)"
                  />
                </div>
              </div>
            )}

            {/* Stepper Navigation */}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => setAiConfigStep(prev => prev - 1)}
                disabled={aiConfigStep === 1}
                className={`px-4 py-2 text-sm font-medium rounded-md transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${aiConfigStep === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Step {aiConfigStep} of {totalAiConfigSteps}
              </span>
              <button
                type="button"
                onClick={() => setAiConfigStep(prev => prev + 1)}
                disabled={aiConfigStep === totalAiConfigSteps}
                className={`px-4 py-2 text-sm font-medium rounded-md transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${aiConfigStep === totalAiConfigSteps ? "bg-blue-300 text-white cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
              >
                Next
              </button>
            </div>
          </div>
        )}

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
            className={`px-6 py-2 bg-[#1A73E8] text-white font-medium rounded-md hover:bg-[#1E40AF] transition ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
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
