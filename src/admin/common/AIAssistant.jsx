import { useState } from "react";
import { toast } from "react-hot-toast";

const AIAssistant = ({
  context, // 'course', 'module', or 'question'
  onGenerate,
  onClose,
  initialData = {},
}) => {
  const [formData, setFormData] = useState({
    topic: initialData.topic || "",
    difficulty: initialData.difficulty || "Medium",
    context: initialData.context || "",
    ...getContextSpecificFields(context, initialData),
  });

  const [isGenerating, setIsGenerating] = useState(false);

  function getContextSpecificFields(context, initialData) {
    switch (context) {
      case "course":
        return {
          numberOfModules: initialData.numberOfModules || 1,
          questionsPerModule: initialData.questionsPerModule || 5,
          mediaType: initialData.mediaType || "PDF",
        };
      case "module":
        return {
          numberOfQuestions: initialData.numberOfQuestions || 5,
          mediaType: initialData.mediaType || "PDF",
        };
      case "question":
        return {
          questionType: initialData.questionType || "Multiple Choice",
          numberOfQuestions: initialData.numberOfQuestions || 1,
        };
      default:
        return {};
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);

      // Mock API call - replace with actual AI service integration
      const mockResponse = {
        success: true,
        data: generateMockContent(context, formData),
      };

      if (mockResponse.success) {
        onGenerate(mockResponse.data);
        toast.success("AI generated content successfully!");
        onClose();
      }
    } catch (error) {
      toast.error("Failed to generate content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const generateMockContent = (context, data) => {
    switch (context) {
      case "course":
        return {
          name: `AI Generated Course: ${data.topic}`,
          description: `This is an AI-generated course about ${data.topic}. It contains ${data.numberOfModules} modules with ${data.questionsPerModule} questions each.`,
          modules: Array(parseInt(data.numberOfModules)).fill({
            name: `Module about ${data.topic}`,
            description: `This module covers ${data.topic}`,
            questions: Array(parseInt(data.questionsPerModule)).fill({
              question: `Sample question about ${data.topic}`,
              options: ["Option 1", "Option 2", "Option 3", "Option 4"],
              correctAnswer: 0,
            }),
          }),
        };
      case "module":
        return {
          name: `AI Generated Module: ${data.topic}`,
          description: `This is an AI-generated module about ${data.topic}.`,
          questions: Array(parseInt(data.numberOfQuestions)).fill({
            question: `Sample question about ${data.topic}`,
            options: ["Option 1", "Option 2", "Option 3", "Option 4"],
            correctAnswer: 0,
          }),
        };
      case "question":
        return Array(parseInt(data.numberOfQuestions)).fill({
          question: `Sample ${data.questionType} question about ${data.topic}`,
          options:
            data.questionType === "Multiple Choice"
              ? ["Option 1", "Option 2", "Option 3", "Option 4"]
              : [],
          correctAnswer: 0,
          explanation: "This is a sample explanation for the correct answer",
        });
      default:
        return null;
    }
  };

  const renderContextSpecificFields = () => {
    switch (context) {
      case "course":
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Questions per Module
              </label>
              <input
                type="number"
                name="questionsPerModule"
                value={formData.questionsPerModule}
                onChange={handleInputChange}
                min="1"
                max="20"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Media Type
              </label>
              <select
                name="mediaType"
                value={formData.mediaType}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="PDF">PDF</option>
                <option value="Image">Image</option>
                <option value="Video">Video</option>
              </select>
            </div>
          </>
        );
      case "module":
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Questions
              </label>
              <input
                type="number"
                name="numberOfQuestions"
                value={formData.numberOfQuestions}
                onChange={handleInputChange}
                min="1"
                max="20"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Media Type
              </label>
              <select
                name="mediaType"
                value={formData.mediaType}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="PDF">PDF</option>
                <option value="Image">Image</option>
                <option value="Video">Video</option>
              </select>
            </div>
          </>
        );
      case "question":
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Question Type
              </label>
              <select
                name="questionType"
                value={formData.questionType}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="Multiple Choice">Multiple Choice</option>
                <option value="True/False">True/False</option>
                <option value="Short Answer">Short Answer</option>
                <option value="Essay">Essay</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Questions
              </label>
              <input
                type="number"
                name="numberOfQuestions"
                value={formData.numberOfQuestions}
                onChange={handleInputChange}
                min="1"
                max="10"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Topic
          </label>
          <input
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder={`Enter the topic for your ${context}`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Difficulty Level
          </label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {renderContextSpecificFields()}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Context (Optional)
          </label>
          <textarea
            name="context"
            value={formData.context}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
            placeholder="Provide any additional context or specific requirements"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isGenerating ? "Generating..." : "Generate"}
        </button>
      </div>
    </div>
  );
};

export default AIAssistant;
