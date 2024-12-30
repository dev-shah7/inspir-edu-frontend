import { FaCheckCircle } from "react-icons/fa";

const CorrectTag = () => {
  return (
    <div className="flex items-center bg-green-100 text-green-800 text-lg font-medium px-3 py-1 rounded-full shadow-md space-x-2 w-28 my-2">
      <FaCheckCircle size={24} /> {/* Adjust size as needed */}
      <span>Correct</span>
    </div>
  );
};

export default CorrectTag;
