import { create } from "zustand";
import { courseService } from "../../services/api/courseService";

const useCourseStore = create((set) => ({
  courses: [],
  currentCourse: null,
  isLoading: false,
  error: null,

  fetchCourses: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await courseService.getAllCourses();
      set({
        courses: response.data,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch courses",
        isLoading: false,
      });
      throw error;
    }
  },

  saveCourse: async (courseData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await courseService.saveCourse(courseData);
      set((state) => ({
        currentCourse: response.data,
        courses: [...state.courses, response.data],
        isLoading: false,
      }));
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to save course",
        isLoading: false,
      });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
  clearCurrentCourse: () => set({ currentCourse: null }),
}));

export default useCourseStore;
