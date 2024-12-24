import useModalStore from "../store/useModalStore";
import CreateQuestionContent from "./CreateQuestionContent";
import AddMoreModulesContent from "../testModule/AddMoreModulesContent";

const AddMoreQuestionsContent = () => {
  const { closeModal, queueModal } = useModalStore();

  const handleSave = () => {
    queueModal("Create Question", <CreateQuestionContent />);
    closeModal();
  };

  const handleClose = () => {
    queueModal("Add More Modules", <AddMoreModulesContent />);
    closeModal();
  };

  return (
    <div className="p-6">
      <p className="text-center text-lg text-gray-600 mb-6">
        Do you want to add more questions to this module?
      </p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={handleSave}
          className="px-8 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300 transition"
        >
          Yes
        </button>
        <button
          onClick={handleClose}
          className="px-8 py-2 bg-gray-300 text-gray-800 font-medium rounded-md hover:bg-gray-400 focus:ring focus:ring-gray-200 transition"
        >
          No
        </button>
      </div>
    </div>
  );
};

export default AddMoreQuestionsContent;