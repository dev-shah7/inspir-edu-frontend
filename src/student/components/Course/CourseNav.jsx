import { useNavigate, useLocation } from 'react-router';
import useCourseStore from '../../store/useCourseStore';

const CourseNav = () => {
  const { currentCourse } = useCourseStore();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      label: 'Modules',
      path: 'modules',
      isActive: location.pathname.split('/').pop() === 'modules',
    },
    {
      label: 'Overview',
      path: 'overview',
      isActive: location.pathname.split('/').pop() === 'overview',
    },
  ];

  return (
    <div className='flex gap-4 mb-6 rounded-lg shadow-md bg-light-bg text-black p-6 mx-4'>
      {navItems.map((item) => (
        <button
          key={item.label}
          className={`w-44 h-16 flex items-center justify-center rounded-md shadow-md font-medium transition-colors text-xl ${item.isActive
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