const SuccessBanner = () => {
  return (
    <div className="p-4 bg-green-100 rounded-lg mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      {/* Left Section */}
      <div className="text-left">
        <h2 className="text-xl md:text-2xl lg:text-4xl mb-2 font-medium text-green-800">
          Congratulations!
        </h2>
        <p className="text-md md:text-md text-green-700">
          You passed with a grade of{" "}
          <span className="font-bold text-green-600">95%</span>.
          Keep up the great work!
        </p>
      </div>
    </div>
  );
};

export default SuccessBanner;
