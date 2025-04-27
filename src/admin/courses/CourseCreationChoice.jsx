import { useNavigate } from "react-router";
import useModalStore from "../store/useModalStore";
import CreateCourseContent from "./CreateCourseContent";
import AICreateCourseContent from "./AICreateCourseContent";

const CourseCreationChoice = () => {
  const { openModal, closeModal } = useModalStore();
  const navigate = useNavigate();

  const handleManualCreation = () => {
    closeModal();
    openModal("Create Course", <CreateCourseContent mode="add" />);
    navigate("courses");
  };

  const handleAICreation = () => {
    closeModal();
    openModal("Create Course with AI", <AICreateCourseContent />);
    navigate("courses");
  };

  return (
    <div className="my-2">
      <div className="space-y-6 px-16">
        <h2 className="text-md text-center font-light text-[#0F172A]">
          How would you like to create your course?
        </h2>

        <div className="flex justify-center space-x-8">
          <button
            onClick={handleManualCreation}
            className="p-8 w-64 h-64 flex flex-col items-center justify-center border rounded-lg border-gray-300 bg-gray-100 hover:shadow-md transition hover:border-blue-500 hover:bg-blue-50"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/1000/1000917.png"
              alt="Manual Creation"
              className="w-16 mb-4"
            />
            <h3 className="text-lg font-medium mb-2">Manual Creation</h3>
            <p className="text-sm text-gray-600 text-center">
              Create your course manually with full control over content and
              structure
            </p>
          </button>

          <button
            onClick={handleAICreation}
            className="p-8 w-64 h-64 flex flex-col items-center justify-center border rounded-lg border-gray-300 bg-gray-100 hover:shadow-md transition hover:border-blue-500 hover:bg-blue-50"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
              alt="AI Creation"
              className="w-16 mb-4"
            />
            <h3 className="text-lg font-medium mb-2">AI Creation</h3>
            <p className="text-sm text-gray-600 text-center">
              Let AI help you create a course with customizable parameters
            </p>
          </button>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => closeModal()}
            className="px-6 py-2 bg-[#C6433D] text-white font-medium rounded-md hover:bg-[#B91C1C] transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCreationChoice;
