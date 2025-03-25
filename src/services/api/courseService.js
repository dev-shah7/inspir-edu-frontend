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

  // Guest course operations
  guestGetCourseByToken: async (token) => {
    try {
      const response = await api.get(`/GuestCourse/get-by-token/${token}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching guest course:", error);
      throw error;
    }
  },

  guestSaveCourse: async (courseData) => {
    try {
      const response = await api.post("/GuestCourse/save", courseData);
      return response.data;
    } catch (error) {
      console.error("Error saving guest course:", error);
      throw error;
    }
  },

  guestGetGradingInstructions: async (courseId) => {
    try {
      const response = await api.get(
        `/GuestCourse/get-grading-instructions/${courseId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching guest grading instructions:", error);
      throw error;
    }
  },

  guestSaveGradingInstructions: async (instructionsData) => {
    try {
      const response = await api.post(
        "/GuestCourse/save-grading-instructions",
        instructionsData
      );
      return response.data;
    } catch (error) {
      console.error("Error saving guest grading instructions:", error);
      throw error;
    }
  },

  guestDeleteCourse: async (id) => {
    try {
      const response = await api.delete(`/GuestCourse/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting guest course:", error);
      throw error;
    }
  },

  guestGetCourseById: async (id) => {
    try {
      const response = await api.get(`/GuestCourse/get-by-id/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching guest course by id:", error);
      throw error;
    }
  },
};
