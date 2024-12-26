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
    };

    const response = await api.post("/Module/save", formattedData);
    return response.data;
  },
};
