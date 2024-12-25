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

  fetchModuleById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await moduleService.getModuleById(id);
      set({ currentModule: response, isLoading: false });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch module",
        isLoading: false,
      });
      throw error;
    }
  },

  saveModule: async (moduleData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await moduleService.saveModule(moduleData);

      // Update the modules list
      set((state) => ({
        modules: moduleData.id
          ? state.modules.map((module) =>
              module.id === moduleData.id ? response : module
            )
          : [...state.modules, response],
        currentModule: response,
        isLoading: false,
      }));

      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to save module",
        isLoading: false,
      });
      throw error;
    }
  },

  deleteModule: async (moduleId) => {
    set({ isLoading: true, error: null });
    try {
      await moduleService.deleteModule(moduleId);
      set((state) => ({
        modules: state.modules.filter((module) => module.id !== moduleId),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to delete module",
        isLoading: false,
      });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
  setUploadProgress: (progress) => set({ uploadProgress: progress }),
  clearCurrentModule: () => set({ currentModule: null }),
}));

export default useModuleStore;