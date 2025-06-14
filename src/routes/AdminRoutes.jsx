import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "../auth/PrivateRoute";
import Layout from "../components/Layout/Layout";

import Dashboard from "../admin/Dashboard";
import Courses from "../admin/courses/Courses";
import CourseCreationStepper from "../admin/courses/CourseCreationStepper";

import MainContent from "../admin/MainContent";
import Questions from "../admin/questions/Questions";
import Modules from "../admin/modules/Modules";
import UsersList from "../admin/users/UsersList";
import EnrolledCourses from "../admin/enrolledCourses/EnrolledCourses";
import ProfilePage from "../admin/profile/ProfilePage";
import Support from "../components/common/Support/Support";

const AdminRoutes = () => {
  return (
    <Routes>
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
          path="courses/create"
          element={
            <MainContent>
              <CourseCreationStepper />
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
          path="courses/:courseId/modules/:moduleId/questions"
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
        <Route
          path="profile"
          element={
            <MainContent>
              <ProfilePage />
            </MainContent>
          }
        />
        <Route
          path="/support"
          element={
            <MainContent>
              <Support />
            </MainContent>
          }
        />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
