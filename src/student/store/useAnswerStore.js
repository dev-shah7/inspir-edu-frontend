import { create } from "zustand";
import { studentCourseService } from "../services/api/studentCourseService";
import { studentAnswerService } from "../services/api/studentAnswerService";

const useAnswerStore = create((set, get) => ({
  userAnswers: [],
  currentAnswer: null,
  isLoading: false,
  isFetchingAnswer: false,
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

  fetchAnswers: async (id) => {
    set({
      isFetchingAnswer: true,
    });
    try {
      const response = await studentAnswerService.fetchAnswersByModule(id);
      set({
        isFetchingAnswer: false,
        userAnswers: response.data,
      });
      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to save answer please choose again",
        isFetchingAnswer: false,
      });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
  clearCurrentAnswer: () => set({ currentAnswer: null }),
}));

export default useAnswerStore;
