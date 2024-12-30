import { useNavigate } from "react-router";
import useModuleStore from "../../../../admin/store/useModuleStore";

const ModuleSidebar = ({ isLiveClass = false, liveClassDates = "", description }) => {
  const navigate = useNavigate();
  const { currentModule } = useModuleStore();

  return (
    <div className="lg:col-span-1 space-y-4">
      <h1 className="text-5xl font-bold"> {currentModule?.data?.name}</h1>
      <div className="flex items-center space-x-4">
        {/* {isLiveClass && (
          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
            Live Class
          </span>
        )}
        <span className="text-xs text-gray-600">{liveClassDates}</span> */}
        <button
          onClick={() => navigate(`../modules/${currentModule?.data?.id}/questions`)}
          className="bg-green-700 hover:bg-green-800 text-white font-bold px-6 py-3 rounded-lg shadow-lg transition-all text-xl"
        >
          Take Quiz
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-gray-600 text-xl">Description: {description}</p>
      </div>
    </div>
  );
};

export default ModuleSidebar;
