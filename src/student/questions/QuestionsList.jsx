import CongratulationsBanner from "../components/common/CongratulationsBanner";
import LongQuestion from "../components/common/LongQuestion";
import MCQ from "../components/common/MCQ";
import MultipleSelection from "../components/common/MultipleSelection";
import ShortQuestion from "../components/common/ShortQuestion";
import TrueFalseQuestion from "../components/common/TrueFalseQuestion";
import TryAgainBanner from "../components/common/TryAgainBanner";
import YesNoQuestion from "../components/common/YesNoQuestion";
import { useState } from "react";

const QuestionsList = () => {
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: 1,
      type: "multiple",
      question:
        "Which of the following statements about marketing and advertising are true? Select all that apply.",
      options: [
        { text: "Advertising is an important part of marketing", correct: true },
        { text: "Advertising and Marketing are different words for the same thing", correct: false },
        { text: "Advertising is where the largest portion of the money spent on marketing goes", correct: false },
        { text: "If you have a good product, people will automatically find you and buy your product", correct: true },
      ],
      userAnswers: [0, 1, 2, 3], // Mock user answers
    },
    {
      id: 2,
      type: "trueFalse",
      question:
        "Lorem ipsum dolor sit amet consectetur. In pretium a ornare amet cum cras ut aliquam.",
      options: [
        { text: "True", correct: true },
        { text: "False", correct: false },
      ],
      userAnswer: 0, // Mock user answer
    },
    {
      id: 3,
      type: "yesNo",
      question:
        "Lorem ipsum dolor sit amet consectetur. In pretium a ornare amet cum cras ut aliquam.",
      options: [
        { text: "Yes", correct: false },
        { text: "No", correct: true },
      ],
      userAnswer: 0, // Mock user answer
    },
    {
      id: 4,
      type: "short",
      question: "What is the topic of this session?",
      placeholder: "Answer maximum 80 words",
      userAnswer: "This is the user's answer.",
    },
    {
      id: 5,
      type: "long",
      question: "What is the topic of this session?",
      placeholder: "Answer maximum 200 words",
      userAnswer: "This is the user's long answer.",
    },
    {
      id: 6,
      type: "multipleSelection",
      question: "Select the following items that apply to digital marketing:",
      options: [
        { text: "Social media platforms", correct: true },
        { text: "SEO and SEM", correct: true },
        { text: "Content marketing", correct: true },
        { text: "Traditional TV ads", correct: false },
      ],
      userAnswers: [0, 1, 3], // Mock user answers
    },
  ];

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-5 my-4 bg-light-bg rounded-lg shadow-md">
      {/* Summary Section */}
      {submitted && (
        <TryAgainBanner />
      )}

      {questions.map((q) => (
        <div key={q.id} className="mb-6">
          {q.type === "multiple" && (
            <MCQ
              question={q.question}
              options={q.options}
              userAnswers={submitted ? q.userAnswers : null}
              submitted={submitted}
            />
          )}
          {q.type === "trueFalse" && (
            <TrueFalseQuestion
              question={q.question}
              options={q.options}
              userAnswer={submitted ? q.userAnswer : null}
              submitted={submitted}
            />
          )}
          {q.type === "yesNo" && (
            <YesNoQuestion
              question={q.question}
              options={q.options}
              userAnswer={submitted ? q.userAnswer : null}
              submitted={submitted}
            />
          )}
          {q.type === "short" && (
            <ShortQuestion
              question={q.question}
              placeholder={q.placeholder}
              userAnswer={submitted ? q.userAnswer : null}
              submitted={submitted}
            />
          )}
          {q.type === "long" && (
            <LongQuestion
              question={q.question}
              placeholder={q.placeholder}
              userAnswer={submitted ? q.userAnswer : null}
              submitted={submitted}
            />
          )}
          {q.type === "multipleSelection" && (
            <MultipleSelection
              question={q.question}
              options={q.options}
              userAnswers={submitted ? q.userAnswers : null}
              submitted={submitted}
            />
          )}
        </div>
      ))}

      {/* Submit Button */}
      {!submitted && (
        <div className="text-center">
          <button
            className="bg-button-blue text-white px-6 py-3 rounded-md font-medium"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionsList;
