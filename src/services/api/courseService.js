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
    const response = await api.get(`/Course/get-by-id/${id}`);
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

  deleteCourse: async (id) => {
    return await api.delete(`/Course/delete/${id}`);
  },

  getCourseById: async (courseId) => {
    try {
      const response = await api.get(`/Course/get-by-id/${courseId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching course:", error);
      throw error;
    }
  },
  getGradingInstructions: async (courseId) => {
    const response = await api.get(
      `/Course/get-grading-instructions/${courseId}`
    );
    return response.data;
  },

  getCourseInvitations: async (courseId) => {
    try {
      const response = await api.get(
        `/Invitation/get-all?courseId=${courseId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching course invitations:", error);
      throw error;
    }
  },

  getEnrolledDetail: async (courseId, userId) => {
    try {
      const response = await api.get(
        `/Course/get-enrolled-detail/${courseId}?userId=${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error in getEnrolledDetail:", error);
      throw error;
    }
  },

  getEnrolledCoursesByUser: async (userId) => {
    try {
      const response = await api.get(`/Enrollment/get-all?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error in getEnrolledCoursesByUser:", error);
      throw error;
    }
  },

  getEnrollmentDetails: async (courseId, userId) => {
    try {
      const response = await api.get(
        `/Enrollment/get-all-detail/${courseId}?userId=${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error in getEnrollmentDetails:", error);
      throw error;
    }
  },
};
