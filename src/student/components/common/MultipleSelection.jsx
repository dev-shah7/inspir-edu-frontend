import { CourseEnrollmentStatus } from "../../../helpers/enums";
import CorrectTag from "./CorrectTag";
import IncorrectTag from "./IncorrectTag";

const MultipleSelection = ({
  courseStatus,
  question,
  options,
  userAnswers = [],
  submitted,
  onAnswerChange,
}) => {
  return (
    <div>
      <h2 className="font-bold text-4xl mb-4">{question}</h2>
      <div className="space-y-4 text-xl">
        {options?.map((option) => (
          <label
            key={option.id}
            className={`flex items-center space-x-3 p-6 cursor-pointer rounded-lg ${submitted
              ? userAnswers.includes(option.id)
                ? option.isCorrect
                  ? "bg-green-100"
                  : "bg-red-100"
                : "bg-gray-100"
              : "bg-gray-50 hover:bg-gray-200"
              }`}
            onClick={(e) => {
              if (!submitted && courseStatus !== CourseEnrollmentStatus.DeadlineCrossed) {
                e.preventDefault(); // Prevent double trigger
                onAnswerChange(option.id, !userAnswers.includes(option.id));
              }
            }}
          >
            <div className="self-center flex-shrink-0">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5"
                disabled={submitted || courseStatus === CourseEnrollmentStatus.DeadlineCrossed}
                checked={userAnswers.includes(option.id)}
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
              {submitted && userAnswers?.includes(option.id) && (
                <div className="flex-shrink-0">
                  {option.isCorrect ? <CorrectTag /> : <IncorrectTag />}
                </div>
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default MultipleSelection;
