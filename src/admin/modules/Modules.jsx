import React from "react";
import CustomButton from "../../components/common/CustomButton/CustomButton";
import ModuleCard from "../common/ModuleCard/ModuleCard";

const dummyModules = [
  {
    id: 1,
    name: "Demo Module 01",
    type: "PDF",
    description: "Module1",
  },
  {
    id: 2,
    name: "Demo Module 01",
    type: "Video",
    description: "Module2",
  },
];

const Modules = () => {
  return (
    <>
      <p className="text-lg text-gray-600 mb-8">Courses / Modules</p>
      <div className="flex justify-between items-center relative">
        <div>
          <h1 className="text-3xl font-outfit text-gray-800">All Modules</h1>
        </div>
        <div className="absolute right-20">
          <p className="text-lg font-outfit text-gray-800">
            Passing Percentage: 75%
          </p>
        </div>
      </div>
      <div className="mt-4 h-0.5 bg-gradient-to-r from-custom-div-blue to-transparent"></div>
      <div className="w-full mt-8">
        <ModuleCard description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." />
      </div>
      <div className="overflow-x-auto mt-8">
        <table className="min-w-full text-md">
          <thead className="text-gray-800">
            <tr>
              <th className="p-4 text-left font-outfit text-lg">Module Name</th>
              <th className="p-4 text-left font-outfit text-lg">Module Type</th>
              <th className="p-4 text-center font-outfit text-lg">
                View/Add Question
              </th>
              <th className="p-4 text-center font-outfit text-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {dummyModules.map((module) => (
              <React.Fragment key={module.id}>
                <tr className="hover:bg-gray-50 transition">
                  <td className="p-4">{module.name}</td>
                  <td className="p-4">{module.type}</td>
                  <td className="p-4 text-center">
                    <div className="flex gap-2 justify-center">
                      <CustomButton
                        text="View Questions"
                        className="w-auto bg-green-800 hover:bg-green-700"
                        onClick={() => alert("Button Clicked!")}
                      />
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex gap-2 justify-center">
                      <CustomButton
                        text="Edit"
                        className="w-auto bg-blue-900 hover:bg-gray-600"
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
                  <td colSpan="5">
                    <div className="h-0.5 bg-gradient-to-r from-custom-border-blue to-transparent"></div>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Modules;
