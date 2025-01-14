import AdminBreadCrumb from "./common/AdminBreadcrumb/AdminBreadcrumb";

const MainContent = ({ children }) => {
  return <div className="min-[90vh] p-8">
    <AdminBreadCrumb />
    {children}</div>;
};

export default MainContent;
