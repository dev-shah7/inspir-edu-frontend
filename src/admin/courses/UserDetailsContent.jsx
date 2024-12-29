import React, { useState, useEffect } from "react";
import useModalStore from "../store/useModalStore";
import { IoMdArrowBack } from "react-icons/io";
import { courseService } from "../../services/api/courseService";
import { toast } from "react-hot-toast";
import Loader from "../../components/common/Loader/Loader";

const UserDetailsContent = ({ user, courseId, userId }) => {
  const { closeModal } = useModalStore();
  const [enrollmentData, setEnrollmentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollmentDetails = async () => {
      if (!userId || !courseId) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await courseService.getEnrolledDetail(
          courseId,
          userId
        );
        if (response.isSuccess) {
          setEnrollmentData(response.data);
        } else {
          toast.error(response.message || "Failed to fetch enrollment details");
        }
      } catch (error) {
        console.error("Error fetching enrollment details:", error);
        toast.error("Failed to fetch enrollment details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnrollmentDetails();
  }, [courseId, userId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">User not registered yet</p>
        <p className="text-gray-400 text-sm mt-2">
          No enrollment details available
        </p>
      </div>
    );
  }

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

        {enrollmentData && (
          <>
            {/* Status and Progress */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">
                  Enrollment Status
                </h3>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {enrollmentData.enrollmentStatus === 1
                    ? "Active"
                    : "Inactive"}
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
                        {enrollmentData.analytics.totalModules === 0
                          ? "0"
                          : Math.round(
                              (enrollmentData.analytics.totalCompleted /
                                enrollmentData.analytics.totalModules) *
                                100
                            )}
                        %
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-100">
                    <div
                      style={{
                        width: `${
                          (enrollmentData.analytics.totalCompleted /
                            enrollmentData.analytics.totalModules) *
                          100
                        }%`,
                      }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">
                  Course Name
                </h3>
                <p className="text-gray-600">{enrollmentData.courseName}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Company</h3>
                <p className="text-gray-600">{enrollmentData.companyName}</p>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">
                  Enrollment Date
                </h3>
                <p className="text-gray-600">
                  {enrollmentData.enrollmentDate
                    ? new Date(
                        enrollmentData.enrollmentDate
                      ).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Deadline</h3>
                <p className="text-gray-600">
                  {enrollmentData.deadLineDate
                    ? new Date(enrollmentData.deadLineDate).toLocaleDateString()
                    : "No deadline set"}
                </p>
              </div>
            </div>

            {/* Module Progress */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">
                Module Progress
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {enrollmentData.analytics.totalCompleted}
                  </div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {enrollmentData.analytics.totalInProgress}
                  </div>
                  <div className="text-sm text-gray-600">In Progress</div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {enrollmentData.analytics.totalModules}
                  </div>
                  <div className="text-sm text-gray-600">Total Modules</div>
                </div>
              </div>
            </div>

            {/* Modules List */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Modules</h3>
              <div className="bg-white rounded-lg border">
                {enrollmentData.userModules.map((module, index) => (
                  <div
                    key={`${module.moduleId}-${index}`}
                    className={`flex justify-between items-center p-3 ${
                      index !== enrollmentData.userModules.length - 1
                        ? "border-b"
                        : ""
                    }`}
                  >
                    <span className="text-gray-700">{module.moduleName}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        module.status === 2
                          ? "bg-green-100 text-green-800"
                          : module.status === 1
                          ? "bg-yellow-100 text-yellow-800"
                          : module.status === 3
                          ? "bg-orange-100 text-orange-800"
                          : module.status === 4
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {module.status === 2
                        ? "Completed"
                        : module.status === 1
                        ? "Started"
                        : module.status === 3
                        ? "Pending"
                        : module.status === 4
                        ? "Finished"
                        : "Not Started"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserDetailsContent;
