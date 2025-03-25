import { useState, useEffect, useRef } from "react";
import Logo from "../../../assets/Logo-Blue.png";
import PropTypes from "prop-types";
import useAuthStore from "../../../store/auth/useAuthStore";
import useCourseStore from "../../../admin/store/useCourseStore";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt } from "react-icons/fa";

const Header = ({ isSidebarOpen, setSidebarOpen }) => {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const activeRole = useAuthStore((state) => state.activeRole);
  const switchRole = useAuthStore((state) => state.switchRole);
  const clearCurrentCourse = useCourseStore((state) => state.clearCurrentCourse);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const hasMultipleRoles = user?.roles?.length > 1;

  const handleRoleSwitch = async () => {
    const currentRole = activeRole;
    const newRole = currentRole === "admin" ? "student" : "admin";
    const updatedRole = await switchRole(newRole);
    setIsDropdownOpen(false);
    clearCurrentCourse();
    navigate(updatedRole === "admin" ? "/admin" : "/student");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      setIsDropdownOpen(false);
      clearCurrentCourse();
      sessionStorage.clear();
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleSupport = () => {
    clearCurrentCourse();
    if (activeRole === "admin") {
      navigate("/admin/support");
    } else {
      navigate("/student/support");
    }
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(false);
    clearCurrentCourse();
    navigate("/admin/profile");
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

        <div className="hidden md:block h-10 w-[1px] bg-[#1A73E8]"></div>

        <div className="hidden md:flex items-center space-x-4">
          <span className="text-2xl flex items-center font-bold text-[#1A73E8]">
            {activeRole === "admin" ? "Admin Portal" : "Student Portal"}
            <span className="text-base font-medium text-gray-600 ml-3">
              | Welcome back
            </span>
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-4 font-outfit">
        {hasMultipleRoles && (
          <>
            <div className="relative inline-block">
              <button 
                onClick={handleRoleSwitch}
                className="w-[200px] h-10 bg-white rounded-full p-1 cursor-pointer shadow-inner border border-[#1A73E8]/20 relative overflow-hidden"
              >
                <div 
                  className={`absolute top-1 h-8 w-[96px] bg-[#1A73E8] rounded-full shadow-md transition-all duration-500 ease-in-out transform ${
                    activeRole === "student" ? "translate-x-[96px]" : "translate-x-0"
                  }`}
                />
                <div className="relative flex justify-between items-center h-full text-sm font-medium">
                  <span className={`flex-1 text-center z-10 transition-colors duration-500 ease-in-out ${
                    activeRole === "admin" ? "text-white" : "text-[#1A73E8]"
                  }`}>
                    Admin
                  </span>
                  <span className={`flex-1 text-center z-10 transition-colors duration-500 ease-in-out ${
                    activeRole === "student" ? "text-white" : "text-[#1A73E8]"
                  }`}>
                    Student
                  </span>
                </div>
              </button>
            </div>
            <div className="h-10 w-[1px] bg-[#1A73E8]"></div>
          </>
        )} 

        <button
          onClick={handleSupport}
          className="px-6 py-2.5 bg-white text-[#1A73E8] text-lg font-semibold rounded-lg hover:bg-[#1A73E8] hover:text-white transition-all duration-300 border-2 border-[#1A73E8] shadow-sm"
        >
          Support
        </button>

        <div className="h-10 w-[1px] bg-[#1A73E8]"></div>

        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center hover:bg-gray-400 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-gray-600"
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
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-20">
                {activeRole === "admin" && user && (
                  <div
                    onClick={handleProfileClick}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-800 hover:bg-gray-100 cursor-pointer"
                  >
                    <FaUser className="text-[#1A73E8] text-lg" />
                    <span className="text-lg font-medium">My Profile</span>
                  </div>
                )}
                {user && (
                  <div
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-800 hover:bg-gray-100 cursor-pointer"
                  >
                    <FaSignOutAlt className="text-red-500 text-lg" />
                    <span className="text-lg font-medium">Logout</span>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="px-6 py-2.5 bg-white text-[#1A73E8] text-lg font-semibold rounded-lg hover:bg-[#1A73E8] hover:text-white transition-all duration-300 border-2 border-[#1A73E8] shadow-sm"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="px-6 py-2.5 bg-white text-[#1A73E8] text-lg font-semibold rounded-lg hover:bg-[#1A73E8] hover:text-white transition-all duration-300 border-2 border-[#1A73E8] shadow-sm"
            >
              Sign Up
            </Link>
          </div>
        )}
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
