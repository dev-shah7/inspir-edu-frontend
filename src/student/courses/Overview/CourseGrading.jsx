import React from "react";

const CourseGrading = ({ title = "Grading Criteria", passingPercentage }) => {
  return (
    <div className="p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      <p className="text-gray-700 text-md">
        Passing Percentage:{" "}
        {passingPercentage !== undefined
          ? `${passingPercentage}%`
          : "Not specified."}
      </p>
    </div>
  );
};

export default CourseGrading;
