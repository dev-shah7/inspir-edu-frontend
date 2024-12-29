import { useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';
import ProgressBar from '../components/common/ProgressBar';
import Module from './Module';
import useCourseStore from '../store/useCourseStore';
import Loader from '../../components/common/Loader/Loader';
import { CourseEnrollmentStatus, ResultStatus } from '../../helpers/enums';
import CongratulationsBanner from '../components/common/CongratulationsBanner';
import FailedBanner from '../components/common/FailedBanner';


const ModuleList = () => {
  const navigate = useNavigate();
  const { currentCourse, submitCourse, isLoading } = useCourseStore();


  const handleCourseSubmission = async () => {
    try {
      await submitCourse(currentCourse.courseId);
      navigate('/student/courses/result');
    } catch (error) {
      console.error('Error submitting the course:', error);
      toast.error('Failed to submit the course. Please try again.');
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className='p-2'>
      {currentCourse.resultDetail?.status === ResultStatus.Pass && (
        <CongratulationsBanner result={currentCourse.resultDetail} />
      )}
      {currentCourse.resultDetail?.status === ResultStatus.Fail && (
        <FailedBanner result={currentCourse.resultDetail} />
      )}

      <div className='flex flex-col lg:flex-row lg:justify-between items-center bg-light-bg shadow-md rounded-lg p-6 mb-6 gap-6'>
        <h1 className='font-bold text-xl w-full text-center md:w-auto md:text-left'>
          Course Overall Score
        </h1>

        <div className='w-full md:w-auto'>
          <ProgressBar
            label='Overall Progress'
            percentage={Number(
              (currentCourse.analytics.totalCompleted /
                currentCourse.analytics.totalModules) *
              100
            ).toFixed(2)}
            color='bg-button-blue'
            showPercentage={true}
          />
        </div>

        {currentCourse.enrollmentStatus !== CourseEnrollmentStatus.Completed ? (
          <>
            <div className='w-full md:w-auto'>
              <ProgressBar
                label='Passing Percentage'
                percentage={currentCourse.passingPercentage}
                color='bg-yellow-500'
                showPercentage={true}
              />
            </div>
            <button
              className={`px-12 py-5 rounded-md mt-1 text-md font-semibold shadow-lg ${true ? 'bg-button-blue text-white' : 'bg-gray-200 text-gray-400'
                }`}
              onClick={handleCourseSubmission}
            >
              Submit
            </button>
          </>
        ) : (
          currentCourse.resultDetail?.percentage && currentCourse.enrollmentStatus === CourseEnrollmentStatus.Completed && (
            <div className='w-full md:w-auto'>
              <ProgressBar
                label='Achieved Percentage'
                percentage={currentCourse.resultDetail.percentage}
                color={
                  currentCourse.resultDetail.status === 1
                    ? 'bg-button-green'
                    : 'bg-red-500'
                }
                showPercentage={true}
              />
            </div>
          )
        )}
      </div>

      <div className='space-y-4'>
        {currentCourse?.userModules.map((module, index) => (
          <Module key={index} module={module} position={index} />
        ))}
      </div>
    </div>
  );
};

export default ModuleList;