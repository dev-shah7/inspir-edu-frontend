import React, { useState } from "react";
import useModalStore from "../store/useModalStore";
import CourseCongratulations from "../congratulations/CourseCongratulations";

const InviteUsersContent = () => {
  const { closeModal, queueModal } = useModalStore();
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState([]);

  const handleAddEmail = () => {
    if (email.trim() && !emails.includes(email)) {
      setEmails([...emails, email.trim()]);
      setEmail("");
    }
  };

  const handleInviteUsers = () => {
    // Logic to invite users with the emails
    queueModal("Congratulations!", <CourseCongratulations />);
    closeModal();
  };

  return (
    <div className="p-6 ">
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block text-lg font-medium text-gray-600 mb-2"
        >
          Enter User Emails
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
        />
      </div>
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={handleAddEmail}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300 transition"
        >
          Add Email
        </button>
        <button
          onClick={handleInviteUsers}
          className="px-6 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 focus:ring focus:ring-green-300 transition"
        >
          Invite Users
        </button>
      </div>
      {emails.length > 0 && (
        <div className="mt-4">
          <h3 className="text-md font-medium text-gray-700 mb-2">
            Added Emails:
          </h3>
          <ul className="list-disc list-inside text-gray-600">
            {emails.map((email, index) => (
              <li key={index}>{email}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InviteUsersContent;
