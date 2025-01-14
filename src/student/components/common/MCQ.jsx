import { CourseEnrollmentStatus } from "../../../helpers/enums";
import CorrectTag from "./CorrectTag";
import IncorrectTag from "./IncorrectTag";

const MCQ = ({ courseStatus, question, options, userAnswer, submitted, onAnswerChange }) => {
  return (
    <div>
      <h2 className="font-bold text-4xl mb-4">{question}</h2>
      <div className="space-y-4 text-xl">
        {options?.map((option) => (
          <label
            key={option.id}
            className={`flex items-center space-x-3 p-6 cursor-pointer rounded-lg ${submitted
              ? userAnswer === option.id
                ? option.isCorrect
                  ? "bg-green-100"
                  : "bg-red-100"
                : "bg-gray-100"
              : "bg-gray-50 hover:bg-gray-200"
              }`}
            onClick={(e) => {
              if (!submitted && courseStatus !== CourseEnrollmentStatus.DeadlineCrossed) {
                e.preventDefault();
                onAnswerChange(option.id);
              }
            }}
          >
            <div className="self-center flex-shrink-0">
              <input
                type="radio"
                name={`mcq-${question}`}
                className="form-radio h-5 w-5"
                disabled={submitted || courseStatus === CourseEnrollmentStatus.DeadlineCrossed}
                checked={userAnswer === option.id}
                readOnly
              />
            </div>
            <div className="flex flex-1 gap-2">
              <span
                className={`leading-relaxed ${submitted
                  ? option.isCorrect
                    ? "text-button-green"
                    : "text-gray-800"
                  : "text-gray-800"
                  }`}
              >
                {option.option}
              </span>
              {submitted && userAnswer === option.id && (
                <div className="flex-shrink-0">
                  {option.isCorrect ? <CorrectTag /> : <IncorrectTag />}
                </div>
              )}
            </div>
          </label>
        ))}
      </div>
      {submitted && userAnswer && (
        <div className="mt-4">
          {options.find((option) => option.id === userAnswer)?.isCorrect ? (
            <CorrectTag />
          ) : (
            <IncorrectTag />
          )}
        </div>
      )}
    </div>
  );
};

export default MCQ;
