import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "../../services/api/authService";

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} name
 * @property {string} email
 * @property {string} phoneNumber
 * @property {number} companyId
 * @property {string[]} roles
 */

const useAuthStore = create(
  persist(
    (set) => ({
      /** @type {User|null} */
      user: null,
      /** @type {string|null} */
      token: null,
      isAuthenticated: false,
      userRole: null,
      isLoading: false,
      error: null,

      signup: async (signupData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.signup(signupData);
          const { data } = response;

          const userData = {
            id: data.id,
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber,
            companyId: data.companyId,
            roles: data.roles,
          };

          set({
            user: userData,
            token: data.token,
            isLoading: false,
            isAuthenticated: true,
            userRole: data.roles[0].toLowerCase(),
          });
          localStorage.setItem("token", data.token);
          return response;
        } catch (error) {
          set({
            error: error.response?.data?.message || "Signup failed",
            isLoading: false,
          });
          throw error;
        }
      },

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.login(credentials);
          const { data } = response;

          const userData = {
            id: data.id,
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber,
            companyId: data.companyId,
            roles: data.roles,
          };

          set({
            user: userData,
            token: data.token,
            isLoading: false,
            isAuthenticated: true,
            userRole: data.roles[0].toLowerCase(),
          });
          localStorage.setItem("token", data.token);
          return response;
        } catch (error) {
          set({
            error: error.response?.data?.message || "Login failed",
            isLoading: false,
          });
          throw error;
        }
      },

      logout: async () => {
        set({ isLoading: true, error: null });
        try {
          await authService.logout();
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            userRole: null,
            isLoading: false,
          });
          localStorage.removeItem("token");
        } catch (error) {
          set({
            error: error.response?.data?.message || "Logout failed",
            isLoading: false,
          });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;
