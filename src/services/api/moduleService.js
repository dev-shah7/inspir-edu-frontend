import api from "./axios";

export const moduleService = {
  uploadFile: async (file, moduleType, onProgress) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/FileUpload", formData, {
      headers: {
        "Content-Type":
          moduleType === 0 ? "application/pdf" : "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress?.(percentCompleted);
      },
    });
    return response.data;
  },

  deleteModule: async (moduleId) => {
    const response = await api.delete(`/Module/delete/${moduleId}`);
    return response.data;
  },

  getModulesByCourse: async (courseId) => {
    const response = await api.get(`/Module/get-by-course/${courseId}`);
    return response.data;
  },

  getModuleById: async (id) => {
    const response = await api.get(`/Module/get-by-id/${id}`);
    return response.data;
  },

  saveModule: async (moduleData) => {
    const formattedData = {
      id: moduleData.id || 0,
      name: moduleData.name,
      url: moduleData.url,
      description: moduleData.description,
      position: moduleData.position || 0,
      releaseDate: moduleData.releaseDate || new Date().toISOString(),
      courseId: moduleData.courseId,
      type: moduleData.moduleType,
    };

    const response = await api.post("/Module/save", formattedData);
    return response.data;
  },

  submitModule: async (id) => {
    const response = await api.post(`/UserModule/submit/${id}`, {});
    return response.data;
  },

  startUserModule: async (moduleId) => {
    const response = await api.post(`/UserModule/start/${moduleId}`);
    return response.data;
  },

  getModuleStatus: async (moduleId) => {
    const response = await api.get(`/UserModule/get-by/${moduleId}`);
    return response.data;
  },

  updateLastPlayPosition: async (userModuleId, lastPlayPosition) => {
    const response = await api.post('/UserModule/update-last-play-position', {
      id: userModuleId,
      lastPlayPosition
    });
    return response.data;
  },

  updateFullVideoWatched: async (userModuleId, isFullVideoWatched) => {
    const response = await api.post('/UserModule/update-full-video-watched-status', {
      id: userModuleId,
      isFullVideoWatched
    });
    return response.data;
  },

  // Guest-specific module operations
  guestGetModulesByCourse: async (courseId) => {
    try {
      const response = await api.get(`/GuestCourse/get-modules-by-course/${courseId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching guest course modules:", error);
      throw error;
    }
  },

  guestSaveModule: async (moduleData) => {
    try {
      const response = await api.post("/GuestCourse/save-module", moduleData);
      return response.data;
    } catch (error) {
      console.error("Error saving guest module:", error);
      throw error;
    }
  },
};
