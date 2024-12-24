import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Table from "../common/Table/Table";
import CustomButton from "../../components/common/CustomButton/CustomButton";
import { dummyCourses } from "../../static/data";
import useModalStore from "../store/useModalStore";
import CreateCourseContent from "./CreateCourseContent";
import { courseService } from "../../services/api/courseService";
import Loader from "../../components/common/Loader/Loader";
import useCourseStore from "../store/useCourseStore";

const Courses = () => {
  const { openModal } = useModalStore();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { courses, fetchCourses, isLoading } = useCourseStore();
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleCreateCourse = () => {
    openModal("Create Course", <CreateCourseContent />);
  };

  const handleEditCourse = (courseId) => {
    openModal(
      "Edit Course",
      <CreateCourseContent mode="edit" courseId={courseId} />
    );
  };

  const filteredCourses = useMemo(() => {
    return courses.filter((course) =>
      course?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, courses]);

  const headers = [
    { label: "Course Name", align: "left" },
    { label: "Deadline", align: "left" },
    { label: "Deadline hours", align: "left" },
    { label: "View/Add Module", align: "center" },
    { label: "Action", align: "center" },
  ];

  const renderRow = (course) => (
    <>
      <tr className="hover:bg-gray-50 transition">
        <td className="p-4">{course.name}</td>
        <td className="p-4">{course.isDeadlineBase ? "Yes" : "No"}</td>
        <td className="p-4">{course.defaultDeadlineHrs || "-"}</td>
        <td className="p-4 text-center">
          <div className="flex gap-2 justify-center">
            <CustomButton
              text="View Content"
              className="w-auto bg-green-800 hover:bg-green-700"
              onClick={() => navigate(`/admin/courses/${course.id}/modules`)}
            />
            <CustomButton
              text="View Users"
              className="w-auto bg-blue-950 hover:bg-blue-800"
              onClick={() => alert("Button Clicked!")}
            />
          </div>
        </td>
        <td className="p-4 text-center">
          <div className="flex gap-2 justify-center">
            <CustomButton
              text="Edit"
              className="w-auto bg-black hover:bg-gray-600"
              onClick={() => handleEditCourse(course.id)}
            />
            <CustomButton
              text="Invite Users"
              className="w-auto bg-yellow-600 hover:bg-yellow-500"
              onClick={() => alert("Button Clicked!")}
            />
            <CustomButton
              text="Delete"
              className="w-auto bg-red-600 hover:bg-red-500"
              onClick={() => alert("Button Clicked!")}
            />
          </div>
        </td>
      </tr>
      <tr>
        <td colSpan={headers.length}>
          <div className="h-0.5 bg-gradient-to-r from-custom-border-blue to-transparent"></div>
        </td>
      </tr>
    </>
  );

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12">
      {/* <img
        src={noDataGif}
        alt="No courses found"
        className="w-64 h-64 object-contain mb-4"
      /> */}
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        No Courses Found
      </h3>
      <p className="text-gray-500 text-center max-w-md">
        We couldn&apos;t find any courses matching your search criteria. Try
        adjusting your search or create a new course.
      </p>

      <button
        onClick={handleCreateCourse}
        className="px-6 py-2 mt-6 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring focus:ring-blue-300 transition"
      >
        Create Course
      </button>
    </div>
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-4">
        Error loading courses: {error}
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-end">
        <div>
          <h1 className="mt-4 text-3xl font-bold text-gray-800">All Courses</h1>
          <p className="text-md text-gray-600 mt-1">
            Welcome to inspireEDU Dashboard
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition"
            />
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button
            onClick={handleCreateCourse}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring focus:ring-blue-300 transition"
          >
            Create Course
          </button>
        </div>
      </div>
      <div className="mt-4 h-0.5 bg-gradient-to-r from-custom-div-blue to-transparent"></div>

      {filteredCourses.length > 0 ? (
        <Table headers={headers} data={filteredCourses} renderRow={renderRow} />
      ) : (
        renderEmptyState()
      )}
    </>
  );
};

export default Courses;
