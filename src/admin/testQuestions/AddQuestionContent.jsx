import useModalStore from "../store/useModalStore";
import CreateQuestionContent from "./CreateQuestionContent";

const AddQuestionContent = () => {
  const { closeModal, queueModal } = useModalStore();

  const handleSave = () => {
    queueModal("Create Question", <CreateQuestionContent />);
    closeModal();
  };
  return (
    <>
      <h2 className="text-md text-center font-light text-[#0F172A]">
        Do you want to help AI or you want to add questions to this module?
      </h2>
      <div className="flex justify-center space-x-6 mb-6">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="questionType"
            value="ai"
            className="w-4 h-4 text-blue-500 focus:ring-blue-400 focus:ring-opacity-50"
          />
          <span className="text-gray-700">Yes (AI)</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="questionType"
            value="own"
            className="w-4 h-4 text-blue-500 focus:ring-blue-400 focus:ring-opacity-50"
          />
          <span className="text-gray-700">No (Own)</span>
        </label>
      </div>
      <div className="flex justify-center space-x-4">
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          onClick={handleSave}
        >
          Create Questions
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

export default AddQuestionContent;
