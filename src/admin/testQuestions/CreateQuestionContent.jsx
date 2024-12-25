import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
  const { saveQuestion, fetchQuestionsByModule, fetchQuestionById } =
    useQuestionStore();

  const moduleId = paramModuleId || currentModule;

  const [questionType, setQuestionType] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [options, setOptions] = useState([{ key: Date.now(), value: "" }]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState(new Set());

  useEffect(() => {
    const loadQuestion = async () => {
      if (mode === "edit" && questionId) {
        try {
          const question = await fetchQuestionById(questionId);

          // Set question type
          setQuestionType(
            questionService.getFrontendQuestionType(question.type)
          );

          // Set question text
          setQuestionText(question.question);

          // Handle different question types
          if (question.type === 0 || question.type === 1) {
            // Short or Long answer
            setCorrectAnswer(question.correctAnswer);
          } else if (question.type === 2) {
            // MCQ or Checkbox
            // Format options
            const formattedOptions = question.questionOptions.map((opt) => ({
              key: Date.now() + Math.random(),
              value: opt.option,
            }));
            setOptions(formattedOptions);

            // Set correct answers
            if (question.questionOptions.some((opt) => opt.isCorrect)) {
              if (questionType === "checkbox") {
                const selected = new Set();
                question.questionOptions.forEach((opt, idx) => {
                  if (opt.isCorrect) selected.add(idx);
                });
                setSelectedCheckboxes(selected);
              } else {
                const correctIndex = question.questionOptions.findIndex(
                  (opt) => opt.isCorrect
                );
                setCorrectAnswer(correctIndex.toString());
              }
            }
          } else if (question.type === 3 || question.type === 4) {
            // True/False or Yes/No
            const correctOption = question.questionOptions.find(
              (opt) => opt.isCorrect
            );
            if (correctOption) {
              setCorrectAnswer(correctOption.option.toLowerCase());
            }
          }
        } catch (error) {
          toast.error("Failed to load question");
          closeModal();
        }
      }
    };

    loadQuestion();
  }, [mode, questionId, fetchQuestionById, closeModal]);

  const handleSubmit = async () => {
    try {
      if (!moduleId) {
        toast.error("Module ID is required");
        return;
      }

      if (!questionText) {
        toast.error("Please enter a question");
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
        if (questionType === "mcq" && !correctAnswer) {
          toast.error("Please select a correct answer for MCQ");
          return;
        }

        if (questionType === "true-false" || questionType === "yes-no") {
          if (!correctAnswer) {
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
        question: questionText,
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
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                placeholder="Enter your answer"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                placeholder="Write a detailed answer"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
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
              <div className="col-span-2 text-center">Correct</div>
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

  return (
    <>
      <div className="mb-4">
        <QuestionTypeDropdown value={questionType} onChange={setQuestionType} />
      </div>
      <div className="mb-4">
        <label
          htmlFor="question"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Question
        </label>
        <input
          type="text"
          id="question"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="What is the topic of this session?"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-6">{renderAnswerInput()}</div>
      <div className="flex justify-center space-x-4">
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          onClick={handleSubmit}
        >
          Create Question
        </button>
        <button
          className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default CreateQuestionContent;
