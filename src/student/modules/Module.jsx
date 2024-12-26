import { useNavigate } from "react-router";
import ProgressBar from "../components/common/ProgressBar";

const Module = ({ module }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`flex flex-col xl:flex-row items-center xl:justify-between sm:justify-center p-4 rounded-lg shadow-md bg-light-bg ${module.active ? "text-black" : "text-gray-400"
        }`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
        <div
          className={`rounded-lg p-3 flex items-center justify-center flex-col ${module.active ? "bg-gradient-blue text-black" : "bg-gray-200"
            }`}
        >
          <p className="text-lg">Module</p>
          <p className="text-4xl font-bold">{module.number}</p>
        </div>
        <div className="w-full sm:w-auto">
          <h4
            className={`text-lg font-semibold ${module.active ? "text-slate-900" : "text-gray-400"
              }`}
          >
            {module.title}
          </h4>
          <div className="flex flex-wrap items-center space-x-3 mt-1">
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${module.active
                ? "bg-button-green text-white"
                : "bg-gray-200 text-gray-500"
                }`}
            >
              {module.status}
            </span>
            <span className="text-sm flex items-center">
              <i className="mr-1">📄</i> {module.assignments} Assignments
            </span>
            <span className="text-sm flex items-center">
              <i className="mr-1">📝</i> {module.tests} Test
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bars Section */}
      <div className="flex flex-col items-center gap-6 mt-4 md:mt-0">
        <div className="w-auto">
          <ProgressBar
            label="Overall Progress"
            percentage={module.progress}
            color="bg-button-blue"
          />
        </div>

        <div className="w-full sm:w-auto">
          <ProgressBar
            label="Quiz Test"
            percentage={module.quizTestScore}
            color="bg-red-500"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="mt-4 md:mt-0 text-center w-full sm:w-auto">
        <p
          className={`text-sm rounded-lg py-1 px-4 ${module.active
            ? "text-black bg-gradient-blue"
            : "bg-gray-200 text-gray-400"
            }`}
        >
          {module.dateRange}
        </p>
        <button
          className={`px-12 py-2 rounded-md mt-1 text-md font-semibold shadow-lg ${module.active
            ? "bg-button-blue text-white"
            : "bg-gray-200 text-gray-400"
            }`}
          onClick={() => navigate(`/student/modules/${module?.id || 2}/questions`)}
        >
          Study Plan
        </button>
        <br />
        {module.quizTestScore < 70 && (
          <button className="mt-2 px-12 py-2 bg-red-100 text-red-500 rounded-md shadow-md font-medium">
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default Module;
