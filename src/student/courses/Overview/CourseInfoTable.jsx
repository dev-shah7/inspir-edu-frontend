import { FaInfoCircle, FaCheckCircle, FaBook, FaStar } from 'react-icons/fa';

const CourseInfoTable = () => {
  return (
    <div className="mx-auto my-4 max-w-3xl">
      <div className="bg-blue-50 rounded-lg shadow-md overflow-hidden">
        <div className="p-3 sm:p-4">
          <table className="w-full text-left border-collapse">
            <tbody>
              <tr className='border-b bg-gray-100'>
                <th className='py-2 sm:py-4 px-3 sm:px-6 flex items-center space-x-2 sm:space-x-3 text-gray-800 font-medium'>
                  <FaInfoCircle className='text-base sm:text-lg' />
                  <span className='text-sm sm:text-base'>Basic Info</span>
                </th>
                <td className='py-2 sm:py-4 px-3 sm:px-6 text-gray-800 text-sm sm:text-base'>
                  Course 1 of 6 in the Meta Social Media Marketing
                </td>
              </tr>
              <tr className='border-b'>
                <th className='py-2 sm:py-4 px-3 sm:px-6 flex items-center space-x-2 sm:space-x-3 text-gray-800 font-medium'>
                  <FaCheckCircle className='text-base sm:text-lg' />
                  <span className='text-sm sm:text-base'>Level</span>
                </th>
                <td className='py-2 sm:py-4 px-3 sm:px-6 text-gray-800 text-sm sm:text-base'>
                  Beginner
                </td>
              </tr>
              <tr className='border-b bg-gray-100'>
                <th className='py-2 sm:py-4 px-3 sm:px-6 flex items-center space-x-2 sm:space-x-3 text-gray-800 font-medium'>
                  <FaBook className='text-base sm:text-lg' />
                  <span className='text-sm sm:text-base'>Language</span>
                </th>
                <td className='py-2 sm:py-4 px-3 sm:px-6 text-gray-800 text-sm sm:text-base'>
                  English
                </td>
              </tr>
              <tr>
                <th className='py-2 sm:py-4 px-3 sm:px-6 flex items-center space-x-2 sm:space-x-3 text-gray-800 font-medium'>
                  <FaStar className='text-base sm:text-lg' />
                  <span className='text-sm sm:text-base'>User Ratings</span>
                </th>
                <td className='py-2 sm:py-4 px-3 sm:px-6 text-gray-800 text-sm sm:text-base'>
                  Average User Rating 4.8
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