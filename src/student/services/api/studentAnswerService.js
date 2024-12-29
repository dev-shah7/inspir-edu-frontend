import api from "../../../services/api/axios";


export const studentAnswerService = {
  saveAnswer: async (courseData) => {
    const response = await api.post("/Answer/save", courseData);
    return response.data;
  },

  fetchAnswersByModule: async (id) => {
    const response = await api.get(`/Answer/get-user-answers/${id}`);
    return response.data;
  },
};
