import CorrectTag from "./CorrectTag";
import IncorrectTag from "./IncorrectTag";

const MultipleSelection = ({ question, options, userAnswers, submitted }) => {
  return (
    <div>
      <h2 className="font-bold text-lg mb-4">{question}</h2>
      <div className="space-y-4">
        {options.map((option, idx) => (
          <>
            <div key={idx} className="flex items-center space-x-3">
              <input
                type="checkbox"
                className={`form-checkbox h-5 w-5 ${submitted
                    ? userAnswers.includes(idx)
                      ? option.correct
                        ? "text-button-green"
                        : "text-red-500"
                      : "text-button-blue"
                    : "text-button-blue"
                  }`}
                disabled={submitted}
                checked={submitted && userAnswers.includes(idx)}
              />
              <span className="flex items-center space-x-2">
                <span
                  className={`${submitted
                      ? userAnswers.includes(idx)
                        ? option.correct
                          ? "text-button-green"
                          : "text-red-500"
                        : option.correct
                          ? "text-button-green"
                          : "text-gray-800"
                      : "text-gray-800"
                    }`}
                >
                  {option.text}
                </span>
              </span>
            </div>
            {submitted && userAnswers.includes(idx) && (
              option.correct ? <CorrectTag /> : <IncorrectTag />
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default MultipleSelection;
