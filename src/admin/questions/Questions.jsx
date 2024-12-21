import { useState, useMemo } from "react";
import { useParams } from "react-router";
import Table from "../common/Table/Table";
import { dummyQuestions } from "../../static/data";
import CustomButton from "../../components/common/CustomButton/CustomButton";
import useModalStore from "../store/useModalStore";
import CreateQuestionContent from "./CreateQuestionContent";

const Questions = () => {
  const { moduleId } = useParams();
  const { queueModal, closeModal } = useModalStore();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredQuestions = useMemo(() => {
    return dummyQuestions.filter((question) =>
      question.question.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleCreateQuestion = () => {
    queueModal("Create Question", <CreateQuestionContent />);
    closeModal();
  };

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        No Questions Found
      </h3>
      <p className="text-gray-500 text-center max-w-md">
        We haven&apos;t found any questions for this module. Get started by
        creating your first question.
      </p>
      <button
        onClick={handleCreateQuestion}
        className="px-6 py-2 mt-6 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring focus:ring-blue-300 transition"
      >
        Create Question
      </button>
    </div>
  );

  const headers = [
    { label: "Question", align: "left" },
    { label: "Answer", align: "left" },
    { label: "Question Type", align: "center" },
    { label: "Action", align: "center" },
  ];

  const renderRow = (question) => (
    <>
      <tr className="hover:bg-gray-50 transition">
        <td className="p-4">{question.question}</td>
        <td className="p-4">{question.answer}</td>
        <td className="p-4 text-center">{question.type}</td>
        <td className="p-4 text-center">
          <div className="flex gap-2 justify-center">
            <CustomButton
              text="Edit"
              className="w-auto bg-blue-900 hover:bg-gray-600"
              onClick={() => alert("Edit Clicked!")}
            />
            <CustomButton
              text="Delete"
              className="w-auto bg-red-600 hover:bg-red-500"
              onClick={() => alert("Delete Clicked!")}
            />
          </div>
        </td>
      </tr>
      <tr>
        <td colSpan={headers.length}>
          <div className="h-0.5 bg-gradient-to-r from-custom-border-blue to-transparent"></div>
        </td>
      </tr>
    </>
  );

  return (
    <>
      <p className="text-md text-gray-600 mb-8">
        Courses / Modules / Questions
      </p>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">
          All Questions for Module ID&nbsp;:&nbsp; {moduleId}
        </h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition"
            />
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <CustomButton
            text="Create Question"
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:ring focus:ring-blue-300 transition"
            onClick={handleCreateQuestion}
          />
        </div>
      </div>
      <div className="mt-4 h-0.5 bg-gradient-to-r from-custom-div-blue to-transparent"></div>

      {filteredQuestions.length > 0 ? (
        <Table
          headers={headers}
          data={filteredQuestions}
          renderRow={renderRow}
        />
      ) : (
        renderEmptyState()
      )}
    </>
  );
};

export default Questions;
