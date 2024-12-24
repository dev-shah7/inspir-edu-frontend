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

  createModule: async (moduleData) => {
    const formattedData = {
      id: 0, // For new modules
      name: moduleData.name,
      url: moduleData.url,
      description: moduleData.description,
      position: 0, // You might want to calculate this based on existing modules
      releaseDate: new Date().toISOString(),
      courseId: moduleData.courseId,
    };

    const response = await api.post("/Module/save", formattedData);
    return response.data;
  },

  updateModule: async (moduleId, moduleData) => {
    const formattedData = {
      id: moduleId,
      name: moduleData.name,
      url: moduleData.url,
      description: moduleData.description,
      position: moduleData.position || 0,
      releaseDate: moduleData.releaseDate || new Date().toISOString(),
      courseId: moduleData.courseId,
    };

    const response = await api.put(`/Module/${moduleId}`, formattedData);
    return response.data;
  },

  deleteModule: async (moduleId) => {
    const response = await api.delete(`/Module/${moduleId}`);
    return response.data;
  },

  getModulesByCourse: async (courseId) => {
    const response = await api.get(`/Module/get-by-course/${courseId}`);
    return response.data;
  },

  getModule: async (moduleId) => {
    const response = await api.get(`/Module/${moduleId}`);
    return response.data;
  },
};
