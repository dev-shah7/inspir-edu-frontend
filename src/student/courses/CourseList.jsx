import React from "react";
import Course from "./Course";
const courses = [
  {
    id: 1,
    name: "Course 1",
    description: "Need more time to complete this course? Push your estimated end date to 30/06/2025 and achieve your goal.",
    status: "In Progress",
    batch: "Batch 01",
    endDate: "30/06/2025",
    image: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    name: "Course 2",
    description: "Need more time to complete this course? Push your estimated end date to 30/06/2025 and achieve your goal.",
    status: "In Progress",
    batch: "Batch 01",
    endDate: "30/06/2025",
    image: "https://via.placeholder.com/150"
  },
  {
    id: 3,
    name: "Course 3",
    description: "Need more time to complete this course? Push your estimated end date to 30/06/2025 and achieve your goal.",
    status: "In Progress",
    batch: "Batch 01",
    endDate: "30/06/2025",
    image: "https://via.placeholder.com/150"
  }
];

const CourseList = () => {
  return (
    <div className="p-6">
      <h1 className="font-outfit text-xl text-gray-800 mb-6">My Courses</h1>
      {courses.map((course) => (
        <Course
          key={course.id}
          course={course}
        />
      ))}
    </div>
  );
};

export default CourseList;
