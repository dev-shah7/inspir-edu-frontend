import { useNavigate } from "react-router";
import CourseImage from "../assets/course-image.png";
import { CourseType, UserCourseStatus } from "../../helpers/enums";
import Button from "../../components/common/Button/Button";
import toast from "react-hot-toast";
import useCourseStore from "../store/useCourseStore";
import ConfirmationDialog from "../../components/common/ConfirmationDialog/DialogBox";
import { useState } from "react";

const Course = ({ course, status }) => {
  const navigate = useNavigate();
  const { enrollCourse } = useCourseStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  const handleEnroll = async (e) => {
    e.stopPropagation();
    try {
      await enrollCourse(course);
      toast.success("Course is enrolled successfully");
      navigate(`/student/courses/${course.id}/overview`);

    } catch (error) {
      console.error("Failed to enroll in course:", error);
      toast.error("Failed to enroll in course. Please try again.");
    } finally {
      setIsDialogOpen(false);
    }
  };

  const handleResume = (e) => {
    e.stopPropagation();
    navigate(`/student/courses/${course.id}/overview`);
  };

  const handleView = (e) => {
    e.stopPropagation();
    navigate(`/student/courses/${course.id}/overview`);
  };

  const renderButton = () => {
    switch (status) {
      case 0:
        return (
          <Button
            text="Enroll Course"
            onClick={() => setIsDialogOpen(true)}
          />
        );
      case 1:
        return (
          <Button
            text="Resume"
            onClick={handleResume}
          />
        );
      case 2:
      case 3:
        return (
          <Button
            text="View"
            onClick={handleView}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div
        className="relative flex flex-col md:flex-row my-6 bg-card-blue-gradient shadow-md border border-custom-border-blue rounded-lg w-full max-w-2xl"
      >
        <div className="relative p-2.5 md:w-2/5 shrink-0 overflow-hidden">
          <img
            src={CourseImage}
            alt="card-image"
            className="h-52 w-full md:w-80 rounded-md md:rounded-lg object-cover"
          />
        </div>

        <div className="p-6 flex flex-col justify-between">
          <h4 className="mb-2 text-white text-xl font-bold">{course.name}</h4>
          <p className="mb-6 text-black text-sm leading-relaxed font-light">
            {course.description}
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-2 mb-4">
            <div className="rounded-full bg-button-green py-1 px-3 text-xs sm:text-sm text-white font-medium shadow-md">
              {UserCourseStatus[status]}
            </div>
            <div className="rounded-full bg-yellow-100 py-1 px-3 text-xs sm:text-sm text-gray-700 font-medium shadow-md">
              {CourseType[course.type]} Type
            </div>
            <div
              className={`rounded-full py-1 px-3 text-xs sm:text-sm text-white font-medium shadow-md ${course.isDeadlineBase ? "bg-red-500" : "bg-gray-400"
                }`}
            >
              {course.isDeadlineBase ? "Deadline-Based" : "No Deadline"}
            </div>
          </div>
          {renderButton()}
        </div>
      </div>
      <ConfirmationDialog
        isOpen={isDialogOpen}
        title="Enroll Course"
        message="Note: Enrolling the Course will start the Deadline."
        onConfirm={handleEnroll}
        onCancel={handleCancel}
      />
    </>
  );
};

export default Course;
