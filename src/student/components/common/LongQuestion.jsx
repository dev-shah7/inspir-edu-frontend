const LongQuestion = ({
  question,
  placeholder,
  userAnswer,
  submitted,
  onAnswerChange,
}) => {
  return (
    <div>
      <h2 className="font-bold text-lg mb-4">{question}</h2>
      <textarea
        className="w-full h-32 border border-gray-300 rounded-md p-3 focus:outline-button-blue"
        placeholder={placeholder}
        disabled={submitted} // Disable after submission
        value={userAnswer || ""} // Controlled input reflecting current state
        onChange={(e) => onAnswerChange(e.target.value)} // Notify parent of changes
      ></textarea>
    </div>
  );
};

export default LongQuestion;
