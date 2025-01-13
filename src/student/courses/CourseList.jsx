import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Course from "./Course";
import useCourseStore from "../store/useCourseStore";
import Loader from "../../components/common/Loader/Loader";

const CourseList = () => {
  const location = useLocation();
  const { courses, fetchStudentCourses, fetchEnrolledCourses, isLoading, clearCurrentCourse, clearSubmissionResult } =
    useCourseStore();

  useEffect(() => {
    clearCurrentCourse();
    clearSubmissionResult();
    if (location.pathname.includes("myCourses")) {
      fetchEnrolledCourses();
    } else {
      fetchStudentCourses();
    }
  }, [location.pathname, fetchStudentCourses, fetchEnrolledCourses]);

  const headingText = location.pathname.includes("myCourses") ? "My Courses" : "All Courses";

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="p-6">
      <h1 className="font-outfit text-xl text-gray-800 mb-6">{headingText}</h1>
      {isLoading ? (
        <Loader />
      ) : courses.length > 0 ? (
        courses.map((item) => (
          <Course
            key={item.courseId}
            course={item.course}
            status={item.status}
          />
        ))
      ) : (
        <p>No courses available.</p>
      )}
    </div>
  );
};

export default CourseList;
