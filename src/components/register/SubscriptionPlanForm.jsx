import { useEffect, useState } from "react";
import { FiCheck, FiChevronDown, FiChevronUp } from "react-icons/fi";
import useAuthStore from "../../store/auth/useAuthStore";
import Loader from "../../components/common/Loader/Loader";

const SubscriptionPlanForm = ({ selectedPlan, setSelectedPlan }) => {
  const [expandedPlan, setExpandedPlan] = useState(null);
  const { fetchSubscriptionPlans, subscriptionPlans, isLoading, error } =
    useAuthStore();

  const fetchPlans = async () => {
    try {
      await fetchSubscriptionPlans();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!subscriptionPlans || subscriptionPlans.length === 0) {
      fetchPlans();
    }
  }, [subscriptionPlans, fetchPlans]);

  const togglePlan = (planId) => {
    setExpandedPlan(expandedPlan === planId ? null : planId);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-gray-800 transition-all duration-300 hover:text-blue-600">
          Choose Your Plan
        </h3>
        <p className="text-gray-600 mt-3 text-lg">
          Select the best plan for your needs
        </p>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="space-y-6">
          {subscriptionPlans.map((plan) => (
            <div 
              key={plan.id} 
              className="border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Plan Header - Always Visible */}
              <div
                className={`flex items-center justify-between p-6 cursor-pointer transition-colors duration-200 ${
                  selectedPlan === plan.id 
                    ? "bg-blue-50 hover:bg-blue-100" 
                    : "bg-white hover:bg-gray-50"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPlan(plan.id);
                  // togglePlan(plan.id);
                }}
              >
                <div className="flex items-center space-x-5">
                  <div className="flex-shrink-0">
                    <input
                      type="radio"
                      checked={selectedPlan === plan.id}
                      readOnly
                      className="w-5 h-5 text-blue-600 transition-all duration-200 cursor-pointer"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold flex items-center">
                      {plan.title}
                      {plan.recommended && (
                        <span className="ml-2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full animate-pulse">
                          Recommended
                        </span>
                      )}
                    </h4>
                    <p className="text-gray-600 text-lg">${plan.rate}/month</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="p-2 hover:bg-blue-100 rounded-full transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlan(plan.id);
                  }}
                >
                  {expandedPlan === plan.id ? (
                    <FiChevronUp className="w-12 h-12 text-blue-600" />
                  ) : (
                    <FiChevronDown className="w-12 h-12 text-blue-600" />
                  )}
                </button>
              </div>

              {/* Expanded Content */}
              {expandedPlan === plan.id && (
                <div className="border-t p-6 bg-gray-50 transition-all duration-300 animate-fadeIn">
                  <p className="text-base text-gray-600 mb-6">{plan.description}</p>

                  {/* Key Features */}
                  <div className="mb-8">
                    <h5 className="font-semibold text-lg mb-4">Key Features</h5>
                    <div className="grid grid-cols-2 gap-4">
                      {plan?.features?.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
                        >
                          <FiCheck className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-base">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Detailed Features */}
                  <div className="space-y-6">
                    {Object.entries(plan?.detailedFeatures).map(
                      ([category, items]) => (
                        <div key={category}>
                          <h5 className="font-semibold text-lg mb-4">{category}</h5>
                          <div className="grid grid-cols-2 gap-4">
                            {items.map((item, index) => (
                              <div
                                key={index}
                                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
                              >
                                <FiCheck className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                                <span className="text-base">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubscriptionPlanForm;
