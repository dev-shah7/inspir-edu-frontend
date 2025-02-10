import SubscriptionPlanForm from "./SubscriptionPlanForm";
import { subscriptionService } from "../../services/api/subscriptionService";
import { useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState } from 'react';

const SubscriptionPlan = ({ selectedPlan, setSelectedPlan, userId }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscription = async () => {
    if (!selectedPlan) {
      toast.error('Please select a subscription plan to continue');
      return;
    }

    setIsLoading(true);
    
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
    } finally {
      setIsLoading(false);
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
          disabled={isLoading}
          className={`
            w-64 h-14 text-xl font-semibold
            bg-gradient-to-r from-blue-600 to-blue-500
            text-white px-8 py-3 rounded-xl
            shadow-lg transform transition-all duration-200
            ${isLoading 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:scale-105 hover:shadow-xl hover:from-blue-700 hover:to-blue-600 active:scale-95'
            }
          `}
        >
          {isLoading ? 'Processing...' : 'Choose Plan'}
        </button>
      </div>
    </div>
  );
};

export default SubscriptionPlan;
