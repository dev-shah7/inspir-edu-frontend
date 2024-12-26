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
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800">Choose Your Plan</h3>
        <p className="text-gray-600 mt-2">
          Select the best plan for your needs
        </p>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="space-y-4">
          {subscriptionPlans.map((plan) => (
            <div key={plan.id} className="border rounded-lg overflow-hidden">
              {/* Plan Header - Always Visible */}
              <div
                className={`flex items-center justify-between p-4 cursor-pointer ${selectedPlan === plan.id ? "bg-blue-50" : "bg-white"
                  }`}
                onClick={() => togglePlan(plan.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <input
                      type="radio"
                      checked={selectedPlan === plan.id}
                      onChange={() => setSelectedPlan(plan.id)}
                      className="w-4 h-4 text-blue-600"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold flex items-center">
                      {plan.title}
                      {plan.recommended && (
                        <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                          Recommended
                        </span>
                      )}
                    </h4>
                    <p className="text-gray-600">{plan.rate}$/month</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="p-2 hover:bg-gray-100 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlan(plan.id);
                  }}
                >
                  {expandedPlan === plan.id ? (
                    <FiChevronUp className="w-6 h-6" />
                  ) : (
                    <FiChevronDown className="w-6 h-6" />
                  )}
                </button>
              </div>

              {/* Expanded Content */}
              {expandedPlan === plan.id && (
                <div className="border-t p-4 bg-gray-50">
                  <p className="text-sm text-gray-600 mb-4">{plan.description}</p>

                  {/* Key Features */}
                  <div className="mb-6">
                    <h5 className="font-semibold mb-2">Key Features</h5>
                    <div className="grid grid-cols-2 gap-2">
                      {plan?.features?.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center text-gray-600"
                        >
                          <FiCheck className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Detailed Features */}
                  <div className="space-y-4">
                    {Object.entries(plan?.detailedFeatures).map(
                      ([category, items]) => (
                        <div key={category}>
                          <h5 className="font-semibold mb-2">{category}</h5>
                          <div className="grid grid-cols-2 gap-2">
                            {items.map((item, index) => (
                              <div
                                key={index}
                                className="flex items-center text-gray-600"
                              >
                                <FiCheck className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                <span className="text-sm">{item}</span>
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
