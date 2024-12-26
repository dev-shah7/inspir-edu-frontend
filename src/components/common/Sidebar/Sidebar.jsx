import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";

const Sidebar = ({ isSidebarOpen, userRole }) => {
  const [isUsersMenuOpen, setUsersMenuOpen] = useState(false);

  return (
    <aside
      className={`h-[80vh] bg-blue-200 w-64 p-4 mt-4 ml-4 rounded-3xl shadow-2xl transform transition-transform duration-300 md:static md:translate-x-0 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <nav className="space-y-4">
        <Link
          to="/"
          className="flex items-center space-x-2 p-2 rounded hover:bg-blue-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 3a1 1 0 00-.894.553L5.382 11H4a1 1 0 000 2h2a1 1 0 00.894-.553L9.618 5H16a1 1 0 100-2h-6a1 1 0 00-.894.553L10 3z" />
          </svg>
          <span>Dashboard</span>
        </Link>

        {userRole === "admin" && (
          <>
            <Link
              to="/admin/courses"
              className="flex items-center space-x-2 p-2 rounded hover:bg-blue-300"
            >
              <span>Courses</span>
            </Link>
            <div>
              <button
                onClick={() => setUsersMenuOpen(!isUsersMenuOpen)}
                className="flex justify-between items-center w-full p-2 rounded hover:bg-blue-300"
              >
                <span>Users</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 transition-transform ${
                    isUsersMenuOpen ? "rotate-90" : ""
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
              {isUsersMenuOpen && (
                <div className="ml-4 space-y-2">
                  <Link
                    to="/users/all"
                    className="block p-2 rounded hover:bg-blue-300"
                  >
                    All Users
                  </Link>
                  <Link
                    to="/users/enrolled"
                    className="block p-2 rounded hover:bg-blue-300"
                  >
                    Enrolled Users
                  </Link>
                </div>
              )}
            </div>
          </>
        )}

        {userRole === "student" && (
          <div>
            <Link
              to="/student/courses"
              className="flex items-center space-x-2 p-2 rounded hover:bg-blue-300"
            >
              <span>My Courses</span>
            </Link>
            <Link
              to="/student/progress"
              className="flex items-center space-x-2 p-2 rounded hover:bg-blue-300"
            >
              <span>My Progress</span>
            </Link>
          </div>
        )}
      </nav>
    </aside>
  );
};

Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  userRole: PropTypes.string.isRequired,
};

export default Sidebar;
