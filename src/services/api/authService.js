import api from "./axios";

export const authService = {
  signup: async (signupData) => {
    const response = await api.post("/Auth/register", signupData);
    return response.data;
  },

  getSubscriptionPlans: async () => {
    try {
      const response = await api.get("/Auth/all-subscription-plans");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  login: async (credentials) => {
    const response = await api.post("/Auth/login", credentials);
    return response.data;
  },

  logout: async () => {
    const response = await api.post("/Auth/logout");
    return response.data;
  },
};
