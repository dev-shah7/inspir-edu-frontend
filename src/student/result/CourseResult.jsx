import CongratulationsBanner from '../components/common/CongratulationsBanner';
import FailedBanner from '../components/common/FailedBanner';
import useCourseStore from '../store/useCourseStore';
import { ResultStatus } from '../../helpers/enums';
import { useEffect } from 'react';
import useAuthStore from '../../store/auth/useAuthStore';
import { sendAdminCourseSubmissionEmail, sendStudentCourseSubmissionEmail } from '../../services/emailjs/emailService';
import { useNavigate, useParams } from 'react-router';

const CourseResult = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { currentCourse, courseSubmissionResult, clearCurrentCourse } = useCourseStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (courseSubmissionResult && user) {
      const message = `You have ${courseSubmissionResult.percentage >= currentCourse?.passingPercentage
        ? "successfully passed"
        : "failed"} the course. 
        You answered ${courseSubmissionResult.totalCorrectAnswers} out of ${courseSubmissionResult.totalQuestions
        } questions correctly and secured ${courseSubmissionResult.percentage}%.`;

      const adminMessage = `${user?.email} has ${courseSubmissionResult.percentage >= currentCourse?.passingPercentage
        ? "successfully passed"
        : "failed"} the course and ${user?.email} answered ${courseSubmissionResult.totalCorrectAnswers} out of ${courseSubmissionResult.totalQuestions
        } questions correctly and secured ${courseSubmissionResult.percentage}%.`;

      // Send emails without awaiting them
      Promise.all([
        sendAdminCourseSubmissionEmail({
          customer_email: user?.email,
          to_admin_email: currentCourse?.createdByEmail,
          course_name: currentCourse?.courseName,
          to_name: currentCourse?.createdByName,
          reply_to: "syed@breakthroughsystems.com",
          message: adminMessage,
        }),
        sendStudentCourseSubmissionEmail({
          user_email: user?.email,
          course_name: currentCourse?.courseName,
          message: message,
        })
      ]).catch(emailError => {
        console.error('Error sending submission emails:', emailError);
      });
    }
    else {
      clearCurrentCourse();
      navigate(`/student/courses/${courseId}/modules`)
    }
  }, [courseSubmissionResult]);

  const renderBackButton = () => (
    <button
      onClick={() => {
        clearCurrentCourse();
        navigate(`/student/courses/${courseId}/modules`)
      }}
      className="bg-gray-800 text-white text-xl px-4 py-2 rounded-md m-5"
    >
      Back to Modules List
    </button>
  );

  if (courseSubmissionResult?.status === ResultStatus.Pass) {
    return (
      <>
        {renderBackButton()}
        <CongratulationsBanner result={courseSubmissionResult} />
      </>
    );
  } else if (courseSubmissionResult?.status === ResultStatus.Fail) {
    return (
      <>
        {renderBackButton()}
        <FailedBanner result={courseSubmissionResult} />
      </>
    );
  }
};

export default CourseResult;