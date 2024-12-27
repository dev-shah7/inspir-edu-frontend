import emailjs from "@emailjs/browser";
import { emailConfig } from "./emailConfig";

export const sendTemplateEmail = async (templateId, templateParams) => {
  try {
    const response = await emailjs.send(
      emailConfig.serviceId,
      templateId,
      templateParams,
      emailConfig.publicKey
    );
    return response;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw new Error("Failed to send email");
  }
};

// Specific email sending functions
export const sendInvitationEmail = async (email, token, courseDetails) => {
  const registrationUrl = `${window.location.origin}/signup/${token}?email=${email}`;

  return sendTemplateEmail(emailConfig.templates.invitation, {
    user_email: email,
    course_name: courseDetails.name,
    register_link: registrationUrl,
  });
};

// Add more specific email functions as needed
export const sendWelcomeEmail = async (userEmail, userName) => {
  return sendTemplateEmail(emailConfig.templates.welcome, {
    user_email: userEmail,
    user_name: userName,
  });
};

export const sendCourseCompletionEmail = async (
  userEmail,
  courseName,
  score
) => {
  return sendTemplateEmail(emailConfig.templates.completion, {
    user_email: userEmail,
    course_name: courseName,
    score: score,
  });
};
