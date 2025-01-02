import api from "./axios";

export const questionService = {
  getQuestionsByModule: async (moduleId) => {
    const response = await api.get(`/Question/get-all-by-module/${moduleId}`);
    return response.data;
  },

  getQuestion: async (questionId) => {
    const response = await api.get(`/Question/${questionId}`);
    return response.data;
  },

  deleteQuestion: async (questionId) => {
    const response = await api.delete(`/Question/delete/${questionId}`);
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
        return "Short Answer Exact";
      case 1:
        return "Long Answer";
      case 2:
        return "Multiple Choice";
      case 3:
        return "True/False";
      case 4:
        return "Yes/No";
      case 5:
        return "Checkbox";
      default:
        return "Unknown";
    }
  },

  // Helper function to convert frontend type to backend enum
  getQuestionTypeNumber: (type) => {
    const types = {
      "short-answer": 0,
      "long-answer": 1,
      mcq: 2,
      checkbox: 5,
      "true-false": 3,
      "yes-no": 4,
    };
    return types[type] || 0;
  },

  saveQuestion: async (questionData) => {
    const response = await api.post("/Question/Save", questionData);
    return response.data;
  },

  formatQuestionData: (data) => {
    const type = questionService.getQuestionTypeNumber(data.type);
    const isTextQuestion = type === 0 || type === 1;

    let questionOptions = [];

    if (!isTextQuestion) {
      switch (type) {
        case 2: // MCQs
          questionOptions = data.options.map((opt, idx) => ({
            id: 0,
            questionId: 0,
            option: opt.value,
            isCorrect: data.correctAnswer === idx.toString(),
          }));
          break;
        case 5: // Checkbox
          const selectedIndices = data.correctAnswer
            ? data.correctAnswer.split(",").map(Number)
            : [];
          questionOptions = data.options.map((opt, idx) => ({
            id: 0,
            questionId: 0,
            option: opt.value,
            isCorrect: selectedIndices.includes(idx),
          }));
          break;
        case 3: // True/False
          questionOptions = [
            {
              id: 0,
              questionId: 0,
              option: "True",
              isCorrect: data.correctAnswer === "true",
            },
            {
              id: 0,
              questionId: 0,
              option: "False",
              isCorrect: data.correctAnswer === "false",
            },
          ];
          break;
        case 4: // Yes/No
          questionOptions = [
            {
              id: 0,
              questionId: 0,
              option: "Yes",
              isCorrect: data.correctAnswer === "yes",
            },
            {
              id: 0,
              questionId: 0,
              option: "No",
              isCorrect: data.correctAnswer === "no",
            },
          ];
          break;
      }
    }

    return {
      id: data.id || 0,
      question: data.question,
      type: type,
      correctAnswer: isTextQuestion ? data.correctAnswer : "",
      moduleId: data.moduleId || null,
      sectionId: data.sectionId || null,
      questionOptions: questionOptions,
    };
  },

  getQuestionById: async (id) => {
    const response = await api.get(`/Question/get-by-id/${id}`);
    return response.data;
  },

  // Add helper to convert backend type to frontend type
  getFrontendQuestionType: (type) => {
    const types = {
      0: "short-answer",
      1: "long-answer",
      2: "mcq",
      3: "true-false",
      4: "yes-no",
      5: "checkbox",
    };
    return types[type] || "short-answer";
  },
};
