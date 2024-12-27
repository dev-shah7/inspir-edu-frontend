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

export const sendAdminNotificationEmail = async (params) => {
  const templateParams = {
    from_name: params.from_name,
    student_email: params.student_email,
    admin_name: params.admin_name,
    current_date: params.current_date,
    admin_email: params.admin_email,
  };

  try {
    return sendTemplateEmail(
      emailConfig.templates.adminCourseInvitation,
      templateParams
    );
  } catch (error) {
    console.error("Error sending admin notification:", error);
    throw new Error("Failed to send admin notification");
  }
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

export const sendPasswordResetEmail = async (userEmail, resetToken) => {
  const resetLink = `${
    window.location.origin
  }/reset-password?token=${encodeURIComponent(
    resetToken
  )}&email=${encodeURIComponent(userEmail)}`;

  const templateParams = {
    user_email: userEmail,
    reset_link: resetLink,
    from_name: "inspirEDU",
  };

  try {
    const response = await sendTemplateEmail(
      emailConfig.templates.passwordReset,
      templateParams
    );
    return response;
  } catch (error) {
    console.error("Failed to send password reset email:", error);
    throw new Error("Failed to send password reset email");
  }
};
