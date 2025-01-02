import { FaInfoCircle, FaCheckCircle, FaBook, FaStar } from 'react-icons/fa';
import useCourseStore from '../../store/useCourseStore';

const CourseInfoTable = () => {
  const { currentCourse } = useCourseStore();
  return (
    <div className="mx-auto my-4 max-w-3xl">
      <div className="bg-blue-50 rounded-lg shadow-md overflow-hidden">
        <div className="p-3 sm:p-4">
          <table className="w-full text-left border-collapse">
            <tbody>
              <tr className='border-b bg-gray-100'>
                <th className='py-2 sm:py-4 px-3 sm:px-6 flex items-center space-x-2 sm:space-x-3 text-gray-800 font-medium'>
                  <FaInfoCircle className='text-base sm:text-lg' />
                  <span className='text-xl sm:text-base'>Basic Info</span>
                </th>
                <td className='py-2 sm:py-4 px-3 sm:px-6 text-gray-800 text-lg sm:text-base'>
                  {currentCourse?.courseName}
                </td>
              </tr>
              <tr className='border-b'>
                <th className='py-2 sm:py-4 px-3 sm:px-6 flex items-center space-x-2 sm:space-x-3 text-gray-800 font-medium'>
                  <FaCheckCircle className='text-base sm:text-lg' />
                  <span className='text-xl sm:text-base'>No Of Modules</span>
                </th>
                <td className='py-2 sm:py-4 px-3 sm:px-6 text-gray-800 text-xl sm:text-base'>
                  {currentCourse?.analytics?.totalModules}
                </td>
              </tr>
              <tr className='border-b bg-gray-100'>
                <th className='py-2 sm:py-4 px-3 sm:px-6 flex items-center space-x-2 sm:space-x-3 text-gray-800 font-medium'>
                  <FaBook className='text-base sm:text-lg' />
                  <span className='text-xl sm:text-base'>Deadline-Based</span>
                </th>
                <td className='py-2 sm:py-4 px-3 sm:px-6 text-gray-800 text-xl sm:text-base'>
                  {currentCourse?.deadLineDate ? "Yes" : "No"}
                </td>
              </tr>
              <tr>
                <th className='py-2 sm:py-4 px-3 sm:px-6 flex items-center space-x-2 sm:space-x-3 text-gray-800 font-medium'>
                  <FaStar className='text-base sm:text-lg' />
                  <span className='text-xl sm:text-base'>Enrollment Date</span>
                </th>
                <td className='py-2 sm:py-4 px-3 sm:px-6 text-gray-800 text-xl sm:text-base'>
                  {currentCourse?.enrollmentDate}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CourseInfoTable;