import { FaTimesCircle } from "react-icons/fa";

const IncorrectTag = () => {
  return (
    <div className="flex items-center bg-red-100 text-red-800 text-lg font-medium px-3 py-1 rounded-full shadow-md space-x-2 w-64">
      <FaTimesCircle size={24} /> {/* Adjust size as needed */}
      <span>Incorrect</span>
    </div>
  );
};

export default IncorrectTag;
