import React from "react";

const QuestionTypeDropdown = ({ value, onChange }) => {
  const questionTypes = [
    { value: "", label: "Select Question Type" },
    { value: "short-answer", label: "Short Answer" },
    { value: "long-answer", label: "Long Answer" },
    { value: "mcq", label: "Multiple Choice" },
    { value: "checkbox", label: "Choose all that apply" },
    { value: "true-false", label: "True/False" },
    { value: "yes-no", label: "Yes/No" },
  ];

  return (
    <div className="bg-blue-50 rounded-lg w-full">
      <label
        htmlFor="questionType"
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        Question Type
      </label>
      <select
        id="questionType"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none text-gray-800"
      >
        {questionTypes.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.value === ""}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default QuestionTypeDropdown;
