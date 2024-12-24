import api from "./axios";

export const authService = {
  signup: async (signupData) => {
    const response = await api.post("/Auth/signup", signupData);
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
};
