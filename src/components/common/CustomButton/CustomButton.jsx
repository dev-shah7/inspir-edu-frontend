import React from "react";
import PropTypes from "prop-types";

const CustomButton = ({
  text = "Button",
  onClick,
  className = "",
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`py-2 px-5 text-white text-sm font-bold rounded-lg shadow-lg
        shadow-gray-400 hover:shadow-xl transition-shadow duration-300  
       flex items-center justify-center transition-all duration-300 disabled:opacity-50 
        disabled:cursor-not-allowed ${className}`}
    >
      {text}
    </button>
  );
};

CustomButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default CustomButton;
