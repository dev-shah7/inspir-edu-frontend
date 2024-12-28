import React from "react";
import useModalStore from "../store/useModalStore";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdList } from "react-icons/io";
import { useNavigate } from "react-router";

const CourseCongratulations = () => {
  const { closeModal } = useModalStore();
  const navigate = useNavigate();

  const handleDone = () => {
    navigate("/admin/courses");
    closeModal();
  };

  return (
    <div className="p-8 text-center">
      <div className="flex flex-col items-center space-y-6">
        <FaCheckCircle className="text-green-500 text-7xl animate-bounce" />

        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-800">
            Congratulations! 🎉
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            You have successfully created your course. <br />
            You will now be redirected to the courses list.
          </p>
        </div>

        <button
          onClick={handleDone}
          className="flex items-center space-x-2 px-8 py-3 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition-all transform hover:scale-105 shadow-lg"
        >
          <IoMdList className="text-xl" />
          <span>View All Courses</span>
        </button>
      </div>
    </div>
  );
};

export default CourseCongratulations;
