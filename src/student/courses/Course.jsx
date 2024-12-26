import { useNavigate } from "react-router";
import CourseImage from "../assets/course-image.png";

const Course = ({ course }) => {
  const navigate = useNavigate();
  return (
    <div className="relative flex flex-col md:flex-row my-6 bg-card-blue-gradient shadow-md border border-custom-border-blue rounded-lg w-full max-w-2xl" onClick={() => navigate(`/student/courses/${course.id}/overview`)}>
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
        <div className="flex flex-wrap gap-x-3 gap-y-2">
          <div className="rounded-full bg-button-green py-1 px-3 text-xs sm:text-sm text-white font-medium shadow-md">
            {course.status}
          </div>
          <div className="rounded-full bg-form-bg py-1 px-3 text-xs sm:text-sm text-gray-800 font-medium shadow-md">
            {course.batch}
          </div>
          <div className="rounded-full bg-gray-300 py-1 px-3 text-xs sm:text-sm text-gray-700 font-medium shadow-md">
            Completed
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
