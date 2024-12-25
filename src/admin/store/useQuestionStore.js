import { create } from "zustand";
import { questionService } from "../../services/api/questionService";

const useQuestionStore = create((set, get) => ({
  questions: [],
  currentQuestion: null,
  isLoading: false,
  error: null,

  fetchQuestionsByModule: async (moduleId) => {
    const hasQuestions = get().questions.length > 0;
    if (!hasQuestions) {
      set({ isLoading: true });
    }

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

  deleteQuestion: async (questionId) => {
    try {
      await questionService.deleteQuestion(questionId);

      // Update store without setting loading state
      set((state) => ({
        questions: state.questions.filter(
          (question) => question.id !== questionId
        ),
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to delete question",
      });
      throw error;
    }
  },

  clearError: () => set({ error: null }),

  saveQuestion: async (questionData) => {
    try {
      const formattedData = questionService.formatQuestionData(questionData);
      const response = await questionService.saveQuestion(formattedData);

      // Update store without setting loading state
      set((state) => ({
        questions: questionData.id
          ? state.questions.map((question) =>
              question.id === questionData.id ? response : question
            )
          : [...state.questions, response],
        currentQuestion: response.data,
      }));

      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to save question",
      });
      throw error;
    }
  },

  fetchQuestionById: async (id) => {
    try {
      const response = await questionService.getQuestionById(id);
      set({ currentQuestion: response });
      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch question",
      });
      throw error;
    }
  },
}));

export default useQuestionStore;
