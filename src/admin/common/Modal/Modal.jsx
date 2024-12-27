import React from "react";
import useModalStore from "../../store/useModalStore";
import { IoMdClose } from "react-icons/io";

const Modal = ({ hideCloseButton = false }) => {
  const { isOpen, title, content, closeModal } = useModalStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center z-50">
      <div className="bg-[#ECF5FF] w-[40rem] max-h-[80vh] rounded-xl shadow-lg relative flex flex-col">
        {/* Fixed Header Section */}
        <div className="p-8 pb-4">
          {/* Close Button */}
          {!hideCloseButton && (
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 text-gray-600 hover:text-gray-800 transition-colors"
              title="Close"
            >
              <IoMdClose className="text-2xl" />
            </button>
          )}

          {/* Modal Header */}
          <h2 className="text-2xl font-semibold text-[#031F42] text-center pr-8">
            {title}
          </h2>
          <div className="w-full h-[1px] bg-[#AAD0FF] mt-3"></div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 pb-8">
          <div className="space-y-6">{content}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
