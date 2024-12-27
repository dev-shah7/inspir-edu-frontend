import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../auth/PrivateRoute";
import Layout from "../components/Layout/Layout";

import Dashboard from "../admin/Dashboard";
import Courses from "../admin/courses/Courses";

import MainContent from "../admin/MainContent";
import Questions from "../admin/testQuestions/Questions";
import Modules from "../admin/modules/Modules";
import UsersList from "../admin/users/UsersList";
import EnrolledCourses from "../admin/enrolledCourses/EnrolledCourses";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute roleRequired="admin" />}>
        <Route path="/" element={<Layout userRole="admin" />}>
          <Route
            index
            element={
              <MainContent>
                <Dashboard />
              </MainContent>
            }
          />
          <Route
            path="courses"
            element={
              <MainContent>
                <Courses />
              </MainContent>
            }
          />
          <Route
            path="courses/:courseId/modules"
            element={
              <MainContent>
                <Modules />
              </MainContent>
            }
          />
          <Route
            path="modules/:moduleId/questions"
            element={
              <MainContent>
                <Questions />
              </MainContent>
            }
          />
          <Route
            path="users"
            element={
              <MainContent>
                <UsersList />
              </MainContent>
            }
          />
          <Route
            path="enrolled-courses"
            element={
              <MainContent>
                <EnrolledCourses />
              </MainContent>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
