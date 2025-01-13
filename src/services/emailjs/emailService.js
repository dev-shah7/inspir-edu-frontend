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

export const sendInvitationEmailToAlreadyRegistered = async (params) => {
  const templateParams = {
    from_name: params.from_name,
    to_name: params.to_name,
    course_name: params.course_name,
    login_page_url: `${window.location.origin}/login`,
    user_email: params.user_email,
  };

  return sendTemplateEmail(
    emailConfig.templates.invitationAlreadyRegistered,
    templateParams
  );
};

export const sendInvitationEmailToAdmin = async (email, token) => {
  const registrationUrl = `${window.location.origin}/signup/${token}?email=${email}`;

  return sendTemplateEmail(emailConfig.templates.adminInvitation, {
    admin_email: email,
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

export const sendPasswordResetEmail = async (userEmail, resetToken) => {
  const resetLink = `${window.location.origin
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

export const sendPasswordResetSuccessEmail = async (email) => {
  return sendTemplateEmail(emailConfig.templates.passwordResetSuccess, {
    name: email,
    user_email: email,
  });
};

export const sendSupportEmail = async (formData) => {
  return sendTemplateEmail(emailConfig.templates.support, formData);
};

export const sendAdminCourseStartEmail = async (templateParams) => {

  try {
    return sendTemplateEmail(
      emailConfig.templates.courseStartAdmin,
      templateParams
    );
  } catch (error) {
    console.error("Error sending admin course start notification:", error);
    throw new Error("Failed to send admin course start notification");
  }
};

export const sendStudentCourseStartEmail = async (templateParams) => {

  try {
    return sendTemplateEmail(
      emailConfig.templates.courseStartStudent,
      templateParams
    );
  } catch (error) {
    console.error("Error sending student course start notification:", error);
    throw new Error("Failed to send student course start notification");
  }
};

export const sendAdminCourseSubmissionEmail = async (templateParams) => {

  try {
    return sendTemplateEmail(
      emailConfig.templates.courseSubmissionAdmin,
      templateParams
    );
  } catch (error) {
    console.error("Error sending admin course submission notification:", error);
    throw new Error("Failed to send admin course submission notification");
  }
};

export const sendStudentCourseSubmissionEmail = async (templateParams) => {

  try {
    return sendTemplateEmail(
      emailConfig.templates.courseSubmissionStudent,
      templateParams
    );
  } catch (error) {
    console.error("Error sending student course submission notification:", error);
    throw new Error("Failed to send student course submission notification");
  }
};