import { useState } from "react";
import Sidebar from "../common/Sidebar/Sidebar";
import Header from "../common/Header/Header";
import PropTypes from "prop-types";
import { Outlet } from "react-router";
import Modal from "../../admin/common/Modal/Modal";

const Layout = ({ userRole }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="h-screen flex flex-col bg-gray-100">
        <Header
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
          userRole={userRole}
        />

        <div className="relative flex flex-1 overflow-hidden">
          <aside
            className={`${
              isSidebarOpen
                ? "absolute z-10 inset-y-0 left-0 w-64 transform translate-x-0 transition-transform"
                : "absolute z-10 inset-y-0 left-0 w-64 transform -translate-x-full transition-transform"
            } md:relative md:translate-x-0`}
          >
            <Sidebar isSidebarOpen={isSidebarOpen} userRole={userRole} />
          </aside>

          <main
            className={`flex-1 overflow-y-auto px-6 ${
              isSidebarOpen ? "md:ml-64" : ""
            }`}
          >
            <Outlet />
          </main>
        </div>
      </div>
      <Modal />
    </>
  );
};

Layout.propTypes = {
  userRole: PropTypes.string.isRequired,
};

export default Layout;
