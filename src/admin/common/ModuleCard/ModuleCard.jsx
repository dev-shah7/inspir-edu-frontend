import React from "react";
import PropTypes from "prop-types";

const ModuleCard = ({ description }) => {
  return (
    <div className="bg-blue-50 py-4 px-8 rounded-xl shadow-md border border-blue-100 w-full">
      <h1 className="text-lg font-outfit text-gray-800 mt-0 mb-2">
           Instructions:
      </h1>
      <p className="text-gray-700 text-base text-justify">{description}</p>
    </div>
  );
};

ModuleCard.propTypes = {
  description: PropTypes.string.isRequired,
};

export default ModuleCard;
