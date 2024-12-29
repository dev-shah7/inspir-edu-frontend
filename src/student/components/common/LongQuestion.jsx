import React, { useEffect, useState } from "react";
import CorrectTag from "./CorrectTag";
import IncorrectTag from "./IncorrectTag";

const LongQuestion = ({
  question,
  placeholder,
  userAnswer,
  correctAnswer,
  submitted,
  onAnswerChange,
  debounceTime = 300, // Default debounce time in milliseconds
}) => {
  const [localAnswer, setLocalAnswer] = useState(userAnswer || "");

  useEffect(() => {
    const handler = setTimeout(() => {
      if (localAnswer !== userAnswer) {
        onAnswerChange(localAnswer);
      }
    }, debounceTime);

    return () => {
      clearTimeout(handler); // Clear the timeout if the user types within the debounce time
    };
  }, [localAnswer, userAnswer, onAnswerChange, debounceTime]);

  return (
    <div>
      <h2 className="font-bold text-lg mb-4">{question}</h2>
      <textarea
        className={`w-full h-32 border ${submitted
          ? localAnswer === correctAnswer
            ? "border-button-green"
            : "border-red-500"
          : "border-gray-300"
          } rounded-md p-3 focus:outline-button-blue`}
        placeholder={placeholder}
        disabled={submitted}
        value={localAnswer}
        onChange={(e) => setLocalAnswer(e.target.value)}
      ></textarea>
      {submitted && (
        <div className="mt-2">
          {localAnswer === correctAnswer ? (
            <CorrectTag />
          ) : (
            <div>
              <IncorrectTag />
              <p className="mt-1 text-red-500">Correct Answer: {correctAnswer}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LongQuestion;
