import { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { FiUsers } from "react-icons/fi";
import { IoBookOutline } from "react-icons/io5";
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
    <aside
      className={`h-[80vh] bg-blue-200 w-64 p-4 mt-4 ml-4 rounded-3xl shadow-2xl transform transition-transform duration-300 md:static md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      <nav className="space-y-4">
        <button
          onClick={() => handleNavigation("/")}
          className="flex items-center w-full space-x-2 p-2 rounded hover:bg-blue-300 text-left"
        >
          <LuLayoutDashboard className="h-5 w-5 mr-2" />
          <span>Dashboard</span>
        </button>

        {userRole === "admin" && (
          <>
            <button
              onClick={() => handleNavigation("/admin/courses")}
              className="flex items-center w-full space-x-2 p-2 rounded hover:bg-blue-300 text-left"
            >
              <IoBookOutline className="h-5 w-5 mr-2" />
              <span>Courses</span>
            </button>
            <div className="relative">
              <button
                onClick={() => setUsersMenuOpen(!isUsersMenuOpen)}
                className="flex justify-between items-center w-full p-2 rounded hover:bg-blue-300 transition-colors duration-200"
              >
                <div className="flex items-center">
                  <FiUsers className="h-5 w-5 mr-4" />
                  <span>Users</span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 transition-transform duration-300 ease-in-out ${isUsersMenuOpen ? "rotate-90" : ""
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
                <div className="ml-4 mt-2 space-y-1 border-l-2 border-blue-300 pl-4">
                  <button
                    onClick={() => handleNavigation("/admin/users")}
                    className="block w-full p-2 rounded-lg hover:bg-blue-300 transition-colors duration-200 hover:translate-x-1 transform text-left"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>All Users</span>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNavigation("/admin/enrolled-courses")}
                    className="block w-full p-2 rounded-lg hover:bg-blue-300 transition-colors duration-200 hover:translate-x-1 transform text-left"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Enrolled Users</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {userRole === "student" && (
          <div>
            <Link
              to="/student/myCourses"
              className="flex items-center space-x-2 p-2 rounded hover:bg-blue-300"
            >
              <span>My Courses</span>
            </Link>
            <button
              onClick={() => handleNavigation("/student/progress")}
              className="flex items-center w-full space-x-2 p-2 rounded hover:bg-blue-300 text-left"
            >
              <span>My Progress</span>
            </button>
          </div >
        )}
      </nav >
    </aside >
  );
};

Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  userRole: PropTypes.string.isRequired,
};

export default Sidebar;
