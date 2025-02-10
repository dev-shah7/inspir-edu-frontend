import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "../../services/api/authService";
import { companyService } from "../../services/api/companyService";
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
      activeRole: null,
      companyDetails: null,
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
      
      trialSignup: async (signupData) => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await authService.signup(signupData);
          set({ isLoading: false, error: null });

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

          try {
            const companyResponse = await companyService.getCompanyDetails(
              data.companyId
            );
            const companyData = companyResponse.data.data;
            const initialRole = data.roles[0].toLowerCase();
            set({
              user: userData,
              token: token,
              isLoading: false,
              isAuthenticated: true,
              userRole: initialRole,
              activeRole: initialRole,
              companyDetails: companyData,
            });
          } catch (companyError) {
            console.error("Failed to fetch company details:", companyError);
            const initialRole = data.roles[0].toLowerCase();
            set({
              user: userData,
              token: token,
              isLoading: false,
              isAuthenticated: true,
              userRole: initialRole,
              activeRole: initialRole,
            });
          }

          return data;
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

          try {
            const companyResponse = await companyService.getCompanyDetails(
              data.companyId
            );
            const companyData = companyResponse.data.data;
            const initialRole = data.roles[0].toLowerCase();

            set({
              user: userData,
              token: token,
              isLoading: false,
              isAuthenticated: true,
              userRole: initialRole,
              activeRole: initialRole,
              companyDetails: companyData,
            });
          } catch (companyError) {
            console.error("Failed to fetch company details:", companyError);
            const initialRole = data.roles[0].toLowerCase();
            set({
              user: userData,
              token: token,
              isLoading: false,
              isAuthenticated: true,
              userRole: initialRole,
              activeRole: initialRole,
            });
          }

          return response;
        } catch (error) {
          set({
            error: error.response?.data?.message || "Login failed",
            isLoading: false,
          });
          throw error;
        }
      },

      updateCompanyDetails: async (companyId) => {
        try {
          const response = await companyService.getCompanyDetails(companyId);
          const companyData = response.data.data;
          set({ companyDetails: companyData });
          return companyData;
        } catch (error) {
          console.error("Failed to update company details:", error);
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
          activeRole: null,
          companyDetails: null,
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

      switchRole: (newRole) => {
        const lowerCaseRole = newRole.toLowerCase();
        set((state) => ({
          ...state,
          isLoading: true,
          activeRole: lowerCaseRole,
        }));

        // Ensure loading state persists long enough for navigation
        return new Promise((resolve) => {
          setTimeout(() => {
            set((state) => ({
              ...state,
              isLoading: false,
            }));
            resolve(lowerCaseRole);
          }, 100);
        });
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;
