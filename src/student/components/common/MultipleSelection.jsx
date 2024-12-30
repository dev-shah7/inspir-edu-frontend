import CorrectTag from "./CorrectTag";
import IncorrectTag from "./IncorrectTag";

const MultipleSelection = ({
  question,
  options,
  userAnswers = [],
  submitted,
  onAnswerChange,
}) => {
  return (
    <div>
      <h2 className="font-bold text-lg mb-4">{question}</h2>
      <div className="space-y-4">
        {options?.map((option) => (
          <div key={option.id}>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                className={`form-checkbox h-5 w-5 ${submitted
                  ? userAnswers?.includes(option.id)
                    ? option.isCorrect
                      ? "text-button-green"
                      : "text-red-500"
                    : "text-button-blue"
                  : "text-button-blue"
                  }`}
                disabled={submitted}
                checked={userAnswers?.includes(option.id)}
                onChange={(e) => onAnswerChange(option.id, e.target.checked)}
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
            </div>
            {submitted && userAnswers?.includes(option.id) && (
              option.isCorrect ? <CorrectTag /> : <IncorrectTag />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleSelection;
