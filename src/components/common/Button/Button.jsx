import PropTypes from "prop-types";

const Button = ({
  text = "Button", // Default button text
  icon: Icon = null, // Optional icon component
  onClick, // Event handler
  className = "", // Additional Tailwind classes
  disabled = false, // Disabled state
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3 px-6 bg-button-blue text-white font-semibold rounded-full shadow-md 
      hover:bg-blue-700 flex items-center justify-center transition-all duration-300
      disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {text}
      {Icon && <Icon className="ml-2" size={20} />} {/* Optional Icon */}
    </button>
  );
};

// PropTypes for props validation
Button.propTypes = {
  text: PropTypes.string, // Ensures text is a string
  icon: PropTypes.elementType, // Ensures icon is a valid React component
  onClick: PropTypes.func, // Ensures onClick is a function
  className: PropTypes.string, // Ensures className is a string
  disabled: PropTypes.bool, // Ensures disabled is a boolean
};

export default Button;
