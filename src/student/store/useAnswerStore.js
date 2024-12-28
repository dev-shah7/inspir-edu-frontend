import { create } from "zustand";
import { studentCourseService } from "../services/api/studentCourseService";
import { studentAnswerService } from "../services/api/studentAnswerService";

const useAnswerStore = create((set, get) => ({
  answers: [],
  currentAnswer: null,
  isLoading: false,
  error: null,


  saveAnswer: async (data) => {
    set({
      isLoading: true,
    });
    try {
      const response = await studentAnswerService.saveAnswer(data);
      set({
        isLoading: false,
      });
      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to save answer please choose again",
        isLoading: false,
      });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
  clearCurrentAnswer: () => set({ currentAnswer: null }),
}));

export default useAnswerStore;
