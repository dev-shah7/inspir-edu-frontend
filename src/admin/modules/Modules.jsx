import { useNavigate, useParams } from "react-router";
import CustomButton from "../../components/common/CustomButton/CustomButton";
import ModuleCard from "../common/ModuleCard/ModuleCard";
import { dummyModules } from "../../static/data";
import useModalStore from "../store/useModalStore";
import Table from "../common/Table/Table";
import CreateModuleContent from "../modules/CreateModuleContent";
import { useState, useMemo } from "react";

const Modules = () => {
  const { courseId } = useParams();
  const { closeModal, queueModal } = useModalStore();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredModules = useMemo(() => {
    return dummyModules.filter((module) =>
      module.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleCreateModule = () => {
    queueModal("Add Module", <CreateModuleContent />);
    closeModal();
  };

  const handleEditModule = (moduleId) => {
    queueModal(
      "Edit Module",
      <CreateModuleContent mode="edit" moduleId={moduleId} />
    );
    closeModal();
  };

  const headers = [
    { label: "Module Name", align: "left" },
    { label: "Module Type", align: "left" },
    { label: "View/Add Question", align: "center" },
    { label: "Action", align: "center" },
  ];

  const renderRow = (module) => (
    <>
      <tr className="hover:bg-gray-50 transition">
        <td className="p-4">{module.name}</td>
        <td className="p-4">{module.type}</td>
        <td className="p-4 text-center">
          <div className="flex gap-2 justify-center">
            <CustomButton
              text="View Questions"
              className="w-auto bg-green-800 hover:bg-green-700"
              onClick={() => navigate(`/admin/modules/${module.id}/questions`)}
            />
          </div>
        </td>
        <td className="p-4 text-center">
          <div className="flex gap-2 justify-center">
            <CustomButton
              text="Edit"
              className="w-auto bg-blue-900 hover:bg-gray-600"
              onClick={() => handleEditModule(module.id)}
            />
            <CustomButton
              text="Delete"
              className="w-auto bg-red-600 hover:bg-red-500"
              onClick={() => alert("Delete Button Clicked!")}
            />
          </div>
        </td>
      </tr>
      <tr>
        <td colSpan={headers.length}>
          <div className="h-0.5 bg-gradient-to-r from-custom-border-blue to-transparent"></div>
        </td>
      </tr>
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
        className="px-6 py-2 mt-6 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring focus:ring-blue-300 transition"
      >
        Create Module
      </button>
    </div>
  );

  return (
    <>
      <p className="text-md text-gray-600 mb-8">Courses / Modules</p>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-outfit text-gray-800">
          All Modules for Course ID&nbsp;:&nbsp; {courseId}
        </h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition"
            />
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
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
          <CustomButton
            text="Create Module"
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:ring focus:ring-blue-300 transition"
            onClick={handleCreateModule}
          />
        </div>
      </div>
      <div className="mt-4 h-0.5 bg-gradient-to-r from-custom-div-blue to-transparent"></div>

      <div className="flex justify-between items-center mt-6">
        <p className="text-lg font-outfit text-gray-800">
          Passing Percentage: 75%
        </p>
      </div>

      <div className="w-full mt-8">
        <ModuleCard description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." />
      </div>

      {filteredModules.length > 0 ? (
        <Table headers={headers} data={filteredModules} renderRow={renderRow} />
      ) : (
        renderEmptyState()
      )}
    </>
  );
};

export default Modules;
