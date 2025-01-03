import emailjs from "@emailjs/browser";

// Initialize EmailJS with your public key
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

export const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  templates: {
    invitation: "template_7xw18rc",
    adminInvitation: "template_ef3n5so",
    welcome: "template_welcome",
    completion: "template_completion",
    passwordReset: "template_ah250w3",
    adminCourseInvitation: "template_8nkruxl",
    support: "template_qg8vkqk",
    invitationAlreadyRegistered: "template_v4dveuc",
  },
};
