import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useCourseStore from "../store/useCourseStore";
import useAuthStore from "../../store/auth/useAuthStore";
import axios from "axios";
import { IoMdCloudUpload, IoMdTrash, IoMdArrowBack } from "react-icons/io";
import { FaRobot, FaBrain, FaChartLine, FaUsers, FaCog } from "react-icons/fa";

const FAST_API_BASE_URL = import.meta.env.VITE_FAST_API_BASE_URL;

const steps = [
  {
    id: 1,
    title: "Course Overview",
    icon: FaBrain,
    description: "Basic course information and objectives",
  },
  {
    id: 2,
    title: "Content & Media",
    icon: IoMdCloudUpload,
    description: "Upload your learning materials",
  },
  {
    id: 3,
    title: "AI Configuration",
    icon: FaRobot,
    description: "Configure AI generation settings",
  },
  {
    id: 4,
    title: "Assessment Setup",
    icon: FaChartLine,
    description: "Define questions and grading",
  },
  {
    id: 5,
    title: "Access & Settings",
    icon: FaCog,
    description: "Final course settings",
  },
];

const mediaTypes = [
  {
    value: "pdf",
    label: "PDF Document",
    accept: ".pdf",
    icon: "📄",
    color: "bg-red-50 border-red-200 text-red-700",
  },
  {
    value: "image",
    label: "Image",
    accept: "image/*",
    icon: "🖼️",
    color: "bg-blue-50 border-blue-200 text-blue-700",
  },
  {
    value: "video",
    label: "Video",
    accept: "video/*",
    icon: "🎥",
    color: "bg-purple-50 border-purple-200 text-purple-700",
  },
];

const difficultyLevels = [
  {
    value: "beginner",
    label: "Beginner",
    description: "Basic concepts and introductory material",
  },
  {
    value: "intermediate",
    label: "Intermediate",
    description: "Moderate complexity with some prerequisites",
  },
  {
    value: "advanced",
    label: "Advanced",
    description: "Complex topics requiring solid foundation",
  },
];

const questionTypes = [
  {
    value: "multiple_choice",
    label: "Multiple Choice",
    description: "Choose one correct answer",
  },
  {
    value: "true_false",
    label: "True/False",
    description: "Binary choice questions",
  },
  {
    value: "short_answer",
    label: "Short Answer",
    description: "Brief text responses",
  },
  {
    value: "essay",
    label: "Essay",
    description: "Long-form written responses",
  },
  {
    value: "choose_all",
    label: "Choose All That Apply",
    description: "Multiple correct answers",
  },
];

const learningObjectives = [
  "Knowledge & Understanding",
  "Application & Analysis",
  "Synthesis & Evaluation",
  "Practical Skills",
  "Critical Thinking",
  "Problem Solving",
];

