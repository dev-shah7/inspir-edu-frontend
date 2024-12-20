import React from "react";

const dummyQuestions = [
  {
    id: 1,
    question:
      "Which of the following best describes your learning preferences?",
    options: [
      { id: 1, text: "Visual Learning (e.g., videos, images)", type: "radio" },
      {
        id: 2,
        text: "Auditory Learning (e.g., lectures, discussions)",
        type: "radio",
      },
      {
        id: 3,
        text: "Kinesthetic Learning (e.g., hands-on activities)",
        type: "radio",
      },
      {
        id: 4,
        text: "Reading/Writing (e.g., text-based materials)",
        type: "radio",
      },
    ],
  },
  {
    id: 2,
    question: "Is this course going to have ____________ at the end?",
    options: [
      { id: 1, text: "Option 01", type: "radio" },
      { id: 2, text: "Option 02", type: "radio" },
      { id: 3, text: "Option 03", type: "radio" },
      { id: 4, text: "Option 05", type: "radio" },
    ],
  },
  {
    id: 3,
    question: "Is this course going to have ____________ at the end?",
    options: [
      { id: 1, text: "Option 01", type: "radio" },
      { id: 2, text: "Option 02", type: "radio" },
      { id: 3, text: "Option 03", type: "radio" },
      { id: 4, text: "Option 05", type: "radio" },
    ],
  },
  {
    id: 4,
    question:
      "Lorem ipsum dolor sit amet consectetur. In pretium a ornare amet cum cras ut aliquam.",
    options: [
      { id: 1, text: "Yes", type: "radio" },
      { id: 2, text: "No", type: "radio" },
    ],
  },
];

const Questions = () => {
  return (
    <>
      <p className="text-md text-gray-600 mb-8">
        Courses / Modules / Questions
      </p>
      <h1 className="mt-4 text-3xl font-bold text-gray-800">All Questions</h1>
      <div className="mt-4 h-0.5 bg-gradient-to-r from-custom-div-blue to-transparent"></div>
      <div className="overflow-x-auto mt-4 bg-blue-50 p-6 rounded-xl shadow-md">
        {dummyQuestions.map((question) => (
          <div key={question.id} className="mb-6">
            <h2 className="text-lg font-outfit text-gray-800 mb-4">
              Question {question.id}: {question.question}
            </h2>
            <div className="space-y-2">
              {question.options.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center space-x-3 text-gray-700"
                >
                  <input
                    type={option.type}
                    id={`question-${question.id}-option-${option.id}`}
                    name={`question-${question.id}`}
                    className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`question-${question.id}-option-${option.id}`}
                    className="text-base"
                  >
                    {option.text}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Questions;
