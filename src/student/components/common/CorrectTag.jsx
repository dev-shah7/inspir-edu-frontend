import { FaCheckCircle } from "react-icons/fa";

const CorrectTag = () => {
  return (
    <div className="flex items-center bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full shadow-md space-x-2 w-24">
      <FaCheckCircle />
      <span>Correct</span>
    </div>
  );
};

export default CorrectTag;
