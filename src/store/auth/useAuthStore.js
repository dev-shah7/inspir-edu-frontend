import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "../../services/api/authService";
import { plansDetails } from "../../assets/plansDetails";

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
      subscriptionPlans: [],
      isLoading: false,
      error: null,

      signup: async (signupData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.signup(signupData);
          const { data } = response;
          set({ isLoading: false, error: null });
          window.location.href = data.sessionUrl;
          return response;
        } catch (error) {
          set({
            error: error.response?.data?.message || "Signup failed",
            isLoading: false,
          });
          throw error;
        }
      },

      tokenBasedSignup: async (signupData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.tokenBasedSignup(signupData);
          set({ isLoading: false, error: null });
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

          const token = data.token;
          localStorage.setItem("token", token);

          set({
            user: userData,
            token: token,
            isLoading: false,
            isAuthenticated: true,
            userRole: data.roles[0].toLowerCase(),
          });

          return response;
        } catch (error) {
          set({
            error: error.response?.data?.message || "Login failed",
            isLoading: false,
          });
          throw error;
        }
      },

      fetchSubscriptionPlans: async () => {
        set({ isLoading: true });
        try {
          const response = await authService.getSubscriptionPlans();
          const { data } = response;

          const mergedPlans = plansDetails.map((plan) => {
            const matchedData = data.find((item) => item.title === plan.title);
            return matchedData ? { ...plan, ...matchedData } : plan;
          });

          set({
            subscriptionPlans: mergedPlans,
            isLoading: false,
          });

          return response;
        } catch (error) {
          set({
            error:
              error.response?.data?.message ||
              "Failed to fetch subscription plans",
            isLoading: false,
          });
          throw error;
        }
      },

      logout: () => {
        localStorage.clear();

        set({
          user: null,
          token: null,
          isAuthenticated: false,
          userRole: null,
          isLoading: false,
          error: null,
        });
      },

      clearError: () => set({ error: null }),

      forgotPassword: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.forgotPassword(data);
          set({ isLoading: false });
          return response;
        } catch (error) {
          set({
            error: error.response?.data?.message || "Failed to send reset link",
            isLoading: false,
          });
          throw error;
        }
      },

      resetPassword: async (token, email, newPassword) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.resetPassword(
            token,
            email,
            newPassword
          );
          set({ isLoading: false });
          return response;
        } catch (error) {
          set({
            error: error.response?.data?.message || "Failed to reset password",
            isLoading: false,
          });
          throw error;
        }
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;
