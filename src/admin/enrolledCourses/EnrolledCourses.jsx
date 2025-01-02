import { useState, useEffect } from "react";
import Select from "react-select";
import { IoCheckmarkCircle, IoTimeOutline } from "react-icons/io5";
import { MdPending } from "react-icons/md";
import { userService } from "../../services/api/userService";
import { courseService } from "../../services/api/courseService";
import { toast } from "react-hot-toast";
import Loader from "../../components/common/Loader/Loader";

const ModuleStatusBadge = ({ status }) => {
  const getBadgeStyle = () => {
    switch (status) {
      case 2: // Completed
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case 1: // Started
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case 3: // Pending
        return "bg-amber-50 text-amber-800 border-amber-200";
      case 4: // Finished
        return "bg-blue-100 text-blue-800 border-blue-200";
      default: // Not Started
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getIcon = () => {
    switch (status) {
      case 2: // Completed
        return <IoCheckmarkCircle className="w-4 h-4" />;
      case 1: // Started
        return <IoTimeOutline className="w-4 h-4" />;
      default:
        return <MdPending className="w-4 h-4" />;
    }
  };

  const getLabel = () => {
    switch (status) {
      case 2:
        return "Completed";
      case 1:
        return "Started";
      case 3:
        return "Pending";
      case 4:
        return "Finished";
      default:
        return "Not Started";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBadgeStyle()}`}
    >
      {getIcon()}
      <span className="ml-1">{getLabel()}</span>
    </span>
  );
};

const ModuleDetails = ({ module }) => {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 border-l-4 border-l-indigo-400">
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-lg font-medium text-gray-900">{module.name}</h4>
        <ModuleStatusBadge status={module.status} />
      </div>

      {module.status === 2 && (
        <div className="mt-2 space-y-1">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Completed:</span>{" "}
            {new Date(module.completedDate).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Score:</span> {module.score}%
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Questions:</span>{" "}
            {module.correctAnswers}/{module.totalQuestions} correct
          </p>
        </div>
      )}

      {module.status === 1 && (
        <div className="mt-2 space-y-2">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Last Accessed:</span>{" "}
            {new Date(module.lastAccessed).toLocaleDateString()}
          </p>
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{module.progress}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div
                className="bg-gradient-to-r from-blue-200 to-blue-500 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${module.progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {(module.status === 0 || module.status === 3) && (
        <p className="text-sm text-gray-500 mt-2">Not started yet</p>
      )}
    </div>
  );
};

const EnrolledCourses = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [users, setUsers] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [enrollmentDetails, setEnrollmentDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCourses, setIsLoadingCourses] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await userService.getAllUsers();
        if (response.isSuccess) {
          setUsers(response.data);
        } else {
          toast.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!selectedUser?.value) return;

      try {
        setIsLoadingCourses(true);
        const response = await courseService.getEnrolledCoursesByUser(
          selectedUser.value
        );
        console.log(response);
        if (response.isSuccess) {
          setEnrolledCourses(response.data);
        } else {
          toast.error("Failed to fetch enrolled courses");
        }
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
        toast.error("Failed to fetch enrolled courses");
      } finally {
        setIsLoadingCourses(false);
      }
    };

    fetchEnrolledCourses();
  }, [selectedUser]);

  useEffect(() => {
    const fetchEnrollmentDetails = async () => {
      if (!selectedCourse?.value) return;

      try {
        setIsLoadingDetails(true);
        const response = await courseService.getEnrollmentDetails(
          selectedCourse.value,
          selectedUser.value
        );
        if (response.isSuccess) {
          const userEnrollment = response.data.find(
            (enrollment) => enrollment.userId === selectedUser.value
          );
          if (userEnrollment) {
            setEnrollmentDetails(userEnrollment);
          } else {
            toast.error("No enrollment details found for this user");
          }
        } else {
          toast.error("Failed to fetch enrollment details");
        }
      } catch (error) {
        console.error("Error fetching enrollment details:", error);
        toast.error("Failed to fetch enrollment details");
      } finally {
        setIsLoadingDetails(false);
      }
    };

    fetchEnrollmentDetails();
  }, [selectedUser, selectedCourse]);

  const userOptions = users.map((user) => ({
    value: user.id,
    label: `${user.name} (${user.email})`,
  }));

  const courseOptions = enrolledCourses.map((course) => ({
    value: course.course.id,
    label: course.course.name,
  }));

  const handleUserChange = (option) => {
    setSelectedUser(option);
    setSelectedCourse(null);
    setEnrollmentDetails(null);
  };

  const renderCourseDetails = () => {
    if (!selectedCourse || !enrollmentDetails) return null;

    return (
      <div className="mt-8 space-y-6">
        {/* Course Overview */}
        <div className="bg-gradient-to-br from-white to-indigo-50 p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-indigo-900">
            {enrollmentDetails.courseName}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-indigo-800">
                Course Progress
              </h3>
              <div className="mt-4 bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-gray-700 mb-2">
                  Performance Overview
                </h4>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Total Questions:</span>{" "}
                      {enrollmentDetails.totalQuestions}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Correct Answers:</span>{" "}
                      {enrollmentDetails.totalCorrectAnswers} /{" "}
                      {enrollmentDetails.totalAnswers}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Success Rate:</span>{" "}
                      {enrollmentDetails.percentage}%
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Average Score:</span>{" "}
                      {enrollmentDetails.avgPercentage}%
                    </p>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-200 to-blue-500 h-3 rounded-full transition-all duration-300"
                      style={{
                        width: `${enrollmentDetails.percentage}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2 text-indigo-800">
                Enrollment Details
              </h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium">Student Email:</span>{" "}
                  {enrollmentDetails.studentEmail}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Enrolled Date:</span>{" "}
                  {new Date(
                    enrollmentDetails.enrollmentDate
                  ).toLocaleDateString()}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Deadline:</span>{" "}
                  {enrollmentDetails.deadLineDate
                    ? new Date(
                        enrollmentDetails.deadLineDate
                      ).toLocaleDateString()
                    : "No deadline set"}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={`${
                      enrollmentDetails.courseEnrollmentStatus === 1
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {enrollmentDetails.courseEnrollmentStatus === 1
                      ? "Active"
                      : "Pending"}
                  </span>
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Result Status:</span>{" "}
                  <span
                    className={`${
                      enrollmentDetails.resultStatus === 1
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {enrollmentDetails.resultStatus === 1
                      ? "Passed"
                      : "In Progress"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-3xl font-bold text-black">Course Enrollments</h1>
      </div>
      <div className="h-0.5 bg-custom-border-blue mb-4"></div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select User
            </label>
            <Select
              value={selectedUser}
              onChange={handleUserChange}
              options={userOptions}
              isClearable
              placeholder="Select a user..."
              className="basic-single"
              classNamePrefix="select"
              isLoading={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Course
            </label>
            <Select
              value={selectedCourse}
              onChange={setSelectedCourse}
              options={courseOptions}
              isDisabled={!selectedUser}
              isLoading={isLoadingCourses}
              isClearable
              placeholder={
                selectedUser
                  ? "Select a course..."
                  : "Please select a user first"
              }
              className="basic-single"
              classNamePrefix="select"
            />
          </div>
        </div>
      </div>

      {isLoadingDetails ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : (
        renderCourseDetails()
      )}

      {selectedUser && enrolledCourses.length === 0 && !isLoadingCourses && (
        <div className="mt-8 text-center p-8 bg-white rounded-lg border border-gray-200 shadow-sm">
          <p className="text-gray-600 text-lg">
            No enrolled courses found for this user.
          </p>
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
