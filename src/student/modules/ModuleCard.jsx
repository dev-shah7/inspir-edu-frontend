const ModuleCard = ({ module }) => {
  return (
    <div className="flex justify-between items-center bg-light-bg shadow-md rounded-lg p-6">
      {/* Left Section */}
      <div>
        <p className="text-black font-bold text-lg">{module.name}</p>
        <p className="text-gray-600 text-sm">{module.description}</p>
      </div>

      {/* Progress Bar Section */}
      <div className="flex items-center space-x-4">
        <div className="w-64 bg-gray-300 rounded-full h-2.5">
          <div
            className="bg-button-blue h-2.5 rounded-full"
            style={{ width: `${module.progress}%` }}
          ></div>
        </div>
        <span className="text-button-blue font-bold">{module.progress}%</span>
      </div>

      {/* Go to Module Button */}
      <button className="bg-gradient-blue text-black px-4 py-2 rounded-md shadow-md font-medium flex items-center">
        Go to Module <span className="ml-2">↗</span>
      </button>

      {/* Expand/Collapse Button */}
      <button className="bg-gray-200 text-black px-3 py-2 rounded-md shadow-md">
        <span>▼</span>
      </button>
    </div>
  );
};

export default ModuleCard;
