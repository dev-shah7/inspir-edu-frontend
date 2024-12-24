import api from "./axios";

export const questionService = {
  getQuestionsByModule: async (moduleId) => {
    // /api/Question/get-all/{moduleId}
    const response = await api.get(`/Question/get-all/${moduleId}`);
    return response.data;
  },

  getQuestion: async (questionId) => {
    const response = await api.get(`/Question/${questionId}`);
    return response.data;
  },

  createQuestion: async (questionData) => {
    const formattedData = {
      id: 0, // For new questions
      question: questionData.question,
      type: questionData.type,
      correctAnswer: questionData.correctAnswer,
      moduleId: questionData.moduleId,
      sectionId: questionData.sectionId || 0,
    };

    const response = await api.post("/Question/save", formattedData);
    return response.data;
  },

  updateQuestion: async (questionId, questionData) => {
    const formattedData = {
      id: questionId,
      question: questionData.question,
      type: questionData.type,
      correctAnswer: questionData.correctAnswer,
      moduleId: questionData.moduleId,
      sectionId: questionData.sectionId || 0,
    };

    const response = await api.put(`/Question/${questionId}`, formattedData);
    return response.data;
  },

  deleteQuestion: async (questionId) => {
    const response = await api.delete(`/Question/${questionId}`);
    return response.data;
  },

  // Question Types enum matching backend
  QuestionTypes: {
    SHORT: 0,
    LONG: 1,
    MCQS: 2,
    TRUE_FALSE: 3,
    YES_NO: 4,
  },

  // Helper function to get question type name
  getQuestionTypeName: (type) => {
    switch (type) {
      case 0:
        return "Short Answer";
      case 1:
        return "Long Answer";
      case 2:
        return "Multiple Choice";
      case 3:
        return "True/False";
      case 4:
        return "Yes/No";
      default:
        return "Unknown";
    }
  },

  // Helper function to convert frontend type to backend enum
  getQuestionTypeNumber: (frontendType) => {
    switch (frontendType) {
      case "short-answer":
        return 0; // SHORT
      case "long-answer":
        return 1; // LONG
      case "mcq":
        return 2; // MCQS
      case "true-false":
        return 3; // TRUE_FALSE
      case "yes-no":
        return 4; // YES_NO
      default:
        return 0; // Default to SHORT
    }
  },
};
