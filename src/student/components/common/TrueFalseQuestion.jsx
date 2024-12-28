import CorrectTag from "./CorrectTag";
import IncorrectTag from "./IncorrectTag";

const TrueFalseQuestion = ({
  question,
  options,
  name,
  userAnswer,
  submitted,
  onAnswerChange,
}) => {
  return (
    <div>
      <h2 className="font-bold text-lg mb-4">{question}</h2>
      <div className="space-y-2">
        {options?.map((option, idx) => (
          <div key={idx}>
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                name={name}
                className={`form-radio h-5 w-5 ${submitted
                    ? idx === userAnswer
                      ? option.isCorrect
                        ? "text-button-green"
                        : "text-red-500"
                      : "text-button-blue"
                    : "text-button-blue"
                  }`}
                disabled={submitted} // Disable after submission
                checked={idx === userAnswer} // Reflects current selection
                onChange={() => onAnswerChange(idx)} // Update parent state on change
              />
              <span
                className={`${submitted
                    ? idx === userAnswer
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
            {submitted && idx === userAnswer && (
              option.isCorrect ? <CorrectTag /> : <IncorrectTag />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrueFalseQuestion;
