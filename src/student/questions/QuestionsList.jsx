import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useQuestionStore from "../../admin/store/useQuestionStore";
import Loader from "../../components/common/Loader/Loader";
import LongQuestion from "../components/common/LongQuestion";
import ShortQuestion from "../components/common/ShortQuestion";
import MCQ from "../components/common/MCQ";
import MultipleSelection from "../components/common/MultipleSelection";
import TrueFalseQuestion from "../components/common/TrueFalseQuestion";
import YesNoQuestion from "../components/common/YesNoQuestion";
import { QuestionType } from "../../helpers/enums";
import useAnswerStore from "../store/useAnswerStore";
import toast from "react-hot-toast";
import useModuleStore from "../../admin/store/useModuleStore";

const QuestionsList = () => {
  const [formState, setFormState] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current question index
  const { moduleId } = useParams();
  const { fetchQuestionsByModule, questions, isLoading } = useQuestionStore();
  const { saveAnswer } = useAnswerStore();
  const { submitModule, currentModule } = useModuleStore();

  useEffect(() => {
    if (moduleId) {
      fetchQuestionsByModule(moduleId);
    }
  }, [moduleId]);

  useEffect(() => {
    if (questions) {
      const initialState = {};
      questions.forEach((q) => {
        initialState[q.id] = {
          answer: "",
          optionId: null,
        };
      });
      setFormState(initialState);
    }
  }, [questions]);

  const handleSubmit = async () => {
    try {
      await submitModule(moduleId);
      toast.success("Your answers have been submitted!");
    } catch (error) {
      console.error("Error submitting the answers:", error);
      toast.error("Failed to submit your answers. Please try again.");
    }
  };


  const handleAnswerChange = async (questionId, value, optionId = null) => {
    setFormState((prev) => ({
      ...prev,
      [questionId]: {
        answer: value,
        optionId,
      },
    }));

    const data = {
      questionId,
      answer: value || "",
      optionId,
    };

    try {
      await saveAnswer(data);
    } catch (error) {
      console.error("Error saving the answer:", error);
      toast.error("Failed to save the answer, Please choose again!");
    }
  };

  const handleNext = () => {
    if (formState[questions[currentIndex].id]?.optionId || formState[questions[currentIndex].id]?.answer) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      toast.error("Please answer the question before proceeding.");
    }
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  if (isLoading) {
    return <Loader />;
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="p-6 max-w-7xl mx-5 my-4 bg-light-bg rounded-lg shadow-md">
      {currentQuestion && (
        <div>
          {currentQuestion.type === QuestionType.MCQs && (
            <MCQ
              question={currentQuestion.question}
              options={currentQuestion.questionOptions}
              userAnswer={formState[currentQuestion.id]?.optionId} // Pass single selected option
              submitted={false} // Add this if applicable
              onAnswerChange={(optionId) =>
                handleAnswerChange(currentQuestion.id, "", optionId) // Update with selected option ID
              }
            />
          )}
          {currentQuestion.type === QuestionType.TrueFalse && (
            <TrueFalseQuestion
              question={currentQuestion.question}
              options={currentQuestion.questionOptions}
              userAnswer={formState[currentQuestion.id]?.optionId}
              onAnswerChange={(optionId) =>
                handleAnswerChange(currentQuestion.id, "", optionId)
              }
            />
          )}
          {currentQuestion.type === QuestionType.YesNo && (
            <YesNoQuestion
              question={currentQuestion.question}
              options={currentQuestion.questionOptions}
              userAnswer={formState[currentQuestion.id]?.optionId}
              onAnswerChange={(optionId) =>
                handleAnswerChange(currentQuestion.id, "", optionId)
              }
            />
          )}
          {currentQuestion.type === QuestionType.Short && (
            <ShortQuestion
              question={currentQuestion.question}
              placeholder="Type your answer..."
              userAnswer={formState[currentQuestion.id]?.answer}
              onAnswerChange={(value) =>
                handleAnswerChange(currentQuestion.id, value, null)
              }
            />
          )}
          {currentQuestion.type === QuestionType.Long && (
            <LongQuestion
              question={currentQuestion.question}
              placeholder="Type your detailed answer..."
              userAnswer={formState[currentQuestion.id]?.answer}
              onAnswerChange={(value) =>
                handleAnswerChange(currentQuestion.id, value, null)
              }
            />
          )}
          {currentQuestion.type === QuestionType.MultiSelectMCQs && (
            <MultipleSelection
              question={currentQuestion.question}
              options={currentQuestion.questionOptions}
              userAnswers={formState[currentQuestion.id]?.answer}
              onAnswerChange={(optionId, isChecked) =>
                handleAnswerChange(
                  currentQuestion.id,
                  isChecked
                    ? [...(formState[currentQuestion.id]?.answer || []), optionId]
                    : formState[currentQuestion.id]?.answer.filter((id) => id !== optionId),
                  null
                )
              }
            />
          )}
        </div>
      )}

      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrevious}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
          disabled={currentIndex === 0}
        >
          Previous
        </button>
        {currentIndex === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Next
          </button>
        )}
      </div>

    </div>
  );
};

export default QuestionsList;

// const questions = [
//   {
//     id: 1,
//     type: "multiple",
//     question:
//       "Which of the following statements about marketing and advertising are true? Select all that apply.",
//     options: [
//       { text: "Advertising is an important part of marketing", correct: true },
//       { text: "Advertising and Marketing are different words for the same thing", correct: false },
//       { text: "Advertising is where the largest portion of the money spent on marketing goes", correct: false },
//       { text: "If you have a good product, people will automatically find you and buy your product", correct: true },
//     ],
//     userAnswers: [0, 1, 2, 3], // Mock user answers
//   },
//   {
//     id: 2,
//     type: "trueFalse",
//     question:
//       "Lorem ipsum dolor sit amet consectetur. In pretium a ornare amet cum cras ut aliquam.",
//     options: [
//       { text: "True", correct: true },
//       { text: "False", correct: false },
//     ],
//     userAnswer: 0, // Mock user answer
//   },
//   {
//     id: 3,
//     type: "yesNo",
//     question:
//       "Lorem ipsum dolor sit amet consectetur. In pretium a ornare amet cum cras ut aliquam.",
//     options: [
//       { text: "Yes", correct: false },
//       { text: "No", correct: true },
//     ],
//     userAnswer: 0, // Mock user answer
//   },
//   {
//     id: 4,
//     type: "short",
//     question: "What is the topic of this session?",
//     placeholder: "Answer maximum 80 words",
//     userAnswer: "This is the user's answer.",
//   },
//   {
//     id: 5,
//     type: "long",
//     question: "What is the topic of this session?",
//     placeholder: "Answer maximum 200 words",
//     userAnswer: "This is the user's long answer.",
//   },
//   {
//     id: 6,
//     type: "multipleSelection",
//     question: "Select the following items that apply to digital marketing:",
//     options: [
//       { text: "Social media platforms", correct: true },
//       { text: "SEO and SEM", correct: true },
//       { text: "Content marketing", correct: true },
//       { text: "Traditional TV ads", correct: false },
//     ],
//     userAnswers: [0, 1, 3], // Mock user answers
//   },
// ];
