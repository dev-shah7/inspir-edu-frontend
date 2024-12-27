import React from "react";

const QuestionCard = ({ questions, onClose }) => {
  const getQuestionTypeName = (type) => {
    switch (type) {
      case 0:
        return "Short Answer";
      case 1:
        return "Long Answer";
      case 2:
        return "Multiple Choice";
      case 3:
        return "True/False";
      case 4:
        return "Yes/No";
      case 5:
        return "Checkbox";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="bg-blue-50 rounded-lg shadow-md p-8">
      <div className="space-y-8">
        {questions.map((question, index) => (
          <div key={question.id} className="mb-6">
            {/* Question Header */}
            <div className="flex justify-between items-center mb-1">
               <h2 className="text-md font-outfit text-gray-800 mb-0">
                    Question {index + 1}: 
               </h2>
            </div>

            <h3 className="text-md font-outfit text-gray-800 mb-3 mt-0">
              {question.question}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {[2, 5].includes(question.type) && question.questionOptions ? (
                // Multiple choice or checkbox
                question.questionOptions.map((option, optionIndex) => (
                  <div
                    key={option.id}
                    className="flex items-center gap-4 text-gray-700"
                  >
                    <input
                      type={question.type === 2 ? "radio" : "checkbox"}
                      name={`question-${question.id}`}
                      id={`question-${question.id}-option-${optionIndex}`}
                      className="w-5 h-5 text-blue-600 ring-blue-500 focus:ring-blue-500 border-4 border-custom-border-blue rounded"
                    />
                    <label
                      htmlFor={`question-${question.id}-option-${optionIndex}`}
                      className="text-md"
                    >
                      {option.option}
                    </label>
                  </div>
                ))
              ) : question.type === 3 || question.type === 4 ? (
                // True/False or Yes/No
                <div className="space-y-3">
                  {(question.type === 3 ? ["True", "False"] : ["Yes", "No"]).map(
                    (option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className="flex items-center gap-3 text-gray-700"
                      >
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          id={`question-${question.id}-option-${optionIndex}`}
                          className="w-5 h-5 text-md text-blue-600 focus:ring-blue-500 border-2 border-blue-500 rounded-full"
                        />
                        <label
                          htmlFor={`question-${question.id}-option-${optionIndex}`}
                          className="text-md"
                        >
                          {option}
                        </label>
                      </div>
                    )
                  )}
                </div>
              ) : (
                // Short or Long Answer
                <>
                  <span className="text-sm">Answer: (Short Answer)</span>
                  <div className="mt-2">
                    <textarea
                      className="w-full p-4 border border-gray-300 rounded-md bg-gray-50"
                      rows={question.type === 0 ? 2 : 4}
                      maxLength={80}
                    />
                    <p className="text-sm text-gray-400 mt-1">
                      Answer maximum 80 words
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Back Button */}
      <div className="mt-8 flex justify-start">
        <button
          className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition focus:outline-none focus:ring focus:ring-blue-300"
          onClick={onClose}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
