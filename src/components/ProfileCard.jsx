import React from "react";
import { LuLinkedin, LuYoutube, LuTwitter } from "react-icons/lu";
import { FiEdit } from "react-icons/fi";

const ProfileCard = () => {
  const inputFields = [
    { type: "text", placeholder: "Institution name" },
    { type: "password", placeholder: "Change Password" },
    { type: "email", placeholder: "Email" },
    { type: "tel", placeholder: "Phone Number" },
    { type: "text", placeholder: "Address" },
  ];

  const cityStateInputs = [
    { type: "text", placeholder: "City" },
    { type: "text", placeholder: "State" },
  ];

  const socialAccounts = [
    { platform: "LinkedIn", icon: <LuLinkedin className="text-black text-2xl" /> },
    { platform: "Twitter", icon: <LuTwitter className="text-black text-2xl" /> },
    { platform: "YouTube", icon: <LuYoutube className="text-black text-2xl" /> },
  ];

  const experienceData = [
    {
      role: "Associate Professor",
      period: "May 2024 - Present",
      duration: "7 mos",
      type: "On-site",
    },
    {
      role: "Senior Lecturer",
      period: "Jan 2024 - Jun 2024",
      duration: "6 mos",
    },
  ];

  const educationData = [
    {
      institution: "Griffith University",
      degree: "Graduate Certificate in Higher Education",
      year: "2017 - 2017",
    },
    {
      institution: "Griffith University",
      degree: "Doctor of Philosophy (PhD), Financial Literacy Education",
      year: "2016 - 2016",
    },
  ];

  const renderInput = (field, className = "") => (
    <div className="relative">
      <input
        type={field.type}
        placeholder={field.placeholder}
        className={`p-2 pr-10 border rounded-lg bg-custom-text-area text-gray-900 w-full placeholder-gray-900 placeholder-font-normal ${className}`}
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
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-blue-500"
          />
          <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600">
            <FiEdit />
          </button>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mt-4">Md. Ashaduzzaman</h1>
        <p className="text-md text-gray-600 mt-1">
          Associate Professor | Financial Education Specialist
        </p>
      </div>

      <div className="h-0.5 bg-custom-border-blue mt-4"></div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        {inputFields.map((field, index) => (
          <div key={index}>{renderInput(field)}</div>
        ))}

        <div className="flex gap-4">
          {cityStateInputs.map((field, index) => (
            <div key={index} className="flex-1">
              {renderInput(field)}
            </div>
          ))}
        </div>

        <div className="col-span-2 relative">
          <textarea
            placeholder="About"
            className="p-2 pr-10 border rounded-lg bg-custom-text-area text-gray-700 h-24 placeholder-gray-900 font-normal w-full"
          />
          <button className="absolute right-2 bottom-4 text-gray-600 hover:text-blue-500">
            <FiEdit size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-custom-text-area p-4 rounded-lg shadow-sm relative">
          <h2 className="text-lg font-semibold text-gray-800">Experience</h2>
          {experienceData.map((exp, index) => (
            <p key={index} className="text-sm text-gray-600 mt-2">
              <strong>{exp.role}</strong> <br />
              {exp.period} | {exp.duration} {exp.type && `| ${exp.type}`}
            </p>
          ))}
          <button className="absolute bottom-2 right-2 text-gray-600 hover:text-blue-500">
            <FiEdit size={18} />
          </button>
        </div>

        <div className="bg-custom-text-area p-4 rounded-lg shadow-sm relative">
          <h2 className="text-lg font-semibold text-gray-800">Education</h2>
          {educationData.map((edu, index) => (
            <p key={index} className="text-sm text-gray-600 mt-2">
              <strong>{edu.institution}</strong> <br />
              {edu.degree} | {edu.year}
            </p>
          ))}
          <button className="absolute bottom-2 right-2 text-gray-600 hover:text-blue-500">
            <FiEdit size={18} />
          </button>
        </div>
      </div>

      <div className="mt-6">
        <div className="max-w-3xl w-full mx-auto">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Verified Accounts
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Build trust with your network by verifying your social profiles
          </p>
          <div className="space-y-6 border-t border-gray-300">
            {socialAccounts.map((account, index) => (
              <div
                key={index}
                className={`flex justify-between items-center py-2 px-4 ${
                  index !== socialAccounts.length - 1 ? "border-b border-gray-300 pb-3" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  {account.icon}
                  <span className="text-md text-gray-800">{account.platform}</span>
                </div>
                <button className="px-4 py-1.5 bg-white border-gray-200 border text-sm font-medium text-gray-700 rounded-full shadow hover:bg-gray-200">
                  Add Username
                </button>
              </div>
            ))}
          </div>
          <div className="border-b border-gray-300 mt-3"></div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button className="px-8 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition">
          Update
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
