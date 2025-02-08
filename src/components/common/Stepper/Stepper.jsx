import React from "react";

const Stepper = ({ currentStep }) => {
  const steps = [
    { number: 1, title: "User Details" },
    { number: 2, title: "Company Info" },
    // { number: 3, title: "Subscription" },
  ];

  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            {/* Step Circle */}
            <div className="relative">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step.number
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {step.number}
              </div>
              <div className="absolute -bottom-6 w-max text-center left-1/2 -translate-x-1/2">
                <span
                  className={`text-sm ${
                    currentStep >= step.number
                      ? "text-blue-500 font-medium"
                      : "text-gray-500"
                  }`}
                >
                  {step.title}
                </span>
              </div>
            </div>
            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`w-20 h-1 mx-2 ${
                  currentStep > step.number ? "bg-blue-500" : "bg-gray-200"
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
