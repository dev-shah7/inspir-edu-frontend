import { create } from "zustand";

const useAuthStore = create((set) => ({
  email: "",
  password: "",
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
}));
export default useAuthStore;
