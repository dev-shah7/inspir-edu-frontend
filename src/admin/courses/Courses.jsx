import React from "react";
import CustomButton from "../../components/common/CustomButton/CustomButton";

const dummyCourses = [
  {
    id: 1,
    name: "Demo Course 01",
    deadline: "Yes",
    hours: 48,
  },
  {
    id: 2,
    name: "Demo Course 01",
    deadline: "Yes",
    hours: 48,
  },
];

const Courses = () => {
  return (
    <div className="bg-white min-h-screen p-8">
      <h1 className="mt-4 text-3xl font-bold text-gray-800">All Courses</h1>
      <p className="text-lg text-gray-600 mt-1">Welcome to inspireEDU Dashboard</p>
      <div className="mt-4 h-0.5 bg-gradient-to-r from-custom-div-blue to-transparent"></div>
      <div className="overflow-x-auto mt-8">
        <table className="min-w-full text-md">
          <thead className="text-gray-800">
            <tr>
              <th className="p-4 text-left font-outfit text-lg">Course Name</th>
              <th className="p-4 text-left font-outfit text-lg">Deadline</th>
              <th className="p-4 text-left font-outfit text-lg">Deadline hours</th>
              <th className="p-4 text-center font-outfit text-lg">View/Add Module</th>
              <th className="p-4 text-center font-outfit text-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {dummyCourses.map((course ) => (
                <React.Fragment key={course.id}>
                    <tr key={course.id} className="hover:bg-gray-50 transition">
                        <td className="p-4">{course.name}</td>
                        <td className="p-4">{course.deadline}</td>
                        <td className="p-4">{course.hours}</td>
                        <td className="p-4 text-center">
                        <div className="flex gap-2 justify-center">
                            <CustomButton text="View Content" className="w-auto bg-green-800 hover:bg-green-700" onClick={() => alert("Button Clicked!")} />
                            <CustomButton text="View Users" className="w-auto bg-blue-900 hover:bg-blue-800" onClick={() => alert("Button Clicked!")} />
                        </div>
                        </td>
                        <td className="p-4 border-b text-center">
                        <div className="flex gap-2 justify-center">
                            <CustomButton text="Edit" className="w-auto bg-black hover:bg-gray-600" onClick={() => alert("Button Clicked!")} />
                            <CustomButton
                            text="Invite Users"
                            className="w-auto bg-yellow-600 hover:bg-yellow-500"
                            onClick={() => alert("Button Clicked!")}
                            />
                            <CustomButton text="Delete" className="w-auto bg-red-600 hover:bg-red-500" onClick={() => alert("Button Clicked!")} />
                        </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="5">
                        <div className="h-0.5 bg-gradient-to-r from-custom-border-blue to-transparent"></div>
                        </td>
                    </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Courses;