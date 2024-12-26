const CongratulationsBanner = () => {
  return (
    <div className="p-6 sm:p-12 my-5 bg-yellow-100 rounded-lg shadow-md max-w-3xl mx-auto flex flex-col items-center space-y-8">
      <div className="text-center">
        <h2 className="text-3xl sm:text-5xl text-green-600">Congratulations!</h2>
        <p className="text-lg sm:text-xl text-gray-700">You have completed the Quiz test.</p>
      </div>

      <div className="py-8 flex flex-col md:flex-row items-center justify-between w-full md:space-x-8">

        <div className="text-center flex flex-col md:flex-row items-center px-4 md:px-8 space-y-4 md:space-y-0 md:space-x-4">
          <div className="text-4xl sm:text-5xl font-bold text-green-600">📋</div>
          <div>
            <p className="text-md sm:text-lg text-gray-700">Your Score</p>
            <p className="text-xl sm:text-2xl font-bold text-green-600">93.81%</p>
          </div>
        </div>

        <div className="hidden md:block border-l border-gray-300 h-24"></div>

        <div className="text-center flex flex-col md:flex-row items-center px-4 md:px-8 space-y-4 md:space-y-0 md:space-x-4">
          <div className="text-4xl sm:text-5xl font-bold text-green-600">🎯</div>
          <div>
            <p className="text-md sm:text-lg text-gray-700">Marks</p>
            <p className="text-xl sm:text-2xl font-bold text-green-600">93/100</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CongratulationsBanner;
