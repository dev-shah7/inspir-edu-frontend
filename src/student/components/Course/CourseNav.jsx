import { useNavigate, useLocation } from 'react-router';
import useCourseStore from '../../store/useCourseStore';

const CourseNav = () => {
  const { currentCourse } = useCourseStore();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      label: 'Overview',
      path: 'overview',
      isActive: location.pathname.split('/').pop() === 'overview',
    },
    {
      label: 'Modules',
      path: 'modules',
      isActive: location.pathname.split('/').pop() === 'modules',
    },
  ];

  return (
    <div className='flex gap-4 mb-6 rounded-lg shadow-md bg-light-bg text-black p-6 mx-4'>
      {navItems.map((item) => (
        <button
          key={item.label}
          className={`w-32 h-10 flex items-center justify-center rounded-md shadow-md font-medium transition-colors ${item.isActive
            ? 'bg-button-blue text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          onClick={() =>
            navigate(`/student/courses/${currentCourse?.courseId}/${item.path}`)
          }
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default CourseNav;