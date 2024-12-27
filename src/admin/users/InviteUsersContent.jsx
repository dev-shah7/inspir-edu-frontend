import React, { useState } from "react";
import useModalStore from "../store/useModalStore";
import CourseCongratulations from "../congratulations/CourseCongratulations";
import { toast } from "react-hot-toast";
import api from "../../services/api/axios";
import { sendInvitationEmail } from "../../services/emailjs/emailService";
import { getCourseById } from "../../services/api/courseService";
import useCourseStore from "../store/useCourseStore";

const InviteUsersContent = ({ courseId }) => {
  const { closeModal, queueModal } = useModalStore();
  const { currentCourse } = useCourseStore();
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log("Current Course:", currentCourse);
  // Use courseId prop if provided, otherwise use currentCourse.id
  const effectiveCourseId = courseId || currentCourse;

  const handleAddEmail = () => {
    if (email.trim() && !emails.includes(email)) {
      setEmails([...emails, email.trim()]);
      setEmail("");
    }
  };

  const handleInviteUsers = async () => {
    if (emails.length === 0) {
      toast.error("Please add at least one email");
      return;
    }

    setIsLoading(true);

    try {
      const { data: courseDetails } = await getCourseById(effectiveCourseId);

      // Process each email
      for (const email of emails) {
        const inviteData = {
          email,
          userRole: effectiveCourseId ? 3 : 1, // 3 for student, 1 for admin
          ...(effectiveCourseId && { courseId: effectiveCourseId }), // Use effectiveCourseId
        };

        // Save invitation
        const response = await api.post("/Invitation/save", inviteData);
        const { data: token } = response.data;

        // Send email with registration link
        await sendInvitationEmail(email, token, courseDetails);
      }

      toast.success("Invitations sent successfully!");

      if (!effectiveCourseId) {
        queueModal("Congratulations!", <CourseCongratulations />);
      }
      closeModal();
    } catch (error) {
      toast.error(error.message || "Failed to send invitations");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddEmail();
    }
  };

  return (
    <div className="p-6">
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
          onKeyPress={handleKeyPress}
          placeholder="Enter email"
          className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
        />
      </div>
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={handleAddEmail}
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300 transition disabled:opacity-50"
        >
          Add Email
        </button>
        <button
          onClick={handleInviteUsers}
          disabled={isLoading || emails.length === 0}
          className="px-6 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 focus:ring focus:ring-green-300 transition disabled:opacity-50"
        >
          {isLoading ? "Sending..." : "Invite Users"}
        </button>
      </div>
      {emails.length > 0 && (
        <div className="mt-4">
          <h3 className="text-md font-medium text-gray-700 mb-2">
            Added Emails:
          </h3>
          <ul className="list-disc list-inside text-gray-600">
            {emails.map((email, index) => (
              <li key={index} className="flex items-center justify-between">
                <span>{email}</span>
                <button
                  onClick={() =>
                    setEmails(emails.filter((_, i) => i !== index))
                  }
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InviteUsersContent;
