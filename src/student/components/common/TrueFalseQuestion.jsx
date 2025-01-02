import { CourseEnrollmentStatus } from "../../../helpers/enums";
import CorrectTag from "./CorrectTag";
import IncorrectTag from "./IncorrectTag";

const TrueFalseQuestion = ({
  courseStatus,
  question,
  options,
  name,
  userAnswer,
  submitted,
  onAnswerChange,
}) => {
  return (
    <div>
      <h2 className="font-bold text-4xl mb-4">{question}</h2>
      <div className="space-y-2 text-xl">
        {options?.map((option) => (
          <label
            key={option.id}
            className={`flex items-center space-x-3 p-2 cursor-pointer rounded-lg ${submitted
              ? option.id === userAnswer
                ? option.isCorrect
                  ? "bg-green-100"
                  : "bg-red-100"
                : "bg-gray-100"
              : "bg-gray-50 hover:bg-gray-200"
              }`}
            onClick={(e) => {
              if (!submitted && courseStatus !== CourseEnrollmentStatus.DeadlineCrossed) {
                e.preventDefault(); // Prevent default behavior
                onAnswerChange(option.id);
              }
            }}

          >
            <input
              type="radio"
              name={name}
              className="form-radio h-5 w-5"
              disabled={submitted || courseStatus === CourseEnrollmentStatus.DeadlineCrossed}
              checked={option.id === userAnswer}
              readOnly // Prevent direct edits
            />
            <span
              className={`${submitted
                ? option.isCorrect
                  ? "text-button-green"
                  : "text-gray-800"
                : "text-gray-800"
                }`}
            >
              {option.option}
            </span>
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

export default TrueFalseQuestion;
