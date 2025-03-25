import api from "./axios";
import {
  sendPasswordResetEmail,
  sendPasswordResetSuccessEmail,
} from "../emailjs/emailService";

export const authService = {
  signup: async (signupData) => {
    const response = await api.post("/Auth/register", signupData);
    return response.data;
  },

  tokenBasedSignup: async (signupData) => {
    const response = await api.post("/Auth/register-invited-user", signupData);
    return response.data;
  },

  getSubscriptionPlans: async () => {
    const response = await api.get("/Auth/all-subscription-plans");
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post("/Auth/login", credentials);
    return response.data;
  },

  logout: async () => {
    const response = await api.post("/Auth/logout");
    return response.data;
  },

  forgotPassword: async (email) => {
    try {
      const response = await api.post("/Auth/forgot-password", { email });

      // Send password reset email
      if (response.data.data) {
        await sendPasswordResetEmail(email, response.data.data);
      }

      return response.data;
    } catch (error) {
      // Add specific error handling for forgot password
      if (error.response?.status === 404) {
        throw new Error("Email address not found");
      }
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error("Failed to process forgot password request");
    }
  },

  resetPassword: async (token, email, newPassword) => {
    try {
      const response = await api.post("/Auth/reset-password", {
        resetToken: token,
        email,
        newPassword,
      });

      if (response.data) {
        await sendPasswordResetSuccessEmail(email);
      }
      return response.data;
    } catch (error) {
      if (error.response?.status === 400) {
        throw new Error("Invalid or expired reset token");
      }
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error("Failed to reset password");
    }
  },

  updatePaymentStatus: async (sessionId, userId, isNewSubscription) => {
    try {
      const response = await api.post("/Auth/update-payment-status", {
        sessionId,
        userId,
        isNewSubscription,
      });
      return response.data;
    } catch (error) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error("Failed to update payment status");
    }
  },

  registerGuestUser: async (userData) => {
    try {
      const response = await api.post("/GuestCourse/register-guest-user", userData);
      return response.data;
    } catch (error) {
      console.error("Error registering guest user:", error);
      throw error;
    }
  },
};
