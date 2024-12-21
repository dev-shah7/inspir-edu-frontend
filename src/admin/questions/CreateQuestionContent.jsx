import { useState } from "react";
import QuestionTypeDropdown from "./components/QuestionTypeDropdown";
import useModalStore from "../store/useModalStore";
import AddMoreQuestionsContent from "./AddMoreQuestionsContent";

const CreateQuestionContent = () => {
  const { closeModal, queueModal } = useModalStore();
  const [questionType, setQuestionType] = useState("");
  const [options, setOptions] = useState([{ key: Date.now(), value: "" }]);

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

  const handleCreateQuestions = () => {
    queueModal("Add More Questions", <AddMoreQuestionsContent />);
    closeModal();
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
                  {questionType === "mcq" && (
                    <input
                      type="radio"
                      name="correctOption"
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                  )}
                  {questionType === "checkbox" && (
                    <input
                      type="checkbox"
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
          placeholder="What is the topic of this session?"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-6">{renderAnswerInput()}</div>
      <div className="flex justify-center space-x-4">
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          onClick={handleCreateQuestions}
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
