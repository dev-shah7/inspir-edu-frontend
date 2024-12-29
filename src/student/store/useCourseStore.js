import { create } from "zustand";
import { studentCourseService } from "../services/api/studentCourseService";

const useCourseStore = create((set, get) => ({
  courses: [],
  currentCourse: null,
  isLoading: false,
  error: null,
  courseSubmissionResult: null,

  fetchStudentCourses: async () => {
    const hasCourses = get().courses.length > 0;
    if (!hasCourses) {
      set({ isLoading: true });
    }

    try {
      const response = await studentCourseService.getAllCourses();
      set({
        courses: response.data,
        isLoading: false,
      });
      console.log("response is : ", response);
      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch courses",
        isLoading: false,
      });
      throw error;
    }
  },

  fetchEnrolledCourses: async () => {
    const hasCourses = get().courses.length > 0;
    if (!hasCourses) {
      set({ isLoading: true });
    }

    try {
      const response = await studentCourseService.getEnrolledCourses();
      set({
        courses: response.data,
        isLoading: false,
      });
      console.log("response is : ", response);
      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch courses",
        isLoading: false,
      });
      throw error;
    }
  },

  getEnrolledCourse: async (courseId) => {
    set({
      isLoading: true,
    });
    try {
      const response = await studentCourseService.getEnrolledCourse(courseId);
      console.log(response, "response");
      set((state) => ({
        currentCourse: response.data,
        isLoading: false,
      }));
      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to enroll the course", isLoading: false
      });
      throw error;
    }
  },

  enrollCourse: async (courseData) => {
    try {
      const data = {
        courseId: courseData.id,
      }
      const response = await studentCourseService.enrollCourse(data);
      console.log(response, "response");
      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to enroll the course",
      });
      throw error;
    }
  },

  submitCourse: async (courseId) => {
    set({
      isLoading: true,
    });
    try {
      const response = await studentCourseService.submitCourse(courseId);
      console.log(response, "response");
      set({
        isLoading: false,
        courseSubmissionResult: response.data,
      });
      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to enroll the course",
        isLoading: false,
        courseSubmissionResult: null,
      });
      throw error;
    }
  },


  clearError: () => set({ error: null }),
  clearCurrentCourse: () => set({ currentCourse: null }),
  clearSubmissionResult: () => set({ courseSubmissionResult: null }),
}));

export default useCourseStore;
