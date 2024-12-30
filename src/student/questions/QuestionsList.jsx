import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
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
import QuestionCounter from "../components/Question/QuestionCounter";
import useCourseStore from "../store/useCourseStore";

const QuestionsList = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current question index
  const { moduleId } = useParams();
  const { fetchQuestionsByModule, questions, isLoading } = useQuestionStore();
  const { saveAnswer, fetchAnswers, userAnswers, isFetchingAnswer } = useAnswerStore();
  const { submitModule, currentModule, getModuleStatus, moduleStatus, isFetchingModule } = useModuleStore();
  const { currentCourse } = useCourseStore();
  const [loadingAnswers, setLoadingAnswers] = useState(false);

  useEffect(() => {
    if (moduleId) {
      fetchAnswers(moduleId);
      fetchQuestionsByModule(moduleId);
      getModuleStatus(moduleId);
    }
  }, [moduleId]);

  useEffect(() => {
    if (questions && userAnswers) {
      setLoadingAnswers(true);
      const initialState = {};
      questions.forEach((q) => {
        const userAnswer = userAnswers.find((ua) => ua.questionId === q.id);

        if (userAnswer) {
          // Populate based on question type
          initialState[q.id] = {
            answer: userAnswer.answer || "",
            optionId: userAnswer.optionId || null,
            optionIds: userAnswer.optionIds || [],
          };
        } else {
          // Default state if no userAnswer exists
          initialState[q.id] = {
            answer: "",
            optionId: null,
            optionIds: [],
          };
        }
      });
      setFormState(initialState);
    }
    setLoadingAnswers(false);
  }, [questions, userAnswers]);

  const handleSubmit = async () => {
    try {
      await submitModule(moduleId);
      toast.success("Your answers have been submitted!");
      navigate(`/student/courses/${currentCourse?.courseId}/modules`);
    } catch (error) {
      console.error("Error submitting the answers:", error);
      toast.error("Failed to submit your answers. Please try again.");
    }
  };

  const handleAnswerChange = async (questionId, value, optionId = null, optionIds = null) => {
    const question = questions.find((q) => q.id === questionId);

    let data = {
      questionId,
      answer: "",
      optionId: null,
      optionIds: null,
    };

    if (question.type === QuestionType.MultiSelectMCQs) {
      // Handle multi-select case
      data.optionIds = optionIds || [];
    } else if (question.type === QuestionType.Short || question.type === QuestionType.Long) {
      // Short/Long answer case
      data.answer = value || "";
      data.optionIds = null;
      data.optionId = null;
    } else {
      // Single-select case
      data.optionId = optionId;
      data.optionIds = null;
      data.answer = "";
    }

    // Update formState
    setFormState((prev) => ({
      ...prev,
      [questionId]: {
        answer: data.answer,
        optionId: data.optionId,
        optionIds: data.optionIds,
      },
    }));

    try {
      await saveAnswer(data);
    } catch (error) {
      console.error("Error saving the answer:", error);
      toast.error("Failed to save the answer, Please choose again!");
    }
  };

  const handleNext = () => {
    const currentQuestion = questions[currentIndex];
    const currentAnswer = formState[currentQuestion.id];

    if (
      (currentQuestion.type === QuestionType.MultiSelectMCQs && currentAnswer?.optionIds?.length > 0) || // Multi-select: Ensure optionIds has selections
      (currentQuestion.type === QuestionType.Short || currentQuestion.type === QuestionType.Long) && currentAnswer?.answer || // Short/Long: Ensure answer exists
      currentAnswer?.optionId // Single-select: Ensure optionId exists
    ) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      toast.error("Please answer the question before proceeding.");
    }
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const currentQuestion = questions[currentIndex];

  if (isLoading || isFetchingModule || isFetchingAnswer || loadingAnswers) {
    return <Loader />;
  };

  return (
    <>
      <QuestionCounter currentIndex={currentIndex}
        totalQuestions={questions.length} />
      <div className="p-6 max-w-7xl mx-5 my-4 bg-light-bg rounded-lg shadow-md">
        {currentQuestion && (
          <div>
            {currentQuestion.type === QuestionType.MCQs && (
              <MCQ
                question={currentQuestion.question}
                options={currentQuestion.questionOptions}
                userAnswer={formState[currentQuestion.id]?.optionId} // Pass single selected option
                submitted={moduleStatus == 2 || moduleStatus == 3}
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
                submitted={moduleStatus == 2 || moduleStatus == 3}
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
                submitted={moduleStatus == 2 || moduleStatus == 3}
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
                submitted={moduleStatus == 2 || moduleStatus == 3}
                correctAnswer={currentQuestion.correctAnswer}
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
                submitted={moduleStatus == 2 || moduleStatus == 3}
                correctAnswer={currentQuestion.correctAnswer}
                onAnswerChange={(value) =>
                  handleAnswerChange(currentQuestion.id, value, null)
                }
              />
            )}
            {currentQuestion.type === QuestionType.MultiSelectMCQs && (
              <MultipleSelection
                question={currentQuestion.question}
                options={currentQuestion.questionOptions}
                userAnswers={formState[currentQuestion.id]?.optionIds || []} // Pass selected option IDs
                submitted={moduleStatus == 2 || moduleStatus == 3}
                onAnswerChange={(optionId, isChecked) =>
                  handleAnswerChange(
                    currentQuestion.id,
                    null,
                    null,
                    isChecked
                      ? [...(formState[currentQuestion.id]?.optionIds || []), optionId]
                      : formState[currentQuestion.id]?.optionIds.filter((id) => id !== optionId)
                  )
                }
              />
            )}
          </div>
        )}

        <div className="flex justify-between mt-6">
          {currentIndex > 0 && ( // Hide Previous button if it's the first question
            <button
              onClick={handlePrevious}
              className="bg-green-800 text-white text-xl px-4 py-2 rounded-md"
            >
              Previous
            </button>
          )}
          {currentIndex === questions.length - 1 ? (
            moduleStatus == 0 || moduleStatus == 1 ? (
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white text-xl px-4 py-2 rounded-md"
              >
                Submit
              </button>
            )
              : (
                <button
                  disabled={true}
                  className="bg-gray-800 text-white text-xl px-4 py-2 rounded-md"
                >
                  Submitted
                </button>
              )
          ) : (
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white text-xl px-4 py-2 rounded-md"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default QuestionsList;
