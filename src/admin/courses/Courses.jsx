import { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import CustomButton from "../../components/common/CustomButton/CustomButton";
import useModalStore from "../store/useModalStore";
import Table from "../common/Table/Table";
import CreateCourseContent from "./CreateCourseContent";
import useCourseStore from "../store/useCourseStore";
import Loader from "../../components/common/Loader/Loader";
import { toast } from "react-hot-toast";
import { IoIosArrowBack, IoIosArrowForward, IoMdAdd } from "react-icons/io";
import InviteUsersContent from "../users/InviteUsersContent";
import CourseUsersContent from "./CourseUsersContent";
import { usePaymentStatusHandler } from '../../hooks/usePaymentStatusHandler';
import useAuthStore from "../../store/auth/useAuthStore";
import LoginContent from "../../components/Login/LoginContent";

const Courses = () => {
  const navigate = useNavigate();
  const { openModal, queueModal, closeModal } = useModalStore();
  const {
    courses,
    fetchCourses,
    fetchGuestCourseById,
    deleteCourse,
    deleteGuestCourse,
    isLoading,
    setCurrentCourse,
  } = useCourseStore();

  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOperationLoading, setIsOperationLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  usePaymentStatusHandler();

  useEffect(() => {
    const loadCourses = async () => {
      try {
        if (user) {
          await fetchCourses();
        } else {
          const guestCourseId = sessionStorage.getItem('guestCourseId');
          if (guestCourseId) {
            await fetchGuestCourseById(guestCourseId);
          }
        }
      } catch (error) {
        toast.error("Failed to load courses");
      }
    };
    loadCourses();
  }, [fetchCourses, fetchGuestCourseById, user]);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) =>
      course?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, courses]);

  const paginatedCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredCourses.slice(startIndex, endIndex);
  }, [filteredCourses, currentPage]);

  const totalPages = Math.ceil(filteredCourses.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCreateCourse = () => {
    if (!user && courses.length > 0) {
      openModal("Add Email", <LoginContent courseId={sessionStorage.getItem('guestCourseId')} message="Please submit your email first to be able to create another course." />);
      return;
    }
    openModal("Add Course", <CreateCourseContent />);
  };

  const handleEditCourse = (courseId) => {
    if (!user) {
      openModal("Add Email", <LoginContent courseId={sessionStorage.getItem('guestCourseId')} message="Please submit your email first to be able to edit courses." />);
      return;
    }
    openModal(
      "Edit Course",
      <CreateCourseContent mode="edit" courseId={courseId} />
    );
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        setIsOperationLoading(true);
        if (user) {
          await deleteCourse(courseId);
        } else {
          // await deleteGuestCourse(courseId);
          // sessionStorage.removeItem('guestCourseId');
          openModal("Add Email", <LoginContent courseId={sessionStorage.getItem('guestCourseId')} message="Please submit your email first to be able to delete courses." />);
          return;
        }
        toast.success("Course deleted successfully");
      } catch (error) {
        toast.error("Failed to delete course");
      } finally {
        setIsOperationLoading(false);
      }
    }
  };

  const handleInviteUsers = (courseId) => {
    if (!user) {
      toast.error("This feature is only available for registered users");
      queueModal("Add Email", <LoginContent courseId={courseId} />);
      closeModal();
      return;
    }
    queueModal("Invite Users", <InviteUsersContent courseId={courseId} />);
    closeModal();
  };

  const handleViewContent = (courseId) => {
    setCurrentCourse(courseId);
    navigate(`/admin/courses/${courseId}/modules`);
  };

  const handleViewUsers = (courseId) => {
    if (!user) {
      toast.error("This feature is only available for registered users");
      return;
    }
    openModal("Course Users", <CourseUsersContent courseId={courseId} />);
  };

  const headers = [
    { label: "Course Name", align: "left" },
    { label: "Deadline", align: "left" },
    { label: "Deadline hours", align: "left" },
    { label: "View/Add Module", align: "center" },
    { label: "Action", align: "center" },
  ];

  const renderRow = (index, course) => (
    <>
      <tr className="hover:bg-gray-50 transition">
        <td className="py-3 px-2 md:px-4">{course.name}</td>
        <td className="py-3 px-2 md:px-4">
          {course.isDeadlineBase ? "Yes" : "No"}
        </td>
        <td className="py-3 px-2 md:px-4">
          {course.defaultDeadlineHrs || "-"}
        </td>
        <td className="py-3 px-2 md:px-4 text-center">
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <CustomButton
              text="View Content"
              className="w-full sm:w-auto text-sm bg-green-800 hover:bg-green-700"
              onClick={() => handleViewContent(course.id)}
            />
            <CustomButton
              text="View Users"
              className="w-full sm:w-auto text-sm bg-blue-950 hover:bg-blue-800"
              onClick={() => handleViewUsers(course.id)}
            />
          </div>
        </td>
        <td className="py-2 px-2 md:px-4 text-center">
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <CustomButton
              text="Edit"
              className="w-full sm:w-auto text-sm bg-black hover:bg-gray-600"
              onClick={() => handleEditCourse(course.id)}
            />
            <CustomButton
              text="Invite Users"
              className="w-full sm:w-auto text-sm bg-yellow-600 hover:bg-yellow-500"
              onClick={() => handleInviteUsers(course.id)}
            />
            <CustomButton
              text="Delete"
              className="w-full sm:w-auto text-sm bg-red-600 hover:bg-red-500"
              onClick={() => handleDeleteCourse(course.id)}
            />
          </div>
        </td>
      </tr>
      {paginatedCourses.indexOf(course) !== paginatedCourses.length - 1 && (
        <tr>
          <td colSpan={headers.length}>
            <div className="h-0.5 bg-custom-border-blue"></div>
          </td>
        </tr>
      )}
    </>
  );

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        No Courses Found
      </h3>
      <p className="text-gray-500 text-center max-w-md">
        We couldn&apos;t find any courses matching your search criteria. Try
        adjusting your search or create a new course.
      </p>

      <button
        onClick={handleCreateCourse}
        className="px-6 py-2 mt-6 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring focus:ring-blue-300 transition flex items-center gap-1"
      >
        <IoMdAdd className="text-xl" /> Create Course
      </button>
    </div>
  );

  if (isLoading && courses.length === 0) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-120px)] px-4 md:px-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-6">
        <div className="flex-1">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
            All Courses
          </h1>
          <p className="text-md md:text-md text-gray-600 mt-1">
            Welcome to inspireEDU Dashboard
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="relative flex-grow sm:flex-grow-0">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition"
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
            className="w-full sm:w-auto px-4 py-2 bg-custom-button-green hover:bg-green-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring focus:ring-green-700 transition flex items-center gap-1 justify-center"
          >
            <IoMdAdd className="text-md" /> Create Course
          </button>
        </div>
      </div>
      <div className="h-0.5 bg-custom-border-blue mb-1"></div>

      <div className="flex-1 overflow-x-auto">
        {filteredCourses.length > 0 ? (
          <div className="min-w-full">
            <Table
              headers={headers}
              data={paginatedCourses}
              renderRow={renderRow}
            />
          </div>
        ) : (
          renderEmptyState()
        )}
      </div>

      {/* Updated Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center py-4 border-t-2 border-custom-border-blue mt-4 gap-4">
        <div className="text-sm md:text-base text-gray-600">
          Rows per page: {rowsPerPage}
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`text-sm md:text-base text-blue-500 font-medium ${currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "hover:text-blue-700"
              }`}
          >
            <IoIosArrowBack size={20} />
          </button>
          <span className="text-sm md:text-base text-gray-600 font-medium">
            {currentPage}-{totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`text-sm md:text-base text-blue-500 font-medium ${currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "hover:text-blue-700"
              }`}
          >
            <IoIosArrowForward size={20} />
          </button>
        </div>
      </div>

      {isOperationLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  );
};

export default Courses;
