import api from "../../../services/api/axios";

export const studentCourseService = {
  enrollCourse: async (data) => {
    console.log("Datais: ", data);
    const response = await api.post("/Enrollment/save", data);
    return response.data;
  },

  getEnrolledCourse: async (courseId) => {
    const response = await api.get(
      `/Course/get-enrolled-detail-for-student/${courseId}`
    );
    return response.data;
  },

  getAllCourses: async () => {
    try {
      const response = await api.get("/UserCourse/get-all-for-student");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  submitCourse: async (courseId) => {
    const response = await api.post(`/UserCourse/submit/${courseId}`, {});
    return response.data;
  },
  getEnrolledCourses: async () => {
    try {
      const response = await api.get("/Enrollment/get-all-for-student");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
