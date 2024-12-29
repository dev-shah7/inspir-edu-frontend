import { useNavigate } from "react-router";
import ProgressBar from "../components/common/ProgressBar";
import { ModuleStatus } from "../../helpers/enums";
import useModuleStore from '../../admin/store/useModuleStore';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const Module = ({ module, position }) => {
  const navigate = useNavigate();
  const { startUserModule, isLoading } = useModuleStore();

  const handleStartModule = async () => {
    if (module.status === 0) {
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

  return (
    <div
      className={`flex flex-col xl:flex-row items-center xl:justify-between sm:justify-center p-4 rounded-lg shadow-md bg-light-bg ${module.active ? "text-black" : "text-gray-400"
        }`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
        <div
          className={`rounded-lg p-3 flex items-center justify-center flex-col ${true ? "bg-gradient-blue text-black" : "bg-gray-200"
            }`}
        >
          <p className="text-lg">Module</p>
          <p className="text-4xl font-bold">{position + 1}</p>
        </div>
        <div className="w-full sm:w-auto">
          <h4
            className={`text-lg font-semibold ${true ? "text-slate-900" : "text-gray-400"
              }`}
          >
            {module.moduleName}
          </h4>
          <div className="flex flex-wrap items-center space-x-3 mt-1">
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${true
                ? "bg-button-green text-white"
                : "bg-gray-200 text-gray-500"
                }`}
            >
              {ModuleStatus[module.status]}
            </span>
            <span className="text-sm flex items-center">
              <i className="mr-1">📄</i> {2} Assignments
            </span>
            <span className="text-sm flex items-center">
              <i className="mr-1">📝</i> {3} Test
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bars Section */}
      <div className="flex flex-col items-center gap-6 mt-4 md:mt-0">
        <div className="w-auto">
          <ProgressBar
            label="Overall Progress"
            percentage={60}
            color="bg-button-blue"
          />
        </div>

        <div className="w-full sm:w-auto">
          <ProgressBar
            label="Quiz Test"
            percentage={70}
            color="bg-red-500"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="mt-4 md:mt-0 text-center w-full sm:w-auto">
        <p
          className={`text-sm rounded-lg py-1 px-4 ${true
            ? "text-black bg-gradient-blue"
            : "bg-gray-200 text-gray-400"
            }`}
        >
          {"17 Nov - 23 Nov 2024"}
        </p>
        <button
          className={`px-12 py-2 rounded-md mt-1 text-md font-semibold shadow-lg ${true
            ? 'bg-button-blue text-white'
            : 'bg-gray-200 text-gray-400'
            }`}
          onClick={handleStartModule}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className='flex items-center justify-center'>
              <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
              <span className='ml-2'>Loading...</span>
            </div>
          ) : (
            'Study Plan'
          )}
        </button>
        <br />
        {module.quizTestScore < 70 && (
          <button className="mt-2 px-12 py-2 bg-red-100 text-red-500 rounded-md shadow-md font-medium">
            Try Again
          </button>
        )}
      </div>
    </div >
  );
};

export default Module;
