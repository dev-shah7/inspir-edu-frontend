const Score = ({ totalCorrectAnswers, totalQuestions, isFailed = false }) => {
  const finalResult = `${totalCorrectAnswers}/${totalQuestions}` || 'N/A';

  const textColorClass = isFailed ? 'text-red-600' : 'text-green-600';

  return (
    <div className='text-center flex flex-col md:flex-row items-center px-4 md:px-8 space-y-4 md:space-y-0 md:space-x-4'>
      <div className={`text-4xl sm:text-5xl font-bold ${textColorClass}`}>
        🎯
      </div>
      <div>
        <p className='text-md sm:text-lg text-gray-700'>Your Score</p>
        <p className={`text-xl sm:text-2xl font-bold ${textColorClass}`}>
          {finalResult}
        </p>
      </div>
    </div>
  );
};

export default Score;