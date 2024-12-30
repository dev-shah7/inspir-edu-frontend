import { Link, useLocation, useParams } from "react-router-dom";

const CourseBreadCrumb = () => {
  const location = useLocation();
  const { courseId, moduleId } = useParams();

  const breadcrumbMap = {
    "/student/courses": "My Courses",
    [`/student/courses/${courseId}/overview`]: "Course Overview",
    [`/student/courses/${courseId}/modules`]: "Modules",
    // [`/student/modules/${moduleId}/questions`]: "Quiz Test",
  };

  const pathSegments = location.pathname.split("/").filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
    return { path, label: breadcrumbMap[path] };
  });

  return (
    <nav className="text-gray-500 text-sm font-medium mb-6 mt-4 mx-4">
      <ul className="flex items-center space-x-2">
        {breadcrumbs.map((breadcrumb, idx) => (
          <li key={idx} className="flex items-center">
            {breadcrumb.label ? (
              idx === breadcrumbs.length - 1 ? (
                // Current page (last breadcrumb)
                <span className="text-black font-semibold">
                  {breadcrumb.label}
                </span>
              ) : (
                // Link to previous pages
                <>
                  <Link to={breadcrumb.path} className="hover:underline">
                    {breadcrumb.label}
                  </Link>
                  <span className="mx-2">/</span>
                </>
              )
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CourseBreadCrumb;
