import PropTypes from "prop-types";

const InputField = ({
  label = "",
  placeholder = "",
  type = "text",
  required = false,
  value,
  name,
  onChange,
  onBlur,
  icon: Icon = null, // Optional Icon component
}) => {
  return (
    <div className="relative">
      {/* Label */}
      {label && (
        <label
          className="block text-gray-700 font-medium mb-1"
          htmlFor={label.replace(/\s+/g, "").toLowerCase()}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Input Field */}
      <div className="relative flex items-center">
        <input
          id={label.replace(/\s+/g, "").toLowerCase()}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="w-full p-3 pl-4 pr-10 rounded-lg border border-gray-300 bg-white shadow focus:outline-none focus:ring-2 focus:ring-button-blue"
        />

        {/* Optional Icon */}
        {Icon && (
          <span className="absolute right-3 top-3 text-gray-400">
            <Icon size={20} />
          </span>
        )}
      </div>
    </div>
  );
};

// PropTypes for props validation
InputField.propTypes = {
  label: PropTypes.string, // Label must be a string
  placeholder: PropTypes.string, // Placeholder text must be a string
  name: PropTypes.string, // Name must be a string
  type: PropTypes.oneOf(["text", "email", "password", "number"]), // Type must be a valid input type
  required: PropTypes.bool, // Required flag must be a boolean
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Value can be a string or number
  onChange: PropTypes.func.isRequired, // onChange handler must be a function
  onBlur: PropTypes.func, // onBlur handler must be a function
  icon: PropTypes.elementType, // Icon must be a valid React component
};

export default InputField;
