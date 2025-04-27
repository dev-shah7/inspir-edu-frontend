import { useState } from "react";
import { toast } from "react-hot-toast";

const AIQuestionAssistant = ({ onQuestionGenerated, onClose }) => {
  const [formData, setFormData] = useState({
    topic: "",
    difficulty: "Medium",
    questionType: "Multiple Choice",
    numberOfQuestions: 1,
    context: "",
  });

  const difficulties = ["Easy", "Medium", "Hard"];
  const questionTypes = [
    "Multiple Choice",
    "True/False",
    "Short Answer",
    "Essay",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenerate = () => {
    // Mock generated questions - replace with actual AI generation later
    const mockQuestions = Array(parseInt(formData.numberOfQuestions)).fill({
      question: `Sample ${formData.questionType} question about ${formData.topic}`,
      options:
        formData.questionType === "Multiple Choice"
          ? ["Option 1", "Option 2", "Option 3", "Option 4"]
          : [],
      correctAnswer: formData.questionType === "Multiple Choice" ? 0 : "",
      explanation: "This is a sample explanation for the correct answer",
    });

    console.log("Generated Questions:", mockQuestions);
    onQuestionGenerated(mockQuestions);
    toast.success("Questions generated successfully!");
  };

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-xl font-semibold text-gray-800">
        AI Question Assistant
      </h2>

      <div className="space-y-4">
        {/* Topic Input */}
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
            placeholder="Enter the topic for questions"
          />
        </div>

        {/* Difficulty Level */}
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
            {difficulties.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        {/* Question Type */}
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
            {questionTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Number of Questions */}
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

        {/* Additional Context */}
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
            placeholder="Provide any additional context or specific requirements for the questions"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 pt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleGenerate}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Generate Questions
        </button>
      </div>
    </div>
  );
};

export default AIQuestionAssistant;
