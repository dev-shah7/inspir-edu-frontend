import React, { useEffect, useState } from "react";
import CorrectTag from "./CorrectTag";
import IncorrectTag from "./IncorrectTag";
import { CourseEnrollmentStatus } from "../../../helpers/enums";

const LongQuestion = ({
  courseStatus,
  question,
  placeholder,
  userAnswer,
  correctAnswer,
  submitted,
  onAnswerChange,
  debounceTime = 900, // Default debounce time in milliseconds
}) => {
  const [localAnswer, setLocalAnswer] = useState(userAnswer || "");
  const [hasStartedTyping, setHasStartedTyping] = useState(false);

  useEffect(() => {
    let handler;
    if (hasStartedTyping) {
      handler = setTimeout(() => {
        if (localAnswer !== userAnswer) {
          onAnswerChange(localAnswer);
        }
      }, debounceTime);
    }

    return () => {
      if (handler) clearTimeout(handler); // Clear the timeout if the user types within the debounce time
    };
  }, [localAnswer, userAnswer, onAnswerChange, debounceTime, hasStartedTyping]);

  const handleTextareaChange = (value) => {
    if (!hasStartedTyping) {
      setHasStartedTyping(true); // Start the timer only once
    }
    setLocalAnswer(value);
  };

  return (
    <div>
      <h2 className="font-bold text-4xl mb-4">{question}</h2>
      <textarea
        className={`w-full h-32 border text-xl ${submitted
          ? localAnswer === correctAnswer
            ? "border-button-green"
            : "border-red-500"
          : "border-gray-300"
          } rounded-md p-3 focus:outline-button-blue`}
        placeholder={placeholder}
        disabled={submitted || courseStatus === CourseEnrollmentStatus.DeadlineCrossed}
        value={localAnswer}
        onChange={(e) => handleTextareaChange(e.target.value)}
      ></textarea>
      {submitted && (
        <div className="mt-2">
          {localAnswer === correctAnswer ? (
            <CorrectTag />
          ) : (
            <div>
              <IncorrectTag />
              <p className="mt-1 text-red-500 text-lg">Correct Answer: {correctAnswer}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LongQuestion;
