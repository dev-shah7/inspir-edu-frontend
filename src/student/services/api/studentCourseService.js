import api from "../../../services/api/axios";


export const studentCourseService = {
  saveCourse: async (courseData) => {
    const response = await api.post("/Course/save", courseData);
    return response.data;
  },

  updateCourse: async (courseData) => {
    const response = await api.put(`/Course/${courseData.id}`, courseData);
    return response.data;
  },

  getCourse: async (id) => {
    const response = await api.get(`/Course/get-by-id/${id}`);
    return response.data;
  },

  enrollCourse: async (data) => {
    console.log("Datais: ", data);
    const response = await api.post(
      "/Enrollment/save",
      data
    );
    return response.data;
  },

  getEnrolledCourse: async (courseId) => {
    const response = await api.get(`/Course/get-enrolled-detail/${courseId}`);
    return response.data;
  },

  getAllCourses: async () => {
    try {
      const response = await api.get("/UserCourse/get-all");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getEnrolledCourses: async () => {
    try {
      const response = await api.get("/Enrollment/get-all");
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

  deleteCourse: async (id) => {
    return await api.delete(`/Course/delete/${id}`);
  },
};
