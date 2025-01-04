import Percentage from './Percentage';
import Score from './Score';

const FailedBanner = ({ result }) => {
  return (
    <div className='p-6 sm:p-12 my-5 bg-light-bg rounded-lg shadow-md max-w-3xl mx-auto flex flex-col items-center space-y-8'>
      <div className='text-center'>
        <h2 className='text-3xl sm:text-5xl text-red-600 mb-3'>
          Course Failed
        </h2>
        <p className='text-lg sm:text-xl text-gray-700'>
          Unfortunately, you did not pass the course. Consult your instructor to
          re-take the course.
        </p>
      </div>

      <div className='py-8 flex flex-col md:flex-row items-center justify-evenly w-full md:space-x-8'>
        <Percentage percentage={result?.percentage} isFailed={true} />
        <div className='hidden md:block border-l border-gray-300 h-24'></div>
        <Score
          totalCorrectAnswers={result?.totalCorrectAnswers}
          totalQuestions={result?.totalQuestions}
          isFailed={true}
        />
      </div>
    </div>
  );
};

export default FailedBanner;