const AICreateCourseContent = () => {
  const navigate = useNavigate();
  const { fetchCourses } = useCourseStore();
  const { user } = useAuthStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [courseData, setCourseData] = useState({
    // Step 1: Course Overview
    name: "",
    description: "",
    category: "",
    estimatedDuration: "",
    targetAudience: "",
    prerequisites: "",
    learningObjectives: [],

    // Step 2: Content & Media
    mediaFiles: [],
    contentStructure: "auto", // auto, manual

    // Step 3: AI Configuration
    difficulty: "intermediate",
    toneStyle: "professional", // professional, casual, academic, conversational
    contentFocus: "balanced", // theoretical, practical, balanced
    aiInstructions: "",

    // Step 4: Assessment Setup
    numberOfModules: 5,
    questionsPerModule: 3,
    questionTypes: ["multiple_choice", "short_answer"],
    passingScore: 70,
    allowRetakes: true,

    // Step 5: Access & Settings
    accessType: "public", // public, private, restricted
    timeLimit: 0, // 0 = no limit
    certificateEnabled: true,
    emailNotifications: true,
  });

  const handleInputChange = (field, value) => {
    setCourseData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (files) => {
    const newFiles = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      type: file.type.includes("image")
        ? "image"
        : file.type.includes("video")
        ? "video"
        : "pdf",
      size: file.size,
      preview: file.type.includes("image") ? URL.createObjectURL(file) : null,
    }));

    setCourseData((prev) => ({
      ...prev,
      mediaFiles: [...prev.mediaFiles, ...newFiles],
    }));
  };

  const removeFile = (fileId) => {
    setCourseData((prev) => ({
      ...prev,
      mediaFiles: prev.mediaFiles.filter((f) => f.id !== fileId),
    }));
  };

  const handleArrayToggle = (field, value) => {
    setCourseData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return (
          courseData.name && courseData.description && courseData.targetAudience
        );
      case 2:
        return courseData.mediaFiles.length > 0;
      case 3:
        return courseData.difficulty && courseData.toneStyle;
      case 4:
        return (
          courseData.numberOfModules > 0 && courseData.questionsPerModule > 0
        );
      case 5:
        return true;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    } else {
      toast.error("Please fill in all required fields before proceeding");
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(5)) {
      toast.error("Please complete all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();

      // Add course data
      formData.append(
        "courseData",
        JSON.stringify({
          name: courseData.name,
          description: courseData.description,
          category: courseData.category,
          targetAudience: courseData.targetAudience,
          prerequisites: courseData.prerequisites,
          learningObjectives: courseData.learningObjectives,
          difficulty: courseData.difficulty,
          toneStyle: courseData.toneStyle,
          contentFocus: courseData.contentFocus,
          aiInstructions: courseData.aiInstructions,
          numberOfModules: courseData.numberOfModules,
          questionsPerModule: courseData.questionsPerModule,
          questionTypes: courseData.questionTypes,
          passingScore: courseData.passingScore,
          allowRetakes: courseData.allowRetakes,
          accessType: courseData.accessType,
          timeLimit: courseData.timeLimit,
          certificateEnabled: courseData.certificateEnabled,
        })
      );

      // Add media files
      courseData.mediaFiles.forEach((mediaFile, index) => {
        formData.append(`mediaFiles`, mediaFile.file);
      });

      const response = await axios.post(
        `${FAST_API_BASE_URL}/courses/generate-advanced`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(
        "AI course generation started! You'll be notified when it's ready.",
        {
          duration: 5000,
          position: "top-right",
        }
      );

      await fetchCourses();
      navigate("/admin/courses");
    } catch (error) {
      console.error("Error generating course:", error);
      toast.error(error.response?.data?.message || "Failed to generate course");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Name *
                </label>
                <input
                  type="text"
                  value={courseData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter an engaging course title"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Description *
                </label>
                <textarea
                  value={courseData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Describe what students will learn and achieve..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Audience *
                </label>
                <input
                  type="text"
                  value={courseData.targetAudience}
                  onChange={(e) =>
                    handleInputChange("targetAudience", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Beginners, Professionals, Students"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={courseData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  <option value="technology">Technology</option>
                  <option value="business">Business</option>
                  <option value="design">Design</option>
                  <option value="marketing">Marketing</option>
                  <option value="health">Health & Wellness</option>
                  <option value="education">Education</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prerequisites
                </label>
                <textarea
                  value={courseData.prerequisites}
                  onChange={(e) =>
                    handleInputChange("prerequisites", e.target.value)
                  }
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="What should students know before taking this course?"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Learning Objectives
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {learningObjectives.map((objective) => (
                  <label
                    key={objective}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={courseData.learningObjectives.includes(
                        objective
                      )}
                      onChange={() =>
                        handleArrayToggle("learningObjectives", objective)
                      }
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{objective}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Upload Your Learning Materials
              </h3>
              <p className="text-gray-600">
                Upload multiple files that our AI will analyze to create your
                course content
              </p>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                multiple
                accept=".pdf,image/*,video/*"
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <IoMdCloudUpload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">
                  Drop files here or click to upload
                </p>
                <p className="text-sm text-gray-500">
                  Support for PDFs, Images, and Videos (Max 100MB per file)
                </p>
              </label>
            </div>

            {courseData.mediaFiles.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">
                  Uploaded Files ({courseData.mediaFiles.length})
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {courseData.mediaFiles.map((file) => (
                    <div
                      key={file.id}
                      className="border rounded-lg p-4 bg-gray-50"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">
                            {
                              mediaTypes.find((t) => t.value === file.type)
                                ?.icon
                            }
                          </span>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFile(file.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <IoMdTrash />
                        </button>
                      </div>
                      {file.preview && (
                        <img
                          src={file.preview}
                          alt={file.name}
                          className="w-full h-20 object-cover rounded"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Difficulty Level *
                </label>
                <div className="space-y-3">
                  {difficultyLevels.map((level) => (
                    <label
                      key={level.value}
                      className="flex items-start space-x-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="difficulty"
                        value={level.value}
                        checked={courseData.difficulty === level.value}
                        onChange={(e) =>
                          handleInputChange("difficulty", e.target.value)
                        }
                        className="mt-1 text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <div className="font-medium text-gray-900">
                          {level.label}
                        </div>
                        <div className="text-sm text-gray-500">
                          {level.description}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content Tone & Style *
                </label>
                <select
                  value={courseData.toneStyle}
                  onChange={(e) =>
                    handleInputChange("toneStyle", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="professional">Professional & Formal</option>
                  <option value="casual">Casual & Friendly</option>
                  <option value="academic">Academic & Scholarly</option>
                  <option value="conversational">
                    Conversational & Engaging
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content Focus
                </label>
                <select
                  value={courseData.contentFocus}
                  onChange={(e) =>
                    handleInputChange("contentFocus", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="theoretical">More Theoretical</option>
                  <option value="practical">More Practical</option>
                  <option value="balanced">Balanced Mix</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Instructions for AI
              </label>
              <textarea
                value={courseData.aiInstructions}
                onChange={(e) =>
                  handleInputChange("aiInstructions", e.target.value)
                }
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Any specific requirements, topics to emphasize, or teaching approaches you'd like the AI to consider..."
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Modules *
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={courseData.numberOfModules}
                  onChange={(e) =>
                    handleInputChange(
                      "numberOfModules",
                      parseInt(e.target.value)
                    )
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Questions per Module *
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={courseData.questionsPerModule}
                  onChange={(e) =>
                    handleInputChange(
                      "questionsPerModule",
                      parseInt(e.target.value)
                    )
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Passing Score (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={courseData.passingScore}
                  onChange={(e) =>
                    handleInputChange("passingScore", parseInt(e.target.value))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="allowRetakes"
                  checked={courseData.allowRetakes}
                  onChange={(e) =>
                    handleInputChange("allowRetakes", e.target.checked)
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="allowRetakes"
                  className="text-sm font-medium text-gray-700"
                >
                  Allow retakes
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Question Types
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {questionTypes.map((type) => (
                  <label
                    key={type.value}
                    className="flex items-start space-x-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={courseData.questionTypes.includes(type.value)}
                      onChange={() =>
                        handleArrayToggle("questionTypes", type.value)
                      }
                      className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        {type.label}
                      </div>
                      <div className="text-sm text-gray-500">
                        {type.description}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Access
                </label>
                <select
                  value={courseData.accessType}
                  onChange={(e) =>
                    handleInputChange("accessType", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="public">Public - Anyone can access</option>
                  <option value="private">Private - Invitation only</option>
                  <option value="restricted">
                    Restricted - Requires approval
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Limit (hours, 0 = unlimited)
                </label>
                <input
                  type="number"
                  min="0"
                  value={courseData.timeLimit}
                  onChange={(e) =>
                    handleInputChange("timeLimit", parseInt(e.target.value))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="certificateEnabled"
                  checked={courseData.certificateEnabled}
                  onChange={(e) =>
                    handleInputChange("certificateEnabled", e.target.checked)
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="certificateEnabled"
                  className="text-sm font-medium text-gray-700"
                >
                  Generate completion certificates
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="emailNotifications"
                  checked={courseData.emailNotifications}
                  onChange={(e) =>
                    handleInputChange("emailNotifications", e.target.checked)
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="emailNotifications"
                  className="text-sm font-medium text-gray-700"
                >
                  Send email notifications to students
                </label>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Course Summary</h4>
              <div className="text-sm text-blue-800 space-y-1">
                <p>
                  <strong>Name:</strong> {courseData.name || "Not specified"}
                </p>
                <p>
                  <strong>Modules:</strong> {courseData.numberOfModules}
                </p>
                <p>
                  <strong>Questions per Module:</strong>{" "}
                  {courseData.questionsPerModule}
                </p>
                <p>
                  <strong>Media Files:</strong> {courseData.mediaFiles.length}
                </p>
                <p>
                  <strong>Difficulty:</strong> {courseData.difficulty}
                </p>
                <p>
                  <strong>Tone:</strong> {courseData.toneStyle}
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Progress Steps */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => navigate("/admin/courses")}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <IoMdArrowBack className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Back to Courses</span>
            </button>
            <div className="flex items-center space-x-2">
              <FaRobot className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-gray-600">AI Course Creator</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;

              return (
                <div
                  key={step.id}
                  className="flex flex-col items-center flex-1 relative"
                >
                  {/* Connection line */}
                  {index < steps.length - 1 && (
                    <div
                      className={`absolute top-4 left-1/2 w-full h-0.5 -z-10 ${
                        step.id < currentStep ? "bg-blue-500" : "bg-gray-300"
                      }`}
                    />
                  )}

                  <div
                    className={`
                    w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-all duration-300 relative z-10
                    ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg ring-2 ring-blue-200"
                        : isCompleted
                        ? "bg-green-500 text-white"
                        : "bg-white border-2 border-gray-300 text-gray-500"
                    }
                  `}
                  >
                    {isCompleted && !isActive ? (
                      <svg
                        className="w-4 h-4"
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
                      <StepIcon className="w-4 h-4" />
                    )}
                  </div>
                  <div className="text-center">
                    <p
                      className={`text-xs font-medium ${
                        isActive ? "text-blue-600" : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {steps[currentStep - 1].title}
            </h1>
            <p className="text-gray-600">
              {steps[currentStep - 1].description}
            </p>
          </div>

          <div className="py-4">{renderStepContent()}</div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                currentStep === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Previous
            </button>

            <div className="flex space-x-4">
              <button
                onClick={() => navigate("/admin/courses")}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>

              {currentStep === steps.length ? (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`px-8 py-3 bg-blue-600 text-white rounded-lg font-medium transition-colors ${
                    isSubmitting
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-blue-700"
                  }`}
                >
                  {isSubmitting ? "Generating Course..." : "Generate Course"}
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICreateCourseContent;
