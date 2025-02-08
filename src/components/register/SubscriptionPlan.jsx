import SubscriptionPlanForm from "./SubscriptionPlanForm";
import { subscriptionService } from "../../services/api/subscriptionService";
import { useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

const SubscriptionPlan = ({ selectedPlan, setSelectedPlan, userId }) => {
  const location = useLocation();

  const handleSubscription = async () => {
    if (!selectedPlan) {
      toast.error('Please select a subscription plan to continue');
      return;
    }

    try {
      const baseUrl = window.location.origin;
      const currentPath = location.pathname;
      
      const response = await subscriptionService.createNewSubscription(
        selectedPlan,
        `${baseUrl}${currentPath}`,
        `${baseUrl}${currentPath}`
      );

      // Redirect to Stripe checkout
      console.log(response);
      if (response?.data?.sessionUrl) {
        window.location.href = response.data.sessionUrl;
      }
    } catch (error) {
      console.error("Subscription creation failed:", error);
      toast.error('Failed to create subscription. Please try again.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 overflow-auto max-h-[calc(100vh-100px)]">
      <SubscriptionPlanForm 
        selectedPlan={selectedPlan}
        setSelectedPlan={setSelectedPlan}
        onSubscribe={handleSubscription}
      />
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleSubscription}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Choose Plan
        </button>
      </div>
    </div>
  );
};

export default SubscriptionPlan;
