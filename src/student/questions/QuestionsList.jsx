import React, { useEffect, useState, useRef } from "react";
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
import { CourseEnrollmentStatus } from "../../helpers/enums";
import { motion, AnimatePresence } from "framer-motion";
import CurrentModuleMedia from "../modules/CurrentModuleMedia";

const QuestionsList = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({});
  const [isWatched, setIsWatched] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current question index
  const { moduleId, courseId } = useParams();
  const { fetchQuestionsByModule, questions, isLoading } = useQuestionStore();
  const { saveAnswer, fetchAnswers, userAnswers, isFetchingAnswer } = useAnswerStore();
  const { submitModule, currentModule, getModuleStatus, moduleStatus, isFetchingModule, fetchModuleById, isFullVideoWatched } = useModuleStore();
  const { currentCourse, clearCurrentCourse } = useCourseStore();
  const [loadingAnswers, setLoadingAnswers] = useState(false);
  const questionRef = useRef(null);
  const [videoLength, setVideoLength] = useState(0);

  useEffect(() => {
    if (moduleId) {
      fetchAnswers(moduleId);
      fetchQuestionsByModule(moduleId);
      getModuleStatus(moduleId);
      fetchModuleById(moduleId);
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
      clearCurrentCourse();
      navigate(`/student/courses/${courseId}/modules`);
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

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    const currentQuestion = questions[currentIndex];
    const currentAnswer = formState[currentQuestion.id];

    if (currentCourse?.enrollmentStatus === CourseEnrollmentStatus.DeadlineCrossed ||
      (currentQuestion.type === QuestionType.MultiSelectMCQs && currentAnswer?.optionIds?.length > 0) ||
      ((currentQuestion.type === QuestionType.Short || currentQuestion.type === QuestionType.Long) && currentAnswer?.answer) ||
      currentAnswer?.optionId
    ) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    } else {
      toast.error("Please answer the question before proceeding.");
    }
  };

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const currentQuestion = questions[currentIndex];

  const scrollToQuestion = () => {
    questionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Add this new function to check if all questions are answered
  const areAllQuestionsAnswered = () => {
    if (!questions || !formState) return false;
    
    return questions.every(question => {
      const answer = formState[question.id];
      if (!answer) return false;

      switch (question.type) {
        case QuestionType.MultiSelectMCQs:
          return answer.optionIds?.length > 0;
        case QuestionType.Short:
        case QuestionType.Long:
          return !!answer.answer?.trim();
        default:
          return !!answer.optionId;
      }
    });
  };

  const isVideoSufficientlyWatched = () => {
    if (currentModule?.data?.type !== 1) return true; // If not video, return true
    
    // Check if either the video is watched or if it was previously fully watched
    return isWatched || isFullVideoWatched;
  };


  const handleVideoEnd = () => {
    if (questionRef.current) {
      questionRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const renderContent = () => {
    if (!isVideoSufficientlyWatched()) {
      return (
        <div className="p-6 max-w-[95%] mx-5 mt-4 mb-32 bg-light-bg rounded-lg shadow-md text-center">
          <p className="text-xl text-red-600">Please watch the video before attempting the questions.</p>
        </div>
      );
    }

    return (
      <div ref={questionRef} className='p-6 max-w-[95%] mx-5 my-4 bg-light-bg rounded-lg shadow-md overflow-hidden'>
        {!areAllQuestionsAnswered() && (
          <p className="text-red-500 text-sm mb-4">*Answer All Questions to enable submission</p>
        )}
        <AnimatePresence initial={false} custom={direction} mode='wait'>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "tween", duration: 0.2 },
              opacity: { duration: 0.1 }
            }}
          >
            {currentQuestion && (
              <div>
                {currentQuestion.type === QuestionType.MCQs && (
                  <MCQ
                    courseStatus={currentCourse?.enrollmentStatus}
                    question={currentQuestion?.question}
                    options={currentQuestion?.questionOptions}
                    userAnswer={formState[currentQuestion.id]?.optionId} // Pass single selected option
                    submitted={moduleStatus == 2 || moduleStatus == 3}
                    onAnswerChange={(optionId) =>
                      handleAnswerChange(currentQuestion.id, "", optionId) // Update with selected option ID
                    }
                  />
                )}
                {currentQuestion.type === QuestionType.TrueFalse && (
                  <TrueFalseQuestion
                    courseStatus={currentCourse?.enrollmentStatus}
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
                    courseStatus={currentCourse?.enrollmentStatus}
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
                    courseStatus={currentCourse?.enrollmentStatus}
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
                    courseStatus={currentCourse?.enrollmentStatus}
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
                    courseStatus={currentCourse?.enrollmentStatus}
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
          </motion.div>
        </AnimatePresence>

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
            (moduleStatus == 0 || moduleStatus == 1) &&
            currentCourse?.enrollmentStatus !== CourseEnrollmentStatus.DeadlineCrossed ? (
              <button
                onClick={handleSubmit}
                disabled={!areAllQuestionsAnswered()}
                className={`text-white text-xl px-4 py-2 rounded-md ${
                  areAllQuestionsAnswered() ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {areAllQuestionsAnswered() ? 'Submit' : 'Answer All Questions to Submit'}
              </button>
            ) : (
              <button
                disabled={true}
                className="bg-gray-800 text-white text-xl px-4 py-2 rounded-md"
              >
                {currentCourse?.enrollmentStatus === CourseEnrollmentStatus.DeadlineCrossed
                  ? "Deadline Crossed"
                  : "Submitted"}
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
    );
  };

  if (isLoading || isFetchingModule || isFetchingAnswer || loadingAnswers) {
    return <Loader />;
  };

  return (
    <>
      <div>
        <button
          onClick={() => {
            clearCurrentCourse();
            navigate(`/student/courses/${courseId}/modules`)
          }}
          className="bg-gray-800 text-white text-xl px-4 py-2 rounded-md m-5"
        >
          Back to Modules List
        </button>
        <div className='mb-8'>
          <CurrentModuleMedia 
            isWatched={isWatched} 
            setIsWatched={setIsWatched}
            onDuration={setVideoLength}
            onVideoEnd={handleVideoEnd}
          />
        </div>
        {isVideoSufficientlyWatched() && (
          <QuestionCounter
            currentIndex={currentIndex}
            totalQuestions={questions.length}
          />
        )}
      </div>
      {renderContent()}
      {/* <>  
      {isVideoSufficientlyWatched() && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
          <button
            onClick={scrollToQuestion}
            className="bg-yellow-200 p-4 rounded-lg shadow-lg hover:bg-yellow-300 transition-colors"
          >
            <div className="text-md font-medium flex items-center gap-2">
              Question {currentIndex + 1} of {questions.length}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
                />
              </svg>
            </div>
            <div className="text-sm truncate max-w-[150px]">
              {currentQuestion?.question}
            </div>
          </button>
        </div>
      )}
      </> */}

    </>
  );
};

export default QuestionsList;
