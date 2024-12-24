import { create } from "zustand";
import { moduleService } from "../../services/api/moduleService";

const useModuleStore = create((set) => ({
  modules: [],
  currentModule: null,
  isLoading: false,
  error: null,
  uploadProgress: 0,

  uploadFile: async (file, moduleType, onProgress) => {
    try {
      const response = await moduleService.uploadFile(
        file,
        moduleType,
        onProgress
      );
      if (response.isSuccess) {
        return response.data; // Return the file URL directly
      }
      throw new Error(response.message || "Upload failed");
    } catch (error) {
      throw error;
    }
  },

  createModule: async (moduleData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await moduleService.createModule(moduleData);
      set((state) => ({
        modules: [...state.modules, response.data],
        currentModule: response.data,
        isLoading: false,
      }));
      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to create module",
        isLoading: false,
      });
      throw error;
    }
  },

  updateModule: async (moduleId, moduleData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await moduleService.updateModule(moduleId, moduleData);
      set((state) => ({
        modules: state.modules.map((module) =>
          module.id === moduleId ? response.data : module
        ),
        currentModule: response.data,
        isLoading: false,
      }));
      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to update module",
        isLoading: false,
      });
      throw error;
    }
  },

  fetchModulesByCourse: async (courseId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await moduleService.getModulesByCourse(courseId);
      set({
        modules: response.data,
        isLoading: false,
      });
      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch modules",
        isLoading: false,
      });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
  setUploadProgress: (progress) => set({ uploadProgress: progress }),
}));

export default useModuleStore;
