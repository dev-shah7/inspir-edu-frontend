import CorrectTag from "./CorrectTag";
import IncorrectTag from "./IncorrectTag";

const YesNoQuestion = ({ question, options, name, userAnswer, submitted }) => {
  return (
    <div>
      <h2 className="font-bold text-lg mb-4">{question}</h2>
      <div className="space-y-2">
        {options.map((option, idx) => (
          <>
            <div key={idx} className="flex items-center space-x-3">
              <input
                type="radio"
                name={name}
                className={`form-radio h-5 w-5 ${submitted
                    ? idx === userAnswer
                      ? option.correct
                        ? "text-button-green"
                        : "text-red-500"
                      : "text-button-blue"
                    : "text-button-blue"
                  }`}
                disabled={submitted}
                checked={submitted && idx === userAnswer}
              />
              <span
                className={`${submitted
                    ? idx === userAnswer
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
            </div>
            {submitted && idx === userAnswer && (
              option.correct ? <CorrectTag /> : <IncorrectTag />
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default YesNoQuestion;
