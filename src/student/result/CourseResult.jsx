import CongratulationsBanner from '../components/common/CongratulationsBanner';
import FailedBanner from '../components/common/FailedBanner';
import useCourseStore from '../store/useCourseStore';
import { ResultStatus } from '../../helpers/enums';

const CourseResult = () => {
  const { courseSubmissionResult } = useCourseStore();

  if (courseSubmissionResult?.status === ResultStatus.Pass) {
    return <CongratulationsBanner result={courseSubmissionResult} />;
  } else if (courseSubmissionResult?.status === ResultStatus.Fail) {
    return <FailedBanner result={courseSubmissionResult} />;
  }
};

export default CourseResult;