import api from "./axios";

export const companyService = {
  getCompanyDetails: async (companyId) => {
    return await api.get(`/Company/get-detail`);
  },
};
