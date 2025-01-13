import React, { useState, useEffect } from 'react';

const DeadlineCountdown = ({ course, courseSubmissionResult }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // Only run the logic if course?.resultDetail and courseSubmissionResult are falsy
    if (!course?.resultDetail && !courseSubmissionResult) {
      const calculateTimeLeft = () => {
        const now = new Date();
        const endDate = course?.deadLineDate instanceof Date
          ? course?.deadLineDate
          : new Date(course?.deadLineDate + 'Z');

        const difference = endDate.getTime() - now.getTime();

        if (difference > 0) {
          setTimeLeft({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          });
          setIsExpired(false);
        } else {
          setIsExpired(true);
        }
      };

      calculateTimeLeft();  // Calculate the initial time left
      const timer = setInterval(calculateTimeLeft, 1000);  // Start the interval

      return () => clearInterval(timer);  // Cleanup the interval on component unmount
    }
  }, [course?.deadLineDate, course?.resultDetail, courseSubmissionResult]);  // Add dependencies to rerun the effect when needed



  const FlipCard = ({ value, label }) => (
    <div className='flex flex-col items-center mx-2'>
      <div
        className='relative bg-gray-800 rounded-lg p-4 w-20 h-24 flex items-center justify-center
                    shadow-lg transform perspective-1000'
      >
        <div className='text-3xl font-bold text-white font-mono'>
          {String(value).padStart(2, '0')}
        </div>
        {/* Flip animation overlay */}
        <div
          className='absolute inset-0 bg-gradient-to-b from-black/20 to-transparent 
                      rounded-lg pointer-events-none'
        ></div>
      </div>
      <span className='text-sm text-gray-600 mt-2 font-semibold'>{label}</span>
    </div>
  );

  return (
    <div className='flex flex-col items-center justify-center p-8 bg-gray-100 rounded-xl shadow-md'>
      {isExpired && !course?.resultDetail && (
        <>
          <h1 className='text-4xl font-bold mb-2 text-red-600'>
            Deadline Crossed
          </h1>
          <p className='text-lg mb-6 text-red-600'>
            Please contact your instructor to restart the deadline @{course?.createdByEmail}
          </p>
        </>
      )}

      <h1 className='text-4xl font-bold mb-6 text-gray-800'>
        Deadline Countdown
      </h1>
      <div className='flex flex-wrap justify-center gap-y-4'>
        <FlipCard value={timeLeft.days} label='Days' />
        <FlipCard value={timeLeft.hours} label='Hours' />
        <FlipCard value={timeLeft.minutes} label='Minutes' />
        <FlipCard value={timeLeft.seconds} label='Seconds' />
      </div>
    </div>
  );
};

export default DeadlineCountdown;