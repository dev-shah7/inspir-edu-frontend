import React from "react";
import useModalStore from "../../store/useModalStore";

const Modal = () => {
  const { isOpen, title, content } = useModalStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center z-50">
      <div className="bg-[#ECF5FF] w-[40rem] max-h-[80vh] overflow-y-auto p-8 rounded-xl shadow-lg">
        {/* Modal Header */}
        <div className="sticky top-0 bg-[#ECF5FF] z-10 pb-4">
          <h2 className="text-2xl font-semibold text-[#031F42] text-center">
            {title}
          </h2>
          <div className="w-full h-[1px] bg-[#AAD0FF] mt-3"></div>
        </div>

        {/* Scrollable Content */}
        <div className="space-y-6 max-h-[80vh]">{content}</div>
      </div>
    </div>
  );
};

export default Modal;
