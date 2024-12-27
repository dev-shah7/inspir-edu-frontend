import { useState } from "react";
import Select from "react-select";
import { IoCheckmarkCircle, IoTimeOutline } from "react-icons/io5";
import { MdPending } from "react-icons/md";

// Hardcoded data
const MOCK_USERS = [
  { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com" },
  { id: 2, firstName: "Jane", lastName: "Smith", email: "jane@example.com" },
  { id: 3, firstName: "Mike", lastName: "Johnson", email: "mike@example.com" },
];

const MOCK_COURSES = [
  {
    id: 1,
    name: "Introduction to React",
    description: "Learn the basics of React development",
    enrolledUsers: [1, 2],
    modules: [
      {
        id: 1,
        name: "React Fundamentals",
        status: "completed",
        completedDate: "2024-02-15",
        score: 95,
        totalQuestions: 10,
        correctAnswers: 9,
      },
      {
        id: 2,
        name: "Components & Props",
        status: "in_progress",
        lastAccessed: "2024-03-10",
        progress: 60,
      },
      {
        id: 3,
        name: "State & Lifecycle",
        status: "pending",
      },
    ],
    enrollmentDate: "2024-01-15",
    lastAccessed: "2024-03-10",
  },
  {
    id: 2,
    name: "Advanced JavaScript",
    description: "Master JavaScript concepts and patterns",
    enrolledUsers: [1, 3],
    modules: [
      {
        id: 1,
        name: "JavaScript Fundamentals",
        status: "completed",
        completedDate: "2024-02-15",
        score: 90,
        totalQuestions: 10,
        correctAnswers: 8,
      },
      {
        id: 2,
        name: "Advanced Concepts",
        status: "in_progress",
        lastAccessed: "2024-03-10",
        progress: 50,
      },
      {
        id: 3,
        name: "Node.js Integration",
        status: "pending",
      },
    ],
    enrollmentDate: "2024-01-15",
    lastAccessed: "2024-03-10",
  },
  {
    id: 3,
    name: "Node.js Fundamentals",
    description: "Server-side development with Node.js",
    enrolledUsers: [2],
    modules: [
      {
        id: 1,
        name: "Node.js Basics",
        status: "completed",
        completedDate: "2024-02-15",
        score: 90,
        totalQuestions: 10,
        correctAnswers: 8,
      },
      {
        id: 2,
        name: "Express.js",
        status: "in_progress",
        lastAccessed: "2024-03-10",
        progress: 40,
      },
      {
        id: 3,
        name: "MongoDB",
        status: "pending",
      },
    ],
    enrollmentDate: "2024-01-15",
    lastAccessed: "2024-03-10",
  },
];

const ModuleStatusBadge = ({ status }) => {
  const getBadgeStyle = () => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "in_progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getIcon = () => {
    switch (status) {
      case "completed":
        return <IoCheckmarkCircle className="w-4 h-4" />;
      case "in_progress":
        return <IoTimeOutline className="w-4 h-4" />;
      default:
        return <MdPending className="w-4 h-4" />;
    }
  };

  const getLabel = () => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in_progress":
        return "In Progress";
      default:
        return "Pending";
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
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-lg font-medium text-gray-900">{module.name}</h4>
        <ModuleStatusBadge status={module.status} />
      </div>

      {module.status === "completed" && (
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

      {module.status === "in_progress" && (
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
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${module.progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {module.status === "pending" && (
        <p className="text-sm text-gray-500 mt-2">Not started yet</p>
      )}
    </div>
  );
};

const EnrolledCourses = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const userOptions = MOCK_USERS.map((user) => ({
    value: user.id,
    label: `${user.firstName} ${user.lastName} (${user.email})`,
  }));

  // Filter courses based on selected user
  const availableCourses = selectedUser
    ? MOCK_COURSES.filter((course) =>
        course.enrolledUsers.includes(selectedUser.value)
      )
    : [];

  const courseOptions = availableCourses.map((course) => ({
    value: course.id,
    label: course.name,
  }));

  const handleUserChange = (option) => {
    setSelectedUser(option);
    setSelectedCourse(null); // Reset course selection when user changes
  };

  const renderCourseDetails = () => {
    if (!selectedCourse) return null;

    const course = MOCK_COURSES.find((c) => c.id === selectedCourse.value);
    if (!course) return null;

    const completedModules = course.modules.filter(
      (m) => m.status === "completed"
    ).length;

    return (
      <div className="mt-8 space-y-6">
        {/* Course Overview */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-bold mb-4">{course.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Course Details</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="mt-4">
                <h4 className="font-medium text-gray-700 mb-2">
                  Overall Progress
                </h4>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{
                      width: `${
                        (completedModules / course.modules.length) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {completedModules} of {course.modules.length} modules
                  completed
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Enrollment Details</h3>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Enrolled Date:</span>{" "}
                  {new Date(course.enrollmentDate).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Last Accessed:</span>{" "}
                  {new Date(course.lastAccessed).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modules List */}
        <div className="bg-gray-50 p-2 rounded-lg border border-gray-200">
          <h3 className="text-xl font-semibold mb-4">Course Modules</h3>
          <div className="grid grid-cols-1 gap-4">
            {course.modules.map((module) => (
              <ModuleDetails key={module.id} module={module} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-2">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Enrolled Courses</h1>
        <div className="h-0.5 bg-custom-border-blue"></div>
      </div>

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
            isClearable
            placeholder={
              selectedUser ? "Select a course..." : "Please select a user first"
            }
            className="basic-single"
            classNamePrefix="select"
          />
        </div>
      </div>

      {renderCourseDetails()}

      {selectedUser && availableCourses.length === 0 && (
        <div className="mt-8 text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-600">
            No enrolled courses found for this user.
          </p>
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
