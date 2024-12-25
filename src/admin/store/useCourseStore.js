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

      if (courseData.id > 0) {
        set((state) => ({
          currentCourse: response.data,
          courses: state.courses.map((course) =>
            course.id === response.data.id ? response.data : course
          ),
          isLoading: false,
        }));
      } else {
        set((state) => ({
          currentCourse: response.data,
          courses: [...state.courses, response.data],
          isLoading: false,
        }));
      }
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to save course",
        isLoading: false,
      });
      throw error;
    }
  },

  deleteCourse: async (courseId) => {
    set({ isLoading: true, error: null });
    try {
      await courseService.deleteCourse(courseId);
      set((state) => ({
        courses: state.courses.filter((course) => course.id !== courseId),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to delete course",
        isLoading: false,
      });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
  clearCurrentCourse: () => set({ currentCourse: null }),
}));

export default useCourseStore;
