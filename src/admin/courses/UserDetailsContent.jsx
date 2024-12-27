import React from "react";
import useModalStore from "../store/useModalStore";
import { IoMdArrowBack } from "react-icons/io";

const UserDetailsContent = ({ user }) => {
  const { closeModal } = useModalStore();

  // Hardcoded additional details for demo
  const additionalDetails = {
    enrollmentStatus: "Active",
    enrollmentDate: "2024-03-01",
    lastActive: "2024-03-20",
    completionProgress: 75,
    grades: [
      { module: "Introduction", grade: 90 },
      { module: "Basic Concepts", grade: 85 },
      { module: "Advanced Topics", grade: 78 },
    ],
    assignments: {
      completed: 8,
      pending: 2,
      total: 10,
    },
  };

  return (
    <div className="max-w-2xl">
      <button
        onClick={closeModal}
        className="absolute left-4 top-4 text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-2"
        title="Back to Users List"
      >
        <IoMdArrowBack className="text-xl" />
        <span>Back</span>
      </button>

      <div className="space-y-6">
        {/* User Header */}
        <div className="border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>

        {/* Status and Progress */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">
              Enrollment Status
            </h3>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              {additionalDetails.enrollmentStatus}
            </span>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">
              Course Progress
            </h3>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-blue-600">
                    {additionalDetails.completionProgress}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-100">
                <div
                  style={{ width: `${additionalDetails.completionProgress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">
              Enrollment Date
            </h3>
            <p className="text-gray-600">
              {new Date(additionalDetails.enrollmentDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Last Active</h3>
            <p className="text-gray-600">
              {new Date(additionalDetails.lastActive).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Grades */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-3">Module Grades</h3>
          <div className="bg-white rounded-lg border">
            {additionalDetails.grades.map((grade, index) => (
              <div
                key={index}
                className={`flex justify-between items-center p-3 ${
                  index !== additionalDetails.grades.length - 1
                    ? "border-b"
                    : ""
                }`}
              >
                <span className="text-gray-700">{grade.module}</span>
                <span
                  className={`font-semibold ${
                    grade.grade >= 80
                      ? "text-green-600"
                      : grade.grade >= 70
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {grade.grade}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Assignments Status */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-3">Assignments</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">
                {additionalDetails.assignments.completed}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {additionalDetails.assignments.pending}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">
                {additionalDetails.assignments.total}
              </div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsContent;
