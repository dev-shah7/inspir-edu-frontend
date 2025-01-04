import Percentage from './Percentage';
import Score from './Score';

const CongratulationsBanner = ({ result }) => {

  return (
    <div className='p-6 sm:p-12 my-5 bg-light-bg rounded-lg shadow-md max-w-3xl mx-auto flex flex-col items-center space-y-8'>
      <div className='text-center'>
        <h2 className='text-3xl sm:text-5xl text-green-600'>
          Congratulations!
        </h2>
        <p className='text-lg sm:text-xl text-gray-700'>
          You have passed the course.
        </p>
      </div>

      <div className='py-8 flex flex-col md:flex-row items-center justify-evenly w-full md:space-x-8'>
        <Percentage percentage={result?.percentage} />

        <div className='hidden md:block border-l border-gray-300 h-24'></div>

        <Score
          totalCorrectAnswers={result?.totalCorrectAnswers}
          totalQuestions={result?.totalQuestions}
        />
      </div>
    </div>
  );
};

export default CongratulationsBanner;