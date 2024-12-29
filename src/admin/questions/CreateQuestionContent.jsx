import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import QuestionTypeDropdown from "./components/QuestionTypeDropdown";
import useModalStore from "../store/useModalStore";
import useQuestionStore from "../store/useQuestionStore";
import useModuleStore from "../store/useModuleStore";
import { questionService } from "../../services/api/questionService";
import { toast } from "react-hot-toast";
import AddMoreQuestionsContent from "./AddMoreQuestionsContent";

const CreateQuestionContent = ({ mode = "add", questionId }) => {
  const { moduleId: paramModuleId } = useParams();
  const { currentModule } = useModuleStore();
  const { closeModal, queueModal } = useModalStore();
  const {
    saveQuestion,
    fetchQuestionsByModule,
    fetchQuestionById,
    isFetchingQuestion,
  } = useQuestionStore();

  const moduleId = paramModuleId || currentModule;

  const [isLoading, setIsLoading] = useState(false);
  const [questionType, setQuestionType] = useState("");
  const [options, setOptions] = useState([{ key: Date.now(), value: "" }]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState(new Set());

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      questionText: "",
      correctAnswer: "",
    }
  });

  const questionText = watch("questionText");
  const correctAnswer = watch("correctAnswer");

  useEffect(() => {
    const loadQuestion = async () => {
      if (mode === "edit" && questionId) {
        try {
          const { data: question } = await fetchQuestionById(questionId);

          // First set the question type
          const frontendType = questionService.getFrontendQuestionType(
            question.type
          );
          setQuestionType(frontendType);
          setValue("questionText", question.question);

          if (question.type === 0 || question.type === 1) {
            // Short or Long answer
            setValue("correctAnswer", question.correctAnswer);
          } else if (question.type === 2 || question.type === 5) {
            // MCQ or Checkbox
            // Format options
            const formattedOptions = question.questionOptions.map((opt) => ({
              key: Date.now() + Math.random(),
              value: opt.option,
            }));
            setOptions(formattedOptions);

            if (question.questionOptions.some((opt) => opt.isCorrect)) {
              if (question.type === 5) {
                const selected = new Set();
                question.questionOptions.forEach((opt, idx) => {
                  if (opt.isCorrect) selected.add(idx);
                });
                setSelectedCheckboxes(selected);
              } else {
                const correctIndex = question.questionOptions.findIndex(
                  (opt) => opt.isCorrect
                );
                setValue("correctAnswer", correctIndex.toString());
              }
            }
          } else if (question.type === 3 || question.type === 4) {
            const correctOption = question.questionOptions.find(
              (opt) => opt.isCorrect
            );
            if (correctOption) {
              setValue("correctAnswer", correctOption.option.toLowerCase());
            }
          }
        } catch (error) {
          toast.error("Failed to load question");
          closeModal();
        }
      }
    };

    loadQuestion();
  }, [mode, questionId, fetchQuestionById, closeModal, setValue]);

  const onSubmit = async (formData) => {
    try {
      setIsLoading(true);

      if (!moduleId) {
        toast.error("Module ID is required");
        return;
      }

      if (!questionType) {
        toast.error("Please select a question type");
        return;
      }

      const isTextQuestion =
        questionType === "short-answer" || questionType === "long-answer";

      // Validate options for non-text questions
      if (!isTextQuestion) {
        if (questionType === "mcq" && !formData.correctAnswer) {
          toast.error("Please select a correct answer for MCQ");
          return;
        }

        if (questionType === "checkbox") {
          if (options.length < 2) {
            toast.error("Please add at least 2 options for checkbox questions");
            return;
          }
          if (selectedCheckboxes.size === 0) {
            toast.error("Please select at least one correct answer");
            return;
          }
        }

        if (questionType === "true-false" || questionType === "yes-no") {
          if (!formData.correctAnswer) {
            toast.error(
              `Please select the correct ${
                questionType === "true-false" ? "True/False" : "Yes/No"
              } option`
            );
            return;
          }
        } else if (options.some((opt) => !opt.value)) {
          toast.error("Please fill in all options");
          return;
        }
      }

      const questionData = {
        id: mode === "edit" ? parseInt(questionId) : 0,
        moduleId: parseInt(moduleId),
        question: formData.questionText,
        type: questionType,
        correctAnswer: getCorrectAnswer(),
        options: getOptions(),
      };

      await saveQuestion(questionData);

      // Refresh questions list in the background
      fetchQuestionsByModule(moduleId).catch(console.error);

      toast.success("Question saved successfully");

      if (mode === "add") {
        queueModal("Add More Questions", <AddMoreQuestionsContent />);
      }
      closeModal();
    } catch (error) {
      toast.error(error.message || "Failed to save question");
    } finally {
      setIsLoading(false);
    }
  };

  const getCorrectAnswer = () => {
    switch (questionType) {
      case "short-answer":
      case "long-answer":
        return correctAnswer;
      case "true-false":
        return correctAnswer.toLowerCase();
      case "yes-no":
        return correctAnswer.toLowerCase();
      case "mcq":
        return correctAnswer;
      case "checkbox":
        return Array.from(selectedCheckboxes).join(",");
      default:
        return "";
    }
  };

  const getOptions = () => {
    switch (questionType) {
      case "short-answer":
      case "long-answer":
        return [];
      case "true-false":
        return [
          { value: "True", isCorrect: correctAnswer === "true" },
          { value: "False", isCorrect: correctAnswer === "false" },
        ];
      case "yes-no":
        return [
          { value: "Yes", isCorrect: correctAnswer === "yes" },
          { value: "No", isCorrect: correctAnswer === "no" },
        ];
      case "mcq":
        return options.map((opt, idx) => ({
          value: opt.value,
          isCorrect: idx.toString() === correctAnswer,
        }));
      case "checkbox":
        return options.map((opt, idx) => ({
          value: opt.value,
          isCorrect: selectedCheckboxes.has(idx),
        }));
      default:
        return [];
    }
  };

  const handleOptionChange = (index, newValue) => {
    const newOptions = [...options];
    newOptions[index].value = newValue;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, { key: Date.now(), value: "" }]);
  };

  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleCheckboxChange = (index) => {
    const newSelected = new Set(selectedCheckboxes);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedCheckboxes(newSelected);
  };

  const renderOptions = (type) => {
    const options = type === "true-false" ? ["True", "False"] : ["Yes", "No"];

    return (
      <>
        <div className="grid grid-cols-12 gap-4 items-center mb-2 font-semibold text-gray-700">
          <div className="col-span-2">Option</div>
          <div className="col-span-6">Input</div>
          <div className="col-span-2 text-center">Correct</div>
          <div className="col-span-2 text-center">Action</div>
        </div>
        {options.map((value, index) => (
          <div
            key={index}
            className="grid grid-cols-12 gap-4 items-center mb-2"
          >
            <div className="col-span-2">Option {index + 1}</div>
            <div className="col-span-6">
              <input
                type="text"
                value={value}
                disabled
                className="w-full p-2 border rounded-md focus:outline-none bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div className="col-span-2 text-center">
              <input
                type="radio"
                name="correctOption"
                value={value.toLowerCase()}
                checked={correctAnswer === value.toLowerCase()}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                className="form-radio h-5 w-5 text-blue-600"
              />
            </div>
            <div className="col-span-2 text-center">
              <button
                type="button"
                disabled
                className="px-3 py-1 bg-red-300 text-white rounded-md cursor-not-allowed"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </>
    );
  };

  const renderAnswerInput = () => {
    switch (questionType) {
      case "short-answer":
        return (
          <div className="grid grid-cols-12 gap-2 items-center">
            <div className="col-span-12 font-medium">Answer</div>
            <div className="col-span-12">
              <input
                type="text"
                {...register("correctAnswer", {
                  required: "Answer is required",
                  minLength: {
                    value: 1,
                    message: "Answer must not be empty"
                  },
                  maxLength: {
                    value: 500,
                    message: "Answer must not exceed 500 characters"
                  }
                })}
                placeholder="Enter your answer"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.correctAnswer && (
                <p className="text-sm text-red-500 mt-1">{errors.correctAnswer.message}</p>
              )}
            </div>
          </div>
        );
      case "long-answer":
        return (
          <div className="grid grid-cols-12 gap-2 items-center">
            <div className="col-span-12 font-medium">Answer</div>
            <div className="col-span-12">
              <textarea
                rows="4"
                {...register("correctAnswer", {
                  required: "Answer is required",
                  minLength: {
                    value: 2,
                    message: "Answer must be at least 2 characters"
                  },
                  maxLength: {
                    value: 2000,
                    message: "Answer must not exceed 2000 characters"
                  }
                })}
                placeholder="Write a detailed answer"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              {errors.correctAnswer && (
                <p className="text-sm text-red-500 mt-1">{errors.correctAnswer.message}</p>
              )}
            </div>
          </div>
        );
      case "mcq":
      case "checkbox":
        return (
          <>
            <div className="grid grid-cols-12 gap-4 items-center mb-2 font-semibold text-gray-700">
              <div className="col-span-2">Option</div>
              <div className="col-span-6">Input</div>
              <div className="col-span-2 text-center">
                {questionType === "mcq" ? "Correct" : "Choose all that apply"}
              </div>
              <div className="col-span-2 text-center">Action</div>
            </div>
            {options.map((option, index) => (
              <div
                key={option.key}
                className="grid grid-cols-12 gap-4 items-center mb-2"
              >
                <div className="col-span-2">Option {index + 1}</div>
                <div className="col-span-6">
                  <input
                    type="text"
                    value={option.value}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder="Text"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2 text-center">
                  {questionType === "mcq" ? (
                    <input
                      type="radio"
                      name="correctOption"
                      checked={correctAnswer === index.toString()}
                      onChange={() => setCorrectAnswer(index.toString())}
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                  ) : (
                    <input
                      type="checkbox"
                      checked={selectedCheckboxes.has(index)}
                      onChange={() => handleCheckboxChange(index)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                  )}
                </div>
                <div className="col-span-2 text-center">
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-4">
              <button
                type="button"
                onClick={addOption}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Add Option
              </button>
            </div>
          </>
        );
      case "true-false":
      case "yes-no":
        return renderOptions(questionType);
      default:
        return <p className="text-gray-500">Please select a question type.</p>;
    }
  };

  const getSubmitButtonText = () => {
    if (mode === "edit") {
      return isLoading ? "Updating..." : "Update Question";
    }
    return isLoading ? "Creating..." : "Create Question";
  };

  if (isLoading || (mode === "edit" && isFetchingQuestion)) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="text-gray-600">
          {mode === "edit" ? "Loading question data..." : "Saving question..."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <QuestionTypeDropdown value={questionType} onChange={setQuestionType} />
      </div>
      <div className="mb-4">
        <label
          htmlFor="questionText"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Question
        </label>
        <input
          type="text"
          id="questionText"
          {...register("questionText", {
            required: "Question text is required",
            minLength: {
              value: 3,
              message: "Question must be at least 3 characters"
            },
            maxLength: {
              value: 1000,
              message: "Question must not exceed 1000 characters"
            }
          })}
          placeholder="What is the topic of this session?"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.questionText && (
          <p className="text-sm text-red-500 mt-1">{errors.questionText.message}</p>
        )}
      </div>
      <div className="mb-6">{renderAnswerInput()}</div>
      <div className="flex justify-center space-x-4">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          {mode === "edit" ? "Update Question" : "Create Question"}
        </button>
        <button
          type="button"
          className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateQuestionContent;
