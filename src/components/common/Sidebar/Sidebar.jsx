import { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { FiUsers } from "react-icons/fi";
import {
  IoBookOutline,
  IoSchoolOutline,
  IoStatsChartOutline,
} from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import useCourseStore from "../../../admin/store/useCourseStore";

const Sidebar = ({ isSidebarOpen, userRole }) => {
  const [isUsersMenuOpen, setUsersMenuOpen] = useState(false);
  const clearCurrentCourse = useCourseStore(
    (state) => state.clearCurrentCourse
  );
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    clearCurrentCourse();
    navigate(path);
  };

  return (
    <div
      className={`z-30 h-[80vh] bg-gradient-to-br from-blue-100 to-blue-200 w-64 p-4 mt-4 ml-4 rounded-3xl shadow-2xl transform transition-transform duration-300 md:static md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      <nav className="space-y-6">
        <button
          onClick={() => handleNavigation("/")}
          className="flex items-center w-full space-x-3 p-3 rounded-xl hover:bg-blue-300/50 text-left font-medium text-gray-700 hover:text-gray-900 transition-all duration-200 text-lg"
        >
          <LuLayoutDashboard className="h-6 w-6 mr-2 text-blue-600" />
          <span>Dashboard</span>
        </button>

        {userRole === "admin" && (
          <>
            <button
              onClick={() => handleNavigation("/admin/courses")}
              className="flex items-center w-full space-x-3 p-3 rounded-xl hover:bg-blue-300/50 text-left font-medium text-gray-700 hover:text-gray-900 transition-all duration-200 text-lg"
            >
              <IoBookOutline className="h-6 w-6 mr-2 text-blue-600" />
              <span>Courses</span>
            </button>
            <div className="relative">
              <button
                onClick={() => setUsersMenuOpen(!isUsersMenuOpen)}
                className="flex justify-between items-center w-full p-3 rounded-xl hover:bg-blue-300/50 transition-all duration-200 font-medium text-gray-700 hover:text-gray-900 text-lg"
              >
                <div className="flex items-center">
                  <FiUsers className="h-6 w-6 mr-3 text-blue-600" />
                  <span>Users</span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 transition-transform duration-300 ease-in-out text-blue-600 ${isUsersMenuOpen ? "rotate-90" : ""
                    }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isUsersMenuOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                  }`}
              >
                <div className="ml-4 mt-2 space-y-2 border-l-2 border-blue-300 pl-4">
                  <button
                    onClick={() => handleNavigation("/admin/users")}
                    className="block w-full p-3 rounded-xl hover:bg-blue-300/50 transition-all duration-200 hover:translate-x-1 transform text-left text-base"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="font-medium text-gray-700 hover:text-gray-900">
                        All Users
                      </span>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNavigation("/admin/enrolled-courses")}
                    className="block w-full p-3 rounded-xl hover:bg-blue-300/50 transition-all duration-200 hover:translate-x-1 transform text-left text-base"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="font-medium text-gray-700 hover:text-gray-900">
                        Enrolled Users
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {userRole === "student" && (
          <div className="space-y-4">
            <Link
              to="/student/myCourses"
              className="flex items-center space-x-3 p-3 rounded-xl hover:bg-blue-300/50 text-gray-700 hover:text-gray-900 transition-all duration-200 font-medium text-lg"
            >
              <IoSchoolOutline className="h-6 w-6 mr-2 text-blue-600" />
              <span>My Courses</span>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  userRole: PropTypes.string.isRequired,
};

export default Sidebar;
