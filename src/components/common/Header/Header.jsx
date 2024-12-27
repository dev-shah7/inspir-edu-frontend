import { useState } from "react";
import Logo from "../../../assets/Logo-Blue.png";
import PropTypes from "prop-types";
import useAuthStore from "../../../store/auth/useAuthStore";
import { useNavigate } from "react-router-dom";

const Header = ({ isSidebarOpen, setSidebarOpen, userRole }) => {
  const logout = useAuthStore((state) => state.logout);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect will happen automatically through PrivateRoute when auth state changes
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleSupport = () => {
    if (userRole === "admin") {
      navigate("/admin/support");
    } else {
      navigate("/student/support");
    }
  };

  return (
    <header className="bg-[#C6E0FF] mt-2 w-[98vw] mx-auto rounded-2xl h-20 flex items-center justify-between px-6 shadow-md text-black">
      <div className="flex items-center space-x-4">
        <button
          className="block md:hidden p-2 bg-transparent"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        <div className="h-full w-[120px] sm:w-[150px] md:w-[200px]">
          <img src={Logo} alt="logo" />
        </div>

        <div className="h-10 w-[1px] bg-[#1A73E8]"></div>

        <div className="flex items-center space-x-4">
          <span className="text-lg font-semibold">
            {userRole === "admin" ? "Admin Panel" : "Student Portal"}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={handleSupport}
          className="px-4 py-2 bg-white text-[#1A73E8] font-medium rounded-lg hover:bg-[#1A73E8] hover:text-white transition-all duration-300 border-2 border-[#1A73E8] shadow-sm"
        >
          Support
        </button>

        <div className="h-10 w-[1px] bg-[#1A73E8]"></div>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center hover:bg-gray-400 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
              <a
                href="/profile"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
              >
                My Profile
              </a>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  setSidebarOpen: PropTypes.func.isRequired,
  userRole: PropTypes.string.isRequired,
};

export default Header;
