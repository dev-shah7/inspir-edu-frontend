import { useNavigate, useParams, useSearchParams } from 'react-router';
import { toast } from 'react-hot-toast';
import ProgressBar from '../components/common/ProgressBar';
import Module from './Module';
import useCourseStore from '../store/useCourseStore';
import Loader from '../../components/common/Loader/Loader';
import { CourseEnrollmentStatus, ResultStatus } from '../../helpers/enums';
import CongratulationsBanner from '../components/common/CongratulationsBanner';
import FailedBanner from '../components/common/FailedBanner';
import { useEffect, useState } from 'react';
import DeadlineCountdown from '../components/common/DeadlineCountdown';
import ConfirmationDialog from '../../components/common/ConfirmationDialog/DialogBox';

const ModuleList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isSubmitted = searchParams.get('isSubmitted') === 'true';
  const { courseId } = useParams();
  const { currentCourse, submitCourse, isLoading, getEnrolledCourse, clearSubmissionResult, courseSubmissionResult } = useCourseStore();
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);

  useEffect(() => {
    if (!currentCourse && courseId) {
      getEnrolledCourse(courseId);
    }
  }, [getEnrolledCourse, currentCourse, courseId])

  // Add effect to check if last module was just completed
  useEffect(() => {
    if (currentCourse?.userModules) {
      const allModules = currentCourse.userModules;
      const lastModule = allModules[allModules.length - 1];
      const isLastModuleCompleted = lastModule?.status === 2;
      const areAllModulesCompleted = allModules.every((module) => module.status === 2);
      
      if (isLastModuleCompleted && areAllModulesCompleted && 
          currentCourse.enrollmentStatus !== CourseEnrollmentStatus.Completed && 
          currentCourse.enrollmentStatus !== CourseEnrollmentStatus.DeadlineCrossed) {
        setShowSubmitDialog(true);
      }
    }
  }, [currentCourse]);

  const handleCourseSubmission = async () => {
    try {
      setSubmissionError(false);
      await submitCourse(currentCourse?.courseId);
      navigate(`/student/courses/${courseId}/result`);
    } catch (error) {
      console.error('Error submitting the course:', error);
      setSubmissionError(true);
      toast.error('Failed to submit the course. Please try again.');
    }
  };

  const areAllModulesCompleted = () => {
    return currentCourse?.userModules?.every((module) => module.status === 2);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <ConfirmationDialog
        isOpen={showSubmitDialog}
        title="Submit Course"
        message={
          submissionError 
            ? "There was an error submitting your course. Would you like to try again?"
            : isSubmitted 
              ? "Congratulations! You've completed all modules. Would you like to submit the course now?" 
              : "You did not submit the course. Would you like to submit the course?"
        }
        onConfirm={() => {
          setShowSubmitDialog(false);
          handleCourseSubmission();
        }}
        onCancel={() => {
          setShowSubmitDialog(false);
          setSubmissionError(false);
        }}
      />
      {currentCourse?.deadLineDate && !currentCourse?.resultDetail && (
        <div className='mb-6'>
          <DeadlineCountdown
            course={currentCourse}
            courseSubmissionResult={courseSubmissionResult}
          />
        </div>
      )}
      <div className='p-2'>
        {currentCourse?.resultDetail?.status === ResultStatus.Pass && (
          <CongratulationsBanner result={currentCourse?.resultDetail} />
        )}
        {currentCourse?.resultDetail?.status === ResultStatus.Fail && (
          <FailedBanner result={currentCourse?.resultDetail} />
        )}

        <div className='flex flex-col lg:flex-row lg:justify-between items-center bg-light-bg shadow-md rounded-lg p-6 mb-6 gap-6'>
          <p className='font-bold text-3xl w-full text-center md:w-auto md:text-left'>
            Course Overall Score
          </p>

          <div className='w-auto xl:w-full'>
            <ProgressBar
              label='Overall Progress'
              percentage={Number(
                (currentCourse?.analytics.totalCompleted /
                  currentCourse?.analytics.totalModules) *
                100
              ).toFixed(2)}
              color='bg-button-blue'
              showPercentage={true}
            />
          </div>
          <div className='w-auto xl:w-full'>
            <ProgressBar
              label='Passing Percentage'
              percentage={currentCourse?.passingPercentage}
              color='bg-yellow-500'
              showPercentage={true}
            />
          </div>
          {currentCourse?.enrollmentStatus !== CourseEnrollmentStatus.Completed ? (
            <>
              <button
                className={`p-5 rounded-md mt-1 text-xl font-semibold shadow-lg ${areAllModulesCompleted() && currentCourse?.enrollmentStatus !== CourseEnrollmentStatus.DeadlineCrossed ? 'bg-button-blue text-white' : 'bg-gray-200 text-gray-400'
                  }`}
                onClick={handleCourseSubmission}
                disabled={!areAllModulesCompleted() || currentCourse?.enrollmentStatus === CourseEnrollmentStatus.DeadlineCrossed}
              >
                Submit Course
              </button>
            </>
          ) : (
            currentCourse?.resultDetail?.percentage && currentCourse?.enrollmentStatus === CourseEnrollmentStatus?.Completed && (
              <div className='w-auto xl:w-full'>
                <ProgressBar
                  label='Achieved Percentage'
                  percentage={currentCourse?.resultDetail?.percentage}
                  color={
                    currentCourse?.resultDetail?.status === 1
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
          {currentCourse?.userModules?.map((module, index) => (
            <Module key={index} module={module} position={index} isPreviousModuleCompleted={
              index === 0 || currentCourse?.userModules[index - 1]?.status === 2
            } courseId={courseId} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ModuleList;