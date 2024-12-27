import axios from "./axios";

export const userService = {
  getAllUsers: async () => {
    try {
      const response = await axios.get("/User/get-all");
      return response.data;
    } catch (error) {
      console.error("Error in getAllUsers:", error);
      throw error;
    }
  },

  deleteUser: async (userId) => {
    try {
      const response = await axios.delete(`/User/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error in deleteUser:", error);
      throw error;
    }
  },

  // Add other user-related API calls here
};
