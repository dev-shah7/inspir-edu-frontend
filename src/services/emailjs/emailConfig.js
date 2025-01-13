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
    passwordResetSuccess: "template_88mxh0q",
    adminCourseInvitation: "template_8nkruxl",
    support: "template_qg8vkqk",
    invitationAlreadyRegistered: "template_v4dveuc",
    courseStartAdmin: 'template_92ukgyc',
    courseStartStudent: 'template_rzftc67',
    courseSubmissionStudent: 'template_fkf1hn7',
    courseSubmissionAdmin: 'template_1kbox7n',
  },
};
