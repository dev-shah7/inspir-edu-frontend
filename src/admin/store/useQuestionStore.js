import { create } from "zustand";
import { questionService } from "../../services/api/questionService";

const useQuestionStore = create((set) => ({
  questions: [],
  currentQuestion: null,
  isLoading: false,
  error: null,

  fetchQuestionsByModule: async (moduleId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await questionService.getQuestionsByModule(moduleId);
      set({
        questions: response.data,
        isLoading: false,
      });
      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch questions",
        isLoading: false,
      });
      throw error;
    }
  },

  createQuestion: async (questionData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await questionService.createQuestion(questionData);
      set((state) => ({
        questions: [...state.questions, response.data],
        currentQuestion: response.data,
        isLoading: false,
      }));
      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to create question",
        isLoading: false,
      });
      throw error;
    }
  },

  updateQuestion: async (questionId, questionData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await questionService.updateQuestion(
        questionId,
        questionData
      );
      set((state) => ({
        questions: state.questions.map((question) =>
          question.id === questionId ? response.data : question
        ),
        currentQuestion: response.data,
        isLoading: false,
      }));
      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to update question",
        isLoading: false,
      });
      throw error;
    }
  },

  deleteQuestion: async (questionId) => {
    set({ isLoading: true, error: null });
    try {
      await questionService.deleteQuestion(questionId);
      set((state) => ({
        questions: state.questions.filter(
          (question) => question.id !== questionId
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to delete question",
        isLoading: false,
      });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));

export default useQuestionStore;
