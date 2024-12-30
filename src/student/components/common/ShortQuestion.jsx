import CorrectTag from "./CorrectTag";
import IncorrectTag from "./IncorrectTag";

const ShortQuestion = ({
  question,
  placeholder,
  userAnswer,
  correctAnswer,
  submitted,
  onAnswerChange,
}) => {
  return (
    <div>
      <h2 className="font-bold text-lg mb-4">{question}</h2>
      <textarea
        className={`w-full h-20 border ${submitted
          ? userAnswer === correctAnswer
            ? "border-button-green"
            : "border-red-500"
          : "border-gray-300"
          } rounded-md p-3 focus:outline-button-blue`}
        placeholder={placeholder}
        disabled={submitted}
        value={userAnswer || ""}
        onChange={(e) => onAnswerChange(e.target.value)}
      ></textarea>
      {submitted && (
        <div className="mt-2">
          {userAnswer === correctAnswer ? (
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

export default ShortQuestion;
