import { useNavigate } from "react-router";

const CourseNav = ({ course = null }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-wrap justify-start space-x-2 space-y-4 md:space-y-2 md:space-x-4 mb-6 rounded-lg shadow-md bg-light-bg text-black p-6 mx-4">
      <button className="px-6 py-2 bg-button-blue text-white rounded-md shadow-md font-medium" onClick={() => navigate(`/student/courses/${course?.id || 2}/overview`)}>
        Overview
      </button>
      <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md shadow-md font-medium" onClick={() => navigate(`/student/courses/${course?.id || 2}/modules`)}>
        Modules
      </button>
    </div>
  )
}

export default CourseNav;