import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../auth/PrivateRoute";
import Layout from "../components/Layout/Layout";

import Dashboard from "../admin/Dashboard";
import Courses from "../admin/courses/Courses";
import Modules from "../admin/testModule/Modules";

import MainContent from "../admin/MainContent";
import Questions from "../admin/testQuestions/Questions";

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
          <Route path="users" element={<h2>Admin Users</h2>} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
