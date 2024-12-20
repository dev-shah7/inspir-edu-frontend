import React from "react";
import { useNavigate } from "react-router";
import Table from "../common/Table/Table";
import CustomButton from "../../components/common/CustomButton/CustomButton";
import { dummyCourses } from "../../static/data";
import useModalStore from "../store/useModalStore";
import CreateCourseContent from "./CreateCourseContent";

const Courses = () => {
  const { openModal } = useModalStore();
  const navigate = useNavigate();

  const handleCreateCourse = () => {
    openModal("Create Course", <CreateCourseContent />);
  };

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
        <td className="p-4">{course.deadline}</td>
        <td className="p-4">{course.hours}</td>
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
              onClick={() => alert("Button Clicked!")}
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

  return (
    <>
      <div className="flex justify-between items-end">
        <div>
          <h1 className="mt-4 text-3xl font-bold text-gray-800">All Courses</h1>
          <p className="text-md text-gray-600 mt-1">
            Welcome to inspireEDU Dashboard
          </p>
        </div>
        <button
          onClick={handleCreateCourse}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring focus:ring-blue-300 transition"
        >
          Create Course
        </button>
      </div>
      <div className="mt-4 h-0.5 bg-gradient-to-r from-custom-div-blue to-transparent"></div>
      <Table headers={headers} data={dummyCourses} renderRow={renderRow} />
    </>
  );
};

export default Courses;
