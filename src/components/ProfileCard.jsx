import React, { useEffect } from "react";
import { LuLinkedin, LuYoutube, LuTwitter } from "react-icons/lu";
import { FiEdit } from "react-icons/fi";
import useAuthStore from "../store/auth/useAuthStore";
import { FaUserCircle } from "react-icons/fa";

const ProfileCard = () => {
  const user = useAuthStore((state) => state.user);
  const companyDetails = useAuthStore((state) => state.companyDetails);
  const updateCompanyDetails = useAuthStore(
    (state) => state.updateCompanyDetails
  );

  // Refresh company details if needed
  useEffect(() => {
    if (user?.companyId && !companyDetails) {
      updateCompanyDetails(user.companyId).catch(console.error);
    }
  }, [user?.companyId, companyDetails, updateCompanyDetails]);

  const inputFields = [
    {
      type: "text",
      placeholder: "Institution name",
      value: companyDetails?.name || "",
      readOnly: true,
    },
    {
      type: "email",
      placeholder: "Email",
      value: user?.email || "",
      readOnly: true,
    },
    {
      type: "tel",
      placeholder: "Phone Number",
      value: user?.phoneNumber || "",
      readOnly: true,
    },
    {
      type: "text",
      placeholder: "Address",
      value: companyDetails?.address || "",
      readOnly: true,
    },
  ];

  const socialAccounts = [
    {
      platform: "LinkedIn",
      icon: <LuLinkedin className="text-black text-2xl" />,
      link: companyDetails?.linkedIn || "#",
    },
    {
      platform: "Twitter",
      icon: <LuTwitter className="text-black text-2xl" />,
      link: companyDetails?.twitter || "#",
    },
    {
      platform: "YouTube",
      icon: <LuYoutube className="text-black text-2xl" />,
      link: companyDetails?.youtube || "#",
    },
  ];

  const renderInput = (field, className = "") => (
    <div className="relative">
      <input
        type={field.type}
        placeholder={field.placeholder}
        value={field.value}
        readOnly={field.readOnly}
        className={`p-2 pr-10 border rounded-lg bg-custom-text-area text-gray-900 w-full placeholder-gray-900 placeholder-font-normal ${
          field.readOnly ? "cursor-not-allowed opacity-70" : ""
        } ${className}`}
      />
      <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-blue-500">
        <FiEdit size={18} />
      </button>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
      <div className="flex flex-col items-center">
        <div className="relative">
          {companyDetails?.logo ? (
            <img
              src={companyDetails.logo}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full border-4 border-blue-500 flex items-center justify-center bg-gray-100">
              <FaUserCircle className="w-20 h-20 text-gray-400" />
            </div>
          )}
          <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600">
            <FiEdit />
          </button>
        </div>

        <div className="text-center mt-4 space-y-2">
          <h1 className="text-2xl font-bold text-gray-800">
            {user?.name || ""}
          </h1>
          <div className="flex flex-col items-center space-y-1">
            <span className="text-lg font-medium text-[#1A73E8]">
              {user?.roles?.join(", ") || ""}
            </span>
            <span className="text-sm text-gray-600">
              at {companyDetails?.name || ""}
            </span>
          </div>
        </div>

        <div className="h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent w-full mt-6"></div>

        <div className="grid grid-cols-2 gap-6 mt-8 w-full">
          {inputFields.map((field, index) => (
            <div key={index} className="space-y-1">
              <label className="text-sm font-medium text-gray-600">
                {field.placeholder}
              </label>
              {renderInput(field)}
            </div>
          ))}
        </div>

        {/* Social Media Links */}
        <div className="mt-8 space-y-2">
          <h3 className="text-lg font-medium text-gray-700 text-center">
            Connect With Us
          </h3>
          <div className="flex justify-center space-x-6">
            {socialAccounts.map((account, index) => (
              <a
                key={index}
                href={account.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 hover:bg-blue-50 rounded-full transition-colors group"
              >
                {React.cloneElement(account.icon, {
                  className:
                    "text-gray-600 group-hover:text-[#1A73E8] transition-colors text-2xl",
                })}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button className="px-8 py-3 bg-[#1A73E8] text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all transform hover:scale-105 shadow-md">
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
