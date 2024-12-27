import React from "react";
import PropTypes from "prop-types";

const ModuleCard = ({ instructions, passingPercentage }) => {
  return (
    <div className="bg-blue-50 py-4 px-8 rounded-xl shadow-md border border-blue-100 w-full">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
        <div className="md:w-8/12">
          <h1 className="text-lg font-outfit text-gray-800 mt-0 mb-2">
            Instructions:
          </h1>
          <p className="text-gray-700 text-base text-justify">{instructions}</p>
        </div>
        <div className="w-1/2 md:w-1/4 bg-white px-4 py-2 rounded-lg shadow-sm border border-blue-200">
          <p className="text-sm text-gray-600">Passing Percentage</p>
          <p className="text-xl font-semibold text-[#1A73E8]">
            {passingPercentage}%
          </p>
        </div>
      </div>
    </div>
  );
};

ModuleCard.propTypes = {
  instructions: PropTypes.string.isRequired,
  passingPercentage: PropTypes.number.isRequired,
};

export default ModuleCard;
