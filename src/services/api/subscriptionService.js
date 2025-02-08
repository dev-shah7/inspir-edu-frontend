import api from "./axios";

export const subscriptionService = {
  createNewSubscription: async (subscriptionPlanId, successUrl, cancelUrl) => {
    try {
      const response = await api.post("/Subscription/new-subscription", {
        subscriptionPlanId,
        successUrl,
        cancelUrl
      });
      return response.data;
    } catch (error) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error("Failed to create new subscription");
    }
  }
}; 