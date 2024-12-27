import React from "react";

const UserDetailsContent = ({ user }) => {
  return (
    <div className="flex flex-col w-[80%] font-outfit p-4 mx-auto">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center p-4 bg-white rounded-lg shadow-sm">
        {/* User Image - Responsive sizing */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center shrink-0">
          {user.imageUrl ? (
            <img
              src={user.imageUrl}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xl sm:text-2xl lg:text-4xl text-gray-400">
              {user.name?.charAt(0)?.toUpperCase()}
            </span>
          )}
        </div>

        {/* User Info - Responsive text */}
        <div className="flex-1 w-full text-center sm:text-left space-y-3">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
            {user.name}
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm sm:text-base text-gray-600">
                {user.email}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="text-sm sm:text-base text-gray-600">
                {user.phone || "Not provided"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-sm sm:text-base text-gray-600">
                {user.address || "Not provided"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-sm">
        <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4">
          Additional Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <p className="text-xs sm:text-sm text-gray-500">Member Since</p>
            <p className="text-sm sm:text-base text-gray-700">
              {new Date().toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-xs sm:text-sm text-gray-500">Status</p>
            <p className="text-sm sm:text-base text-green-600 font-medium">
              Active
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsContent;
