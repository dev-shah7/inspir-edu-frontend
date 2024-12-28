import CorrectTag from "./CorrectTag";
import IncorrectTag from "./IncorrectTag";

const MCQ = ({ question, options, userAnswers, submitted, onAnswerChange }) => {
  return (
    <div>
      <h2 className="font-bold text-lg mb-4">{question}</h2>
      <div className="space-y-4">
        {options?.map((option, idx) => (
          <div key={idx}>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                className={`form-checkbox h-5 w-5 ${submitted
                    ? userAnswers.includes(idx)
                      ? option.isCorrect
                        ? "text-button-green"
                        : "text-red-500"
                      : "text-button-blue"
                    : "text-button-blue"
                  }`}
                disabled={submitted} // Disable checkbox after submission
                checked={userAnswers.includes(idx)} // Reflect current selection
                onChange={(e) =>
                  onAnswerChange(idx, e.target.checked) // Update state on change
                }
              />
              <span
                className={`${submitted
                    ? userAnswers.includes(idx)
                      ? option.isCorrect
                        ? "text-button-green"
                        : "text-red-500"
                      : option.isCorrect
                        ? "text-button-green"
                        : "text-gray-800"
                    : "text-gray-800"
                  }`}
              >
                {option.option}
              </span>
            </div>
            {submitted && userAnswers.includes(idx) && (
              option.isCorrect ? <CorrectTag /> : <IncorrectTag />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MCQ;
