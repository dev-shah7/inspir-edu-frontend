import { create } from "zustand";
import { moduleService } from "../../services/api/moduleService";

const useModuleStore = create((set, get) => ({
  modules: [],
  currentModule: null,
  isLoading: false,
  isFetchingModule: false,
  error: null,
  uploadProgress: 0,
  moduleStatus: null,
  lastPlayPosition: null,
  userModuleId: null,
  isFullVideoWatched: false,

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
    // Only set loading if we don't have any modules
    const hasModules = get().modules.length > 0;
    if (!hasModules) {
      set({ isLoading: true });
    }

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
    set({ isFetchingModule: true });
    try {
      const response = await moduleService.getModuleById(id);
      set({
        currentModule: response,
        isFetchingModule: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch module",
        isFetchingModule: false,
      });
      throw error;
    }
  },

  saveModule: async (moduleData) => {
    try {
      const response = await moduleService.saveModule(moduleData);

      // Update store without setting loading state
      set((state) => ({
        modules: moduleData.id
          ? state.modules.map((module) =>
            module.id === moduleData.id ? response : module
          )
          : [...state.modules, response],
        currentModule: response.data,
      }));

      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to save module",
      });
      throw error;
    }
  },

  deleteModule: async (moduleId) => {
    try {
      await moduleService.deleteModule(moduleId);
      // Update store without setting loading state
      set((state) => ({
        modules: state.modules.filter((module) => module.id !== moduleId),
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to delete module",
      });
      throw error;
    }
  },

  submitModule: async (id) => {
    set({ isFetchingModule: true });
    try {
      const response = await moduleService.submitModule(id);
      set({ isFetchingModule: false });
      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to save module", isFetchingModule: false
      });
      throw error;
    }
  },

  startUserModule: async (moduleId) => {
    set({ isLoading: true });
    try {
      const response = await moduleService.startUserModule(moduleId);
      set({ isLoading: false });
      return response;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  getModuleStatus: async (moduleId) => {
    set({ isFetchingModule: true });
    try {
      const response = await moduleService.getModuleStatus(moduleId);
      set({ isFetchingModule: false, moduleStatus: response?.data?.status , lastPlayPosition: response?.data?.lastPlayPosition, userModuleId: response?.data?.id, isFullVideoWatched: response?.data?.isFullVideoWatched });
      return response;
    } catch (error) {
      set({ isFetchingModule: false });
      throw error;
    }
  },

  fetchGuestModulesByCourse: async (courseId) => {
    const hasModules = get().modules.length > 0;
    if (!hasModules) {
      set({ isLoading: true });
    }

    try {
      const response = await moduleService.guestGetModulesByCourse(courseId);
      set({
        modules: response.data,
        isLoading: false,
      });
      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch guest modules",
        isLoading: false,
      });
      throw error;
    }
  },

  fetchGuestSingleModuleByCourseId: async (courseId) => {
    set({ isFetchingModule: true });
    try {
      const response = await moduleService.guestGetModulesByCourse(courseId);
      set({
        currentModule: response?.data?.[0],
        isFetchingModule: false,
      });
      return response?.data?.[0];
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch module",
        isFetchingModule: false,
      });
      throw error;
    }
  },

  saveGuestModule: async (moduleData) => {
    try {
      const response = await moduleService.guestSaveModule(moduleData);
      sessionStorage.setItem('guestModuleId', response?.data);
      set((state) => ({
        modules: moduleData.id
          ? state.modules.map((module) =>
              module.id === moduleData.id ? response : module
            )
          : [...state.modules, response],
        currentModule: response,
      }));

      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to save guest module",
      });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
  setUploadProgress: (progress) => set({ uploadProgress: progress }),
  clearCurrentModule: () => set({ currentModule: null }),
}));

export default useModuleStore;
