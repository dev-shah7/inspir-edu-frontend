import Logo from "../../../assets/Logo-Blue.png";
import PropTypes from "prop-types";

const Header = ({ isSidebarOpen, setSidebarOpen, userRole }) => {
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
    </header>
  );
};

Header.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  setSidebarOpen: PropTypes.func.isRequired,
  userRole: PropTypes.string.isRequired,
};

export default Header;
