import PropTypes from "prop-types";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import eye icons

const InputField = ({
  label = "",
  placeholder = "",
  type = "text",
  required = false,
  value,
  name,
  onChange,
  onBlur,
  icon: Icon = null,
  disabled = false,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Determine if this is a password field
  const isPassword = type === "password";

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
          type={isPassword ? (showPassword ? "text" : "password") : type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          className={`w-full p-3 pl-4 ${
            Icon || isPassword ? "pr-12" : "pr-4"
          } rounded-lg border border-gray-300 bg-white shadow focus:outline-none focus:ring-2 focus:ring-button-blue ${
            error ? "border-red-500" : ""
          }`}
        />

        {/* Icon positioning */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center">
          {/* Regular icon (if not password field) */}
          {Icon && !isPassword && (
            <span className="px-3 text-gray-400">
              <Icon size={20} />
            </span>
          )}

          {/* Password field icons */}
          {isPassword && (
            <>
              {Icon && (
                <span className="px-3 text-gray-400">
                  <Icon size={20} />
                </span>
              )}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="px-3 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? (
                  <FiEyeOff size={20} />
                ) : (
                  <FiEye size={20} />
                )}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

// PropTypes for props validation
InputField.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.oneOf(["text", "email", "password", "number", "tel"]),
  required: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  icon: PropTypes.elementType,
  disabled: PropTypes.bool,
  error: PropTypes.string,
};

export default InputField;
