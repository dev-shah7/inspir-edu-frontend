import { useState } from "react";
import { FiCheck, FiChevronDown, FiChevronUp } from "react-icons/fi";

const SubscriptionPlanForm = ({ selectedPlan, setSelectedPlan }) => {
  const [expandedPlan, setExpandedPlan] = useState(null);

  const plans = [
    {
      id: 1,
      name: "Basic",
      price: "$10/month",
      description: "Perfect for small businesses just getting started",
      features: [
        "Up to 10 courses",
        "Basic analytics",
        "Email support",
        "1 admin user",
      ],
      detailedFeatures: {
        "Course Management": [
          "Create up to 10 courses",
          "Basic course templates",
          "Standard quiz options",
          "Basic file uploads",
        ],
        "Analytics & Reporting": [
          "Basic user tracking",
          "Simple progress reports",
          "Monthly usage statistics",
          "Basic export options",
        ],
        Support: [
          "Email support (24-48h response)",
          "Knowledge base access",
          "Community forum access",
          "Basic onboarding guide",
        ],
      },
      recommended: false,
    },
    {
      id: 2,
      name: "Pro",
      price: "$20/month",
      description: "Ideal for growing organizations",
      features: [
        "Up to 50 courses",
        "Advanced analytics",
        "Priority support",
        "5 admin users",
        "Custom branding",
      ],
      detailedFeatures: {
        "Course Management": [
          "Create up to 50 courses",
          "Advanced course templates",
          "Advanced quiz types",
          "Large file uploads",
          "Course scheduling",
        ],
        "Analytics & Reporting": [
          "Advanced user tracking",
          "Detailed progress reports",
          "Real-time statistics",
          "Custom report builder",
          "Data visualization",
        ],
        Support: [
          "Priority email support (12h response)",
          "Phone support",
          "Dedicated account manager",
          "Custom onboarding",
        ],
      },
      recommended: true,
    },
    {
      id: 3,
      name: "Enterprise",
      price: "$50/month",
      description: "For large organizations with advanced needs",
      features: [
        "Unlimited courses",
        "Full analytics suite",
        "24/7 support",
        "Unlimited admin users",
        "Custom branding",
        "API access",
      ],
      detailedFeatures: {
        "Course Management": [
          "Unlimited courses",
          "Custom course templates",
          "Advanced assessment tools",
          "Unlimited storage",
          "Advanced scheduling",
          "White-labeling",
        ],
        "Analytics & Reporting": [
          "Full analytics suite",
          "Custom dashboards",
          "AI-powered insights",
          "Advanced API access",
          "Custom integrations",
        ],
        Support: [
          "24/7 premium support",
          "Dedicated success team",
          "Custom training sessions",
          "SLA guarantees",
          "Priority bug fixes",
        ],
      },
      recommended: false,
    },
  ];

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

      <div className="space-y-4">
        {plans.map((plan) => (
          <div key={plan.id} className="border rounded-lg overflow-hidden">
            {/* Plan Header - Always Visible */}
            <div
              className={`flex items-center justify-between p-4 cursor-pointer ${
                selectedPlan === plan.id ? "bg-blue-50" : "bg-white"
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
                    {plan.name}
                    {plan.recommended && (
                      <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        Recommended
                      </span>
                    )}
                  </h4>
                  <p className="text-gray-600">{plan.price}</p>
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
                    {plan.features.map((feature, index) => (
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
                  {Object.entries(plan.detailedFeatures).map(
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
    </div>
  );
};

export default SubscriptionPlanForm;
