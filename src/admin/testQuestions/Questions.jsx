import { useNavigate, useParams } from "react-router";
import { useState, useMemo, useEffect } from "react";
import CustomButton from "../../components/common/CustomButton/CustomButton";
import useModalStore from "../store/useModalStore";
import Table from "../common/Table/Table";
import CreateQuestionContent from "./CreateQuestionContent";
import useQuestionStore from "../store/useQuestionStore";
import Loader from "../../components/common/Loader/Loader";
import { toast } from "react-hot-toast";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineEye } from "react-icons/ai";
import QuestionCard from "../../components/QuestionCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Questions = () => {
  const { moduleId } = useParams();
  const { openModal } = useModalStore();
  const navigate = useNavigate();
  const { questions, fetchQuestionsByModule, deleteQuestion, isLoading } =
    useQuestionStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [isOperationLoading, setIsOperationLoading] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setIsInitialLoad(true);
        await fetchQuestionsByModule(moduleId);
      } catch (error) {
        toast.error("Failed to load questions");
      } finally {
        setIsInitialLoad(false);
      }
    };

    if (moduleId) {
      loadQuestions();
    }
  }, [moduleId, fetchQuestionsByModule]);

  const filteredQuestions = useMemo(() => {
    return questions.filter((question) =>
      question?.question?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, questions]);

  const handleCreateQuestion = () => {
    openModal("Add Question", <CreateQuestionContent />);
  };

  const handleEditQuestion = (questionId) => {
    openModal(
      "Edit Question",
      <CreateQuestionContent mode="edit" questionId={questionId} />
    );
  };

  const handleDeleteQuestion = async (questionId) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        setIsOperationLoading(true);
        await deleteQuestion(questionId);
        toast.success("Question deleted successfully");

        // Refresh the list in the background
        fetchQuestionsByModule(moduleId).catch(console.error);
      } catch (error) {
        toast.error("Failed to delete question");
      } finally {
        setIsOperationLoading(false);
      }
    }
  };

  const handlePreviewClick = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const headers = [
    { label: "Type", align: "left" },
    { label: "Question", align: "left" },
    { label: "Action", align: "center" },
  ];

  const getQuestionTypeName = (type) => {
    switch (type) {
      case 0:
        return "Short Answer";
      case 1:
        return "Long Answer";
      case 2:
        return "Multiple Choice";
      case 3:
        return "True/False";
      case 4:
        return "Yes/No";
      case 5:
        return "Checkbox";
      default:
        return "Unknown";
    }
  };

  const renderRow = (question) => (
    <>
      <tr className="hover:bg-gray-50 transition">
        <td className="py-3 px-4">{getQuestionTypeName(question.type)}</td>
        <td className="py-3 px-4">{question.question}</td>
        <td className="py-3 px-4 text-center">
          <div className="flex gap-2 justify-center">
            <CustomButton
              text="Edit"
              className="w-auto bg-black hover:bg-gray-600"
              onClick={() => handleEditQuestion(question.id)}
            />
            <CustomButton
              text="Delete"
              className="w-auto bg-red-600 hover:bg-red-500"
              onClick={() => handleDeleteQuestion(question.id)}
            />
          </div>
        </td>
      </tr>
      {filteredQuestions.indexOf(question) !== filteredQuestions.length - 1 && (
        <tr>
          <td colSpan={headers.length}>
            <div className="h-0.5 bg-custom-border-blue"></div>
          </td>
        </tr>
      )}
    </>
  );

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
        className="px-6 py-2 mt-6 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring focus:ring-blue-300 transition flex items-center gap-2"
      >
        <IoMdAdd className="text-sm" />
        Create Question
      </button>
    </div>
  );

  const renderHeader = () => (
    <div className="flex flex-col mb-6">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-1">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              All Questions
            </h1>
            <div className="flex flex-col lg:flex-row gap-2">
              <button
                onClick={handleCreateQuestion}
                className="w-full lg:w-auto px-4 py-2 bg-custom-button-green hover:bg-green-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring focus:ring-green-700 transition flex items-center justify-center gap-2"
              >
                <IoMdAdd className="text-md" />
                Create Question
              </button>
              <button
                onClick={handlePreviewClick}
                className={`w-full lg:w-auto px-4 py-2 ${
                  isPreviewMode
                    ? "bg-gray-600"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring focus:ring-blue-300 transition flex items-center justify-center gap-2`}
              >
                <AiOutlineEye className="text-md" />
                {isPreviewMode ? "Exit Preview" : "Question Preview"}
              </button>
            </div>
          </div>
          <p className="text-md text-gray-600">Module Name</p>
        </div>
        <div className="relative w-full lg:w-64 lg:mt-8">
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition"
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
      </div>
      <div className="h-0.5 bg-custom-border-blue mt-1"></div>
    </div>
  );

  const renderPreviewMode = () => (
    <div className="grid grid-cols-1 gap-6 mb-6">
      <QuestionCard
        questions={filteredQuestions}
        onClose={handlePreviewClick}
      />
    </div>
  );

  if (isLoading || isInitialLoad) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-120px)] px-4 md:px-6">
      <p className="text-md text-gray-600 mb-4">
        Courses / Modules / Questions
      </p>
      {renderHeader()}

      <div className="flex-1 overflow-x-auto">
        {isPreviewMode ? (
          renderPreviewMode()
        ) : filteredQuestions.length > 0 ? (
          <div className="min-w-full">
            <Table
              headers={headers}
              data={filteredQuestions}
              renderRow={renderRow}
            />
          </div>
        ) : (
          renderEmptyState()
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center py-4 border-t-2 border-custom-border-blue mt-4 gap-4">
        <div className="text-sm md:text-base text-gray-600">
          Rows per page: 10
        </div>
        <div className="flex items-center gap-4">
          <button
            disabled
            className="text-sm md:text-base text-blue-500 font-medium text-gray-400 cursor-not-allowed"
          >
            <IoIosArrowBack size={20} />
          </button>
          <span className="text-sm md:text-base text-gray-600 font-medium">
            1-1
          </span>
          <button className="text-sm md:text-base text-blue-500 font-medium hover:text-blue-700">
            <IoIosArrowForward size={20} />
          </button>
        </div>
      </div>

      {isOperationLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  );
};

export default Questions;
