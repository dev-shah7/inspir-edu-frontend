import api from "./axios";

export const courseService = {
  saveCourse: async (courseData) => {
    const response = await api.post("/Course/save", courseData);
    return response.data;
  },

  updateCourse: async (courseData) => {
    const response = await api.put(`/Course/${courseData.id}`, courseData);
    return response.data;
  },

  getCourse: async (id) => {
    const response = await api.get(`/Course/${id}`);
    return response.data;
  },

  getAllCourses: async () => {
    try {
      const response = await api.get("/Course/get-all");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  saveGradingInstructions: async (gradingData) => {
    const response = await api.post(
      "/Course/save-grading-instructions",
      gradingData
    );
    return response.data;
  },

  getGradingInstructions: async (courseId) => {
    const response = await api.get(
      `/Course/get-grading-instructions/${courseId}`
    );
    return response.data;
  },
};
