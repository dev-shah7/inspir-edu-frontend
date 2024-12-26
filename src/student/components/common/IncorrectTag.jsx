import { FaTimesCircle } from "react-icons/fa";

const IncorrectTag = () => {
  return (
    <div className="flex items-center bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full shadow-md space-x-2 w-64">
      <FaTimesCircle />
      <span>This should not be selected</span>
    </div>
  );
};

export default IncorrectTag;
