import React from "react";
import useModalStore from "../../store/useModalStore";
import { IoMdClose } from "react-icons/io";

const Modal = () => {
  const { isOpen, title, content, closeModal, hideCloseButton } =
    useModalStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center z-50">
      <div className="bg-[#ECF5FF] min-w-[40rem] max-w-[60rem] max-h-[80vh] rounded-xl shadow-lg relative flex flex-col">
        <div className="p-8 pb-4 ">
          {!hideCloseButton && (
            <button
              onClick={closeModal}
              className="absolute right-6 top-6 text-gray-600 hover:text-gray-800 transition-colors"
              title="Close"
            >
              <IoMdClose className="text-2xl" />
            </button>
          )}

          <h2 className="text-2xl font-semibold text-[#031F42] text-center pr-8">
            {title}
          </h2>
          <div className="w-full h-[1px] bg-[#AAD0FF] mt-3"></div>
        </div>

        <div className="flex-1 overflow-y-auto px-8 pb-8">
          <div className="space-y-6">{content}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
