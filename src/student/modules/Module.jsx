import { useNavigate } from "react-router";
import ProgressBar from "../components/common/ProgressBar";
import { CourseEnrollmentStatus, ModuleStatus } from "../../helpers/enums";
import useModuleStore from '../../admin/store/useModuleStore';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import Loader from "../../components/common/Loader/Loader";
import useCourseStore from "../store/useCourseStore";

const Module = ({ module, position, isPreviousModuleCompleted }) => {
  const navigate = useNavigate();
  const { startUserModule, isLoading } = useModuleStore();
  const { currentCourse } = useCourseStore();

  const calculateProgress = () => {
    const moduleAnalytics = currentCourse.userModules[position]?.analytics;
    if (!moduleAnalytics || !moduleAnalytics.totalQuestions) return 0;

    return Math.round((moduleAnalytics.totalAttempted / moduleAnalytics.totalQuestions) * 100);
  };

  const handleStartModule = async () => {
    if (module.status === 0 && currentCourse?.enrollmentStatus !== CourseEnrollmentStatus.DeadlineCrossed) {
      try {
        await startUserModule(module.moduleId);
        navigate(`/student/modules/${module.moduleId}/media`);
      } catch (error) {
        toast.error('Failed to start module. Please try again.');
      }
    }
    else {
      navigate(`/student/modules/${module.moduleId}/media`);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div
      className={`flex flex-col xl:flex-row items-center justify-center p-4 rounded-lg shadow-md bg-light-bg ${module.active ? "text-black" : "text-gray-400"
        }`}
    >
      {/* Left Section - Module Info */}
      <div className="flex flex-col sm:flex-row items-center justify-center sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full xl:w-1/3">
        <div
          className={`rounded-lg p-3 flex items-center justify-center flex-col w-[100px] min-w-[100px] ${true ? "bg-gradient-blue text-black" : "bg-gray-200"
            }`}
        >
          <p className="text-lg">Module</p>
          <p className="text-4xl font-bold">{position + 1}</p>
        </div>
        <div className="w-full sm:w-[200px] text-center sm:text-left">
          <h4
            className={`text-xl font-semibold break-words hyphens-auto ${true ? "text-slate-900" : "text-gray-400"
              }`}
            style={{ hyphens: 'auto' }}
          >
            {module.moduleName}
          </h4>
          <div className="flex flex-wrap items-center justify-center sm:justify-start space-x-3 mt-1">
            <span
              className={`rounded-full px-3 py-1 text-lg font-medium ${true ? "bg-button-green text-white" : "bg-gray-200 text-gray-500"
                }`}
            >
              {ModuleStatus[module.status]}
            </span>
          </div>
        </div>
      </div>

      {/* Middle Section - Progress Bar */}
      <div className="flex flex-col items-center justify-center w-full xl:w-1/3 mt-4 xl:mt-0">
        <div className="w-full max-w-md mx-auto px-4 flex flex-col items-center mt-5">
          <ProgressBar
            label="Overall Progress"
            percentage={calculateProgress()}
            color="bg-button-blue"
            className="w-full flex flex-col items-center"
          />
        </div>
      </div>

      {/* Right Section - Button */}
      <div className="mt-4 xl:mt-0 flex justify-center w-full xl:w-1/3">
        <button
          className={`px-12 py-2 rounded-md mt-1 text-xl font-semibold shadow-lg ${isPreviousModuleCompleted
            ? 'bg-button-blue text-white'
            : 'bg-gray-200 text-gray-400'
            }`}
          onClick={handleStartModule}
          disabled={!isPreviousModuleCompleted || isLoading}
        >
          {currentCourse?.enrollmentStatus === CourseEnrollmentStatus.DeadlineCrossed
            ? "View Module"
            : module.status === 0
              ? "Start Module"
              : module.status === 1
                ? "Go To Module"
                : "View Module"
          }
        </button>
      </div>
    </div>
  );
};

export default Module;
