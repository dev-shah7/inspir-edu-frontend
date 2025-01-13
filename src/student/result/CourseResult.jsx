import CongratulationsBanner from '../components/common/CongratulationsBanner';
import FailedBanner from '../components/common/FailedBanner';
import useCourseStore from '../store/useCourseStore';
import { ResultStatus } from '../../helpers/enums';
import { useEffect } from 'react';
import useAuthStore from '../../store/auth/useAuthStore';
import { sendAdminCourseSubmissionEmail, sendStudentCourseSubmissionEmail } from '../../services/emailjs/emailService';

const CourseResult = () => {
  const { currentCourse, courseSubmissionResult } = useCourseStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (courseSubmissionResult) {
      const message = `You have ${courseSubmissionResult.percentage >= currentCourse?.passingPercentage
        ? "successfully passed"
        : "failed"} the course. 
        You answered ${courseSubmissionResult.totalCorrectAnswers} out of ${courseSubmissionResult.totalQuestions
        } questions correctly and secured ${courseSubmissionResult.percentage}%.`;

      const adminMessage = `${user?.name} has ${courseSubmissionResult.percentage >= currentCourse?.passingPercentage
        ? "successfully passed"
        : "failed"} the course and ${user?.name} answered ${courseSubmissionResult.totalCorrectAnswers} out of ${courseSubmissionResult.totalQuestions
        } questions correctly and secured ${courseSubmissionResult.percentage}%.`;

      // Send emails without awaiting them
      Promise.all([
        sendAdminCourseSubmissionEmail({
          from_name: "inspirEDU",
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
  }, [courseSubmissionResult])

  if (courseSubmissionResult?.status === ResultStatus.Pass) {
    return <CongratulationsBanner result={courseSubmissionResult} />;
  } else if (courseSubmissionResult?.status === ResultStatus.Fail) {
    return <FailedBanner result={courseSubmissionResult} />;
  }
};

export default CourseResult;