import React from "react";
import useModalStore from "../store/useModalStore";
import CreateModuleContent from "../modules/CreateModuleContent";

const ProceedToNextStepContent = () => {
  const { closeModal, queueModal } = useModalStore();

  const onProceedNext = () => {
    queueModal("Add Module", <CreateModuleContent />);
    closeModal();
  };

  return (
    <div className="my-6">
      <div className="text-center space-y-6">
        <p className="text-lg text-[#031F42]">
          Proceed to add modules to this course?
        </p>

        <div className="w-full h-[1px] bg-gray-300"></div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={onProceedNext}
            className="px-6 py-2 bg-[#1A73E8] text-white font-medium rounded-md hover:bg-[#1E40AF] transition"
          >
            Proceed
          </button>
          <button
            onClick={closeModal}
            className="px-6 py-2 bg-[#338F37] text-white font-medium rounded-md hover:bg-[#16A34A] transition"
          >
            Do Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProceedToNextStepContent;
