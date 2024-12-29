import { useNavigate, useLocation } from 'react-router';
import useCourseStore from '../../store/useCourseStore';

const CourseNav = () => {
  const { currentCourse } = useCourseStore();
  const navigate = useNavigate();
  const location = useLocation();

  const isModules = location.pathname.includes('/modules');

  return (
    <div className='flex flex-wrap justify-start space-x-2 space-y-4 md:space-y-2 md:space-x-4 mb-6 rounded-lg shadow-md bg-light-bg text-black p-6 mx-4'>
      <button
        className={`w-32 px-6 py-2 rounded-md shadow-md font-medium ${!isModules ? 'bg-button-blue text-white' : 'bg-gray-200 text-gray-700'
          }`}
        onClick={() =>
          navigate(`/student/courses/${currentCourse?.courseId}/overview`)
        }
      >
        Overview
      </button>
      <button
        className={`w-32 px-6 py-2 rounded-md shadow-md font-medium ${isModules ? 'bg-button-blue text-white' : 'bg-gray-200 text-gray-700'
          }`}
        onClick={() =>
          navigate(`/student/courses/${currentCourse?.courseId}/modules`)
        }
      >
        Modules
      </button>
    </div>
  );
};

export default CourseNav;