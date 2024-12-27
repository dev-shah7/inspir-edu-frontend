import emailjs from "@emailjs/browser";

// Initialize EmailJS with your public key
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

export const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  templates: {
    invitation: "template_7xw18rc",
    welcome: "template_welcome",
    completion: "template_completion",
    passwordReset: "template_ah250w3",
  },
};
