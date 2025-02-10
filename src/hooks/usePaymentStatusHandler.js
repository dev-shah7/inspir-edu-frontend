import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { PaymentStatus } from '../helpers/enums';
import { authService } from '../services/api/authService';

export const usePaymentStatusHandler = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Only proceed if sessionId parameter exists in URL
    if (!searchParams.has('sessionid')) {
      return;
    }

    const handlePaymentStatus = async () => {
      const sessionId = searchParams.get('sessionid');
      const userId = searchParams.get('userId');
      const isNewSubscription = searchParams.get('isNewSubscription');
      
      if (!sessionId || !userId) {
        console.log("Invalid payment session parameters");
        toast.error("Invalid payment session parameters");
        return;
      }

      try {
        const response = await authService.updatePaymentStatus(
          sessionId,
          userId,
          isNewSubscription === 'True'
        );
        
        if (response.isSuccess) {
          toast.success('Subscription completed successfully!');
        } else {
          toast.error('Payment was not successful');
        }
      } catch (error) {
        await authService.updatePaymentStatus(
          sessionId,
          userId,
          isNewSubscription === 'True'
        );
        console.error('Failed to update payment status:', error);
        toast.error('Failed to update payment status');
      }
    };

    handlePaymentStatus();
  }, [searchParams]);
}; 