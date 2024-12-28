import { useNavigate } from "react-router";
import ProgressBar from "../components/common/ProgressBar";
import Module from "./Module";
import useCourseStore from "../store/useCourseStore";

const ModuleList = () => {
  const navigate = useNavigate();
  const { currentCourse } = useCourseStore();
  const modules = [
    {
      number: 1,
      title: "Introduction to Social Media Marketing",
      status: "In Progress",
      assignments: 2,
      tests: 0,
      dateRange: "17 Nov - 23 Nov 2024",
      active: true,
      progress: 65, // Overall progress percentage
      quizTestScore: 60, // Quiz test score percentage
    },
    {
      number: 2,
      title: "Introduction to Social Media Marketing",
      status: "In Progress",
      assignments: 2,
      tests: 0,
      dateRange: "17 Nov - 23 Nov 2024",
      active: false,
      progress: 90, // Overall progress percentage
      quizTestScore: 85, // Quiz test score percentage
    },
    {
      number: 3,
      title: "Introduction to Social Media Marketing",
      status: "In Progress",
      assignments: 2,
      tests: 0,
      dateRange: "17 Nov - 23 Nov 2024",
      active: false,
      progress: 75, // Overall progress percentage
      quizTestScore: 70, // Quiz test score percentage
    },
  ];

  return (
    <div className="p-6">
      <div className="flex flex-col lg:flex-row lg:justify-between items-center bg-light-bg shadow-md rounded-lg p-6 mb-6 gap-6">
        <h1 className="font-bold text-xl w-full text-center md:w-auto md:text-left">
          Course Overall Score
        </h1>

        <div className="w-full md:w-auto">
          <ProgressBar
            label="Overall Progress"
            percentage={80}
            color="bg-button-blue"
            showPercentage={true}
          />
        </div>

        <div className="w-full md:w-auto">
          <ProgressBar
            label="Class Attendance"
            percentage={97.4}
            color="bg-button-green"
            showPercentage={true}
          />
        </div>
        <button
          className={`px-12 py-5 rounded-md mt-1 text-md font-semibold shadow-lg ${true
            ? "bg-button-blue text-white"
            : "bg-gray-200 text-gray-400"
            }`}
          onClick={() => navigate(`/student/courses/success`)}
        >
          Submit
        </button>
      </div>

      <div className="space-y-4">
        {currentCourse?.userModules.map((module, index) => (
          <Module key={index} module={module} position={index} />
        ))}
      </div>
    </div>
  );
};

export default ModuleList;
