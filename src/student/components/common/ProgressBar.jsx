const ProgressBar = ({ label, percentage, color, showPercentage = true }) => {
  return (
    <div className="mb-4">
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <div className="w-64 bg-gray-300 rounded-full h-2.5">
        <div
          className={`${color} h-2.5 rounded-full`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      {showPercentage && (
        <span className={`font-medium text-sm mt-1 block`}>
          {percentage}%
        </span>
      )}
    </div>
  );
};

export default ProgressBar;
