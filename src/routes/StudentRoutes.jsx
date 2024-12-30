import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../auth/PrivateRoute";
import Layout from "../components/Layout/Layout";
import CourseList from "../student/courses/CourseList";
import CourseContent from "../student/components/Course/CourseContent";
import CourseOverview from "../student/courses/Overview/CourseOverview";
import ModuleList from "../student/modules/ModuleList";
import ModuleMedia from "../student/modules/ModuleMedia";
import QuestionsList from "../student/questions/QuestionsList";
import CongratulationsBanner from "../student/components/common/CongratulationsBanner";
import Support from "../components/common/Support/Support";
import CourseResult from '../student/result/CourseResult';

const StudentRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute roleRequired="student" />}>
        <Route path="/" element={<Layout userRole="student" />}>
          <Route index element={<CourseList />} />
          <Route path="myCourses" element={<CourseList />} />
          <Route path="courses/:courseId/overview" element={
            <CourseContent>
              <CourseOverview />
            </CourseContent>} />
          <Route path="courses/:courseId/modules" element={
            <CourseContent>
              <ModuleList />
            </CourseContent>
          } />
          <Route path='modules/:moduleId/media' element={<ModuleMedia />} />
          <Route path="modules/:moduleId/questions" element={
            <CourseContent showNav={false}>
              <QuestionsList />
            </CourseContent>} />
          {/* <Route path="courses/modules/dashboard" element={<ModulesDashboard />} /> */}
          <Route
            path='courses/result'
            element={
              <CourseContent showNav={false}>
                <CourseResult />
              </CourseContent>
            }
          />
          <Route path="/support" element={<Support />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default StudentRoutes;
