import React from "react";
import useModalStore from "../store/useModalStore";

const CourseCongratulations = () => {
  const { closeModal } = useModalStore();

  const handleDone = () => {
    closeModal();
  };

  return (
    <div className="p-5 text-center">
      <p className="text-gray-600 mb-6">
        You have finished creating this course. <br />
        You will now be taken to the courses list.
      </p>
      <button
        onClick={handleDone}
        className="px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:ring focus:ring-green-300 transition"
      >
        Done
      </button>
    </div>
  );
};

export default CourseCongratulations;
