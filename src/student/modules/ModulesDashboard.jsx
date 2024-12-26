const ModulesDashboard = () => {
  const modules = [
    {
      id: 1,
      moduleName: "Module -1",
      title: "Introduction to Social Media Marketing",
      overallProgress: 65,
      quizScore: 60.4,
      classAttendance: 100,
      action: "Try Again",
    },
    {
      id: 2,
      moduleName: "Module -2",
      title: "Introduction to Social Media Marketing",
      overallProgress: 90,
      quizScore: null,
      classAttendance: null,
      action: null,
    },
    {
      id: 3,
      moduleName: "Module -3",
      title: "Introduction to Social Media Marketing",
      overallProgress: 75,
      quizScore: null,
      classAttendance: null,
      action: null,
    },
    {
      id: 4,
      moduleName: "Module -4",
      title: "Introduction to Social Media Marketing",
      overallProgress: 65,
      quizScore: null,
      classAttendance: null,
      action: null,
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Overall Score Section */}
      <div className="flex justify-between items-center bg-light-bg shadow-md rounded-lg p-6 mb-6">
        <div>
          <p className="font-medium text-gray-600 mb-2">Overall Score</p>
          <div className="flex items-center">
            <span className="text-gray-600 text-sm mr-4">Overall Progress</span>
            <div className="w-64 bg-gray-300 rounded-full h-2.5">
              <div
                className="bg-button-blue h-2.5 rounded-full"
                style={{ width: "80%" }}
              ></div>
            </div>
            <span className="text-gray-600 text-sm ml-4">80%</span>
          </div>
        </div>
        <div>
          <p className="font-medium text-gray-600 mb-2">Class Attendance</p>
          <div className="flex items-center">
            <div className="w-64 bg-gray-300 rounded-full h-2.5">
              <div
                className="bg-button-green h-2.5 rounded-full"
                style={{ width: "97.4%" }}
              ></div>
            </div>
            <span className="text-gray-600 text-sm ml-4">97.4%</span>
          </div>
        </div>
      </div>

      {/* Module Progress Section */}
      <div>
        <div className="grid grid-cols-4 text-gray-600 font-medium mb-2 px-6">
          <span>Module Name</span>
          <span>Progress</span>
          <span>Action</span>
        </div>
        {modules.map((module) => (
          <div
            key={module.id}
            className="bg-light-bg shadow-md rounded-lg p-6 mb-4"
          >
            <div className="grid grid-cols-4 items-center gap-4">
              {/* Module Details */}
              <div>
                <p className="font-bold text-lg">{module.moduleName}</p>
                <p className="text-gray-600 text-sm">{module.title}</p>
                {module.classAttendance !== null && (
                  <div className="mt-2">
                    <p className="text-gray-600 text-sm mb-1">Class Attendance</p>
                    <div className="flex items-center">
                      <div className="w-64 bg-gray-300 rounded-full h-2.5">
                        <div
                          className="bg-button-green h-2.5 rounded-full"
                          style={{ width: `${module.classAttendance}%` }}
                        ></div>
                      </div>
                      <span className="text-button-green font-medium ml-4">
                        {module.classAttendance}%
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Overall Progress */}
              <div>
                <p className="text-gray-600 text-sm mb-1">Overall Progress</p>
                <div className="flex items-center">
                  <div className="w-64 bg-gray-300 rounded-full h-2.5">
                    <div
                      className="bg-button-blue h-2.5 rounded-full"
                      style={{ width: `${module.overallProgress}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-600 text-sm ml-4">
                    {module.overallProgress}%
                  </span>
                </div>
                {module.quizScore !== null && (
                  <div className="mt-2">
                    <p className="text-gray-600 text-sm mb-1">Quiz Test</p>
                    <div className="flex items-center">
                      <div className="w-64 bg-gray-300 rounded-full h-2.5">
                        <div
                          className="bg-red-500 h-2.5 rounded-full"
                          style={{ width: `${module.quizScore}%` }}
                        ></div>
                      </div>
                      <span className="text-red-500 font-medium ml-4">
                        {module.quizScore}%
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action */}
              <div className="flex flex-col items-start">
                <button className="bg-button-blue text-white px-4 py-2 rounded-md shadow-md font-medium flex items-center mb-2">
                  Go To Module <span className="ml-2">↗</span>
                </button>
                {module.action && (
                  <button className="bg-red-100 text-red-500 px-4 py-2 rounded-md shadow-md font-medium flex items-center">
                    {module.action} <span className="ml-2">↗</span>
                  </button>
                )}
              </div>

              {/* Expand/Collapse */}
              <div>
                <button className="bg-gray-100 text-gray-600 px-3 py-2 rounded-md shadow-md">
                  {module.id === 1 ? "▲" : "▼"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModulesDashboard;
