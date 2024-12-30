import React from "react";

const CourseInstructions = ({ title = "Instructions", text }) => {
  return (
    <div className="p-6 rounded-lg text-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-3xl">{title}</h2>
      <p className="text-gray-700 text-md">
        {text ? text : "No instructions provided."}
      </p>
    </div>
  );
};

export default CourseInstructions;
