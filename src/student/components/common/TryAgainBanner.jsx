const TryAgainBanner = () => {
  return (
    <div className="p-4 bg-red-100 rounded-lg mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="text-left">
        <h2 className="text-xl md:text-2xl lg:text-4xl mb-2 font-medium">
          Try again once you are ready
        </h2>
        <p className="text-md md:text-md">
          Grade received{" "}
          <span className="font-bold text-red-600">73.81%</span>
          {" - "}To pass <b>80% or higher </b> is required
        </p>
      </div>

      <button className="bg-button-blue text-white px-4 py-2 md:px-6 md:py-3 rounded-md font-medium text-sm md:text-md">
        Try again
      </button>
    </div>
  );
};

export default TryAgainBanner;
