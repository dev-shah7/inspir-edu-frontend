import { useNavigate, useParams, useSearchParams } from "react-router";
import { useState, useMemo, useEffect } from "react";
import CustomButton from "../../components/common/CustomButton/CustomButton";
import useModalStore from "../store/useModalStore";
import Table from "../common/Table/Table";
import CreateModuleContent from "./CreateModuleContent";
import useModuleStore from "../store/useModuleStore";
import Loader from "../../components/common/Loader/Loader";
import { toast } from "react-hot-toast";
import { IoMdAdd } from "react-icons/io";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ModuleCard from "../common/ModuleCard/ModuleCard";
import useCourseStore from "../store/useCourseStore";
import { usePaymentStatusHandler } from "../../hooks/usePaymentStatusHandler";
import useAuthStore from "../../store/auth/useAuthStore";
import LoginContent from "../../components/Login/LoginContent";

const Modules = () => {
  const { courseId } = useParams();
  const { openModal } = useModalStore();
  const navigate = useNavigate();
  const {
    modules,
    fetchModulesByCourse,
    fetchGuestModulesByCourse,
    deleteModule,
    isLoading: modulesLoading,
  } = useModuleStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [isOperationLoading, setIsOperationLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const { gradingInstructions, fetchGradingInstructions, fetchGuestGradingInstructions } = useCourseStore();
  const { user } = useAuthStore();

  usePaymentStatusHandler();

  useEffect(() => {
    const loadModules = async () => {
      try {
        setIsInitialLoad(true);
        if (user) {
          await fetchModulesByCourse(courseId);
        } else {
          await fetchGuestModulesByCourse(courseId);
        }
      } catch (error) {
        toast.error("Failed to load modules");
      } finally {
        setIsInitialLoad(false);
      }
    };

    if (courseId) {
      loadModules();
    }
  }, [courseId, fetchModulesByCourse, fetchGuestModulesByCourse, user]);

  useEffect(() => {
    const loadGradingInstructions = async () => {
      if (courseId) {
        if (user) {
          await fetchGradingInstructions(courseId);
        } else {
          await fetchGuestGradingInstructions(courseId);
        }
      }
    };

    loadGradingInstructions();
  }, [courseId, fetchGradingInstructions, fetchGuestGradingInstructions, user]);

  const filteredModules = useMemo(() => {
    return modules.filter((module) =>
      module?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, modules]);

  const handleCreateModule = () => {
    if (!user && modules.length >= 1) {
      openModal("Add Email", <LoginContent courseId={courseId} message="Please submit your email first to be able to create more modules." />);
      return;
    }
    openModal("Add Module", <CreateModuleContent />);
  };

  const handleEditModule = (moduleId) => {
    if (!user) {
      openModal("Add Email", <LoginContent courseId={sessionStorage.getItem('guestCourseId')} message="Please submit your email first to be able to edit modules." />);
      return;
    }
    openModal(
      "Edit Module",
      <CreateModuleContent mode="edit" moduleId={moduleId} />
    );
  };

  const handleDeleteModule = async (moduleId) => {
    if (window.confirm("Are you sure you want to delete this module?")) {
      try {
        if (user) {
          await deleteModule(moduleId);
        } else {
          openModal("Add Email", <LoginContent courseId={courseId} message="Please submit your email first to be able to delete modules." />);
          return;       
        }
        toast.success("Module deleted successfully");
      } catch (error) {
        toast.error("Failed to delete module");
      }
    }
  };

  const headers = [
    { label: "Position", align: "left" },
    { label: "Module Name", align: "left" },
    { label: "View/Add Question", align: "center" },
    { label: "Action", align: "center" },
  ];

  const renderRow = (index, module) => (
    <>
      <tr className="hover:bg-gray-50 transition">
        <td className="py-3 px-4 sm:px-2">{module.position || index + 1}</td>
        <td className="py-3 px-4 sm:px-2">{module.name || "-"}</td>
        <td className="py-3 px-4 sm:px-2 text-center">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 justify-center">
            <CustomButton
              text="View Questions"
              className="w-full sm:w-auto text-sm bg-custom-button-green hover:bg-green-700"
              onClick={() => navigate(`/admin/courses/${courseId}/modules/${module.id}/questions`)}
            />
          </div>
        </td>
        <td className="py-3 px-4 sm:px-2 text-center">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 justify-center">
            <CustomButton
              text="Edit"
              className="w-full sm:w-auto text-sm bg-black hover:bg-gray-600"
              onClick={() => handleEditModule(module.id)}
            />
            <CustomButton
              text="Delete"
              className="w-full sm:w-auto text-sm bg-red-600 hover:bg-red-500"
              onClick={() => handleDeleteModule(module.id)}
            />
          </div>
        </td>
      </tr>
      {filteredModules.indexOf(module) !== filteredModules.length - 1 && (
        <tr>
          <td colSpan={headers.length}>
            <div className="h-0.5 bg-custom-border-blue"></div>
          </td>
        </tr>
      )}
    </>
  );

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        No Modules Found
      </h3>
      <p className="text-gray-500 text-center max-w-md">
        We haven&apos;t found any modules for this course. Get started by
        creating your first module.
      </p>
      <button
        onClick={handleCreateModule}
        className="px-6 py-2 mt-4 bg-custom-button-green hover:bg-green-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring transition flex items-center gap-1"
      >
        <IoMdAdd className="text-xl" /> Create Modules
      </button>
    </div>
  );

  const renderTableContent = () => {
    if (modulesLoading || isInitialLoad) {
      return (
        <div className="w-full h-[400px] flex items-center justify-center">
          <Loader />
        </div>
      );
    }

    return filteredModules.length > 0 ? (
      <div className="min-w-full">
        <Table headers={headers} data={filteredModules} renderRow={renderRow} />
      </div>
    ) : (
      renderEmptyState()
    );
  };

  const renderHeader = () => (
    <div className="flex flex-col mb-6">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-1">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
              All Modules
            </h1>
            <button
              onClick={handleCreateModule}
              className="w-full lg:w-auto px-4 py-2 bg-custom-button-green hover:bg-green-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring transition flex items-center gap-1 justify-center"
            >
              <IoMdAdd className="text-md" /> Create Modules
            </button>
          </div>
          <p className="text-lg text-gray-600">Course Name</p>
        </div>
        <div className="relative w-full lg:w-64 lg:mt-8">
          <input
            type="text"
            placeholder="Search modules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition"
          />
          <svg
            className="absolute right-3 top-5 transform -translate-y-1/2 text-gray-400"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      <div className="h-0.5 bg-custom-border-blue mt-1"></div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-[calc(100vh-120px)] px-4 md:px-6">
      {renderHeader()}

      <div className="w-full mt-4 mb-5">
        <ModuleCard
          instructions={gradingInstructions?.instructions}
          passingPercentage={gradingInstructions?.passingPercentage}
        />
      </div>

      <div className="flex-1 overflow-x-auto">{renderTableContent()}</div>

      <div className="flex flex-col sm:flex-row justify-between items-center py-4 border-t-2 border-custom-border-blue mt-4 gap-4">
        <div className="text-sm md:text-base text-gray-600">
          Rows per page: 10
        </div>
        <div className="flex items-center gap-4">
          <button
            disabled
            className="text-sm md:text-base text-blue-500 font-medium text-gray-400 cursor-not-allowed"
          >
            <IoIosArrowBack size={20} />
          </button>
          <span className="text-sm md:text-base text-gray-600 font-medium">
            1-1
          </span>
          <button className="text-sm md:text-base text-blue-500 font-medium hover:text-blue-700">
            <IoIosArrowForward size={20} />
          </button>
        </div>
      </div>

      {isOperationLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  );
};

export default Modules;
