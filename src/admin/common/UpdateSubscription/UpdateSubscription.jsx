import React from 'react';
import SubscriptionPlan from '../../../components/register/SubscriptionPlan';

const UpdateSubscription = ({ 
  isOpen, 
  onClose, 
  selectedPlan, 
  setSelectedPlan, 
  userId 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 my-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Upgrade Subscription</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
          <SubscriptionPlan 
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
            userId={userId}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateSubscription;
