import CourseHeading from "./CourseHeading";
import CourseInfoTable from "./CourseInfoTable";
import CourseIntro from "./CourseIntro";
import CourseUserInfo from "./CourseUserInfo";

const CourseOverview = () => {
  return (
    <div className="bg-light-bg text-black rounded-lg shadow-md p-4 sm:p-8 mx-2 sm:mx-4 my-6 overflow-y-auto overflow-x-hidden h-[80vh]">
      <CourseHeading />
      <CourseIntro />
      <hr />
      <div className="mx-auto w-full px-2 sm:px-4 mb-8">
        <CourseUserInfo />
        <CourseInfoTable />
      </div>
    </div>
  );
};

export default CourseOverview;
