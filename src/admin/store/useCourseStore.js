import { create } from "zustand";
import { courseService } from "../../services/api/courseService";
import axios from "axios";

const useCourseStore = create((set, get) => ({
  courses: [],
  currentCourse: null,
  isLoading: false,
  error: null,
  gradingInstructions: null,
  isLoadingInstructions: false,
  instructionsError: null,

  setCurrentCourse: (courseId) => {
    const course = get().courses.find((course) => course.id === courseId);
    set({ currentCourse: course.id });
  },

  fetchCourses: async () => {
    const hasCourses = get().courses.length > 0;
    if (!hasCourses) {
      set({ isLoading: true });
    }

    try {
      const response = await courseService.getAllCourses();
      set({
        courses: response.data,
        isLoading: false,
      });
      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch courses",
        isLoading: false,
      });
      throw error;
    }
  },

  saveCourse: async (courseData) => {
    try {
      const response = await courseService.saveCourse(courseData);

      set((state) => ({
        courses: courseData.id
          ? state.courses.map((course) =>
              course.id === courseData.id ? response : course
            )
          : [...state.courses, response],
        currentCourse: response.data,
      }));

      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to save course",
      });
      throw error;
    }
  },

  deleteCourse: async (courseId) => {
    try {
      const response = await courseService.deleteCourse(courseId);

      set((state) => ({
        courses: state.courses.filter((course) => course.id !== courseId),
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to delete course",
      });
      throw error;
    }
  },

  fetchGradingInstructions: async (courseId) => {
    set({ isLoadingInstructions: true, instructionsError: null });
    try {
      const response = await courseService.getGradingInstructions(courseId);
      set({
        gradingInstructions: response.data,
        isLoadingInstructions: false,
      });
    } catch (error) {
      console.error("Failed to fetch grading instructions:", error);
      set({
        instructionsError: error.message,
        isLoadingInstructions: false,
      });
    }
  },

  clearError: () => set({ error: null }),
  clearCurrentCourse: () => set({ currentCourse: null }),

  fetchGuestCourse: async (token) => {
    set({ isLoading: true, error: null });
    try {
      const response = await courseService.guestGetCourseByToken(token);
      set({
        currentCourse: response,
        isLoading: false,
      });
      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch guest course",
        isLoading: false,
      });
      throw error;
    }
  },

  saveGuestCourse: async (courseData) => {
    try {
      const response = await courseService.guestSaveCourse(courseData);
      set((state) => ({
        courses: courseData.id
          ? state.courses.map((course) =>
              course.id === courseData.id ? response : course
            )
          : [...state.courses, response],
        currentCourse: response.data.id,
      }));
      
      // Store the guest course ID in sessionStorage
      sessionStorage.setItem('guestCourseId', response?.data?.id);
      sessionStorage.setItem('guestToken', response?.data?.token);
      
      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to save guest course",
      });
      throw error;
    }
  },

  deleteGuestCourse: async (courseId) => {
    try {
      await courseService.guestDeleteCourse(courseId);
      set((state) => ({
        courses: state.courses.filter((course) => course.id !== courseId),
        currentCourse: null,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to delete guest course",
      });
      throw error;
    }
  },

  fetchGuestGradingInstructions: async (courseId) => {
    set({ isLoadingInstructions: true, instructionsError: null });
    try {
      const response = await courseService.guestGetGradingInstructions(courseId);
      set({
        gradingInstructions: response.data,
        isLoadingInstructions: false,
      });
      return response;
    } catch (error) {
      set({
        instructionsError: error.message,
        isLoadingInstructions: false,
      });
      throw error;
    }
  },

  saveGuestGradingInstructions: async (instructionsData) => {
    set({ isLoadingInstructions: true, instructionsError: null });
    try {
      const response = await courseService.guestSaveGradingInstructions(instructionsData);
      set({
        gradingInstructions: response,
        isLoadingInstructions: false,
      });
      return response;
    } catch (error) {
      set({
        instructionsError: error.message,
        isLoadingInstructions: false,
      });
      throw error;
    }
  },

  fetchGuestCourseById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await courseService.guestGetCourseById(id);
      set({
        currentCourse: response.data,
        courses: [response.data],
        isLoading: false,
      });
      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch guest course by id",
        isLoading: false,
      });
      throw error;
    }
  },
}));

export default useCourseStore;
