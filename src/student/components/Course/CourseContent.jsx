import CourseBreadCrumb from "./CourseBreadCrumb";
import CourseNav from "./CourseNav";


const CourseContent = ({ children, showNav = true }) => {
    return (
        <>
            <CourseBreadCrumb />
            {showNav && <CourseNav />}
            {children}
        </>
    )
}

export default CourseContent;