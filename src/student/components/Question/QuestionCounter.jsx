import React from "react";

const QuestionCounter = ({ currentIndex, totalQuestions }) => {
  return (
    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow mx-5">
      <p className="text-3xl font-bold text-green-800">
        Question {currentIndex + 1} of {totalQuestions}
      </p>
      <p className="text-3xl font-medium text-teal-600">
        Remaining Questions: {totalQuestions - currentIndex - 1}
      </p>
    </div>
  );
};

export default QuestionCounter;
