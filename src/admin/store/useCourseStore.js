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
    console.log(courseId, "courseId");
    const course = get().courses.find((course) => course.id === courseId);
    console.log(course, "course");
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

      console.log(response, "response");
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
      console.log(response, "response");

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
      console.log(response, "response");
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
}));

export default useCourseStore;
