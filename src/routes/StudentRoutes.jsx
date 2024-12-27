import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../auth/PrivateRoute";
import Layout from "../components/Layout/Layout";
import CourseList from "../student/courses/CourseList";
import CourseContent from "../student/components/Course/CourseContent";
import CourseOverview from "../student/courses/Overview/CourseOverview";
import ModuleList from "../student/modules/ModuleList";
import QuestionsList from "../student/questions/QuestionsList";
import CongratulationsBanner from "../student/components/common/CongratulationsBanner";
import Support from "../components/common/Support/Support";

const StudentRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute roleRequired="student" />}>
        <Route path="/" element={<Layout userRole="student" />}>
          <Route index element={<h2>Student Dashboard</h2>} />
          <Route path="courses" element={<CourseList />} />
          <Route
            path="courses/:courseId/overview"
            element={
              <CourseContent>
                <CourseOverview />
              </CourseContent>
            }
          />
          <Route
            path="courses/:courseId/modules"
            element={
              <CourseContent>
                <ModuleList />
              </CourseContent>
            }
          />
          <Route
            path="modules/:moduleId/questions"
            element={
              <CourseContent showNav={false}>
                <QuestionsList />
              </CourseContent>
            }
          />
          {/* <Route path="courses/modules/dashboard" element={<ModulesDashboard />} /> */}
          <Route
            path="courses/success"
            element={
              <CourseContent showNav={false}>
                <CongratulationsBanner />
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
