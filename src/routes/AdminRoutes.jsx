import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../auth/PrivateRoute";
import Layout from "../components/Layout/Layout";

import MainContent from "../admin/MainContent";
import Courses from "../admin/courses/Courses";
import Dashboard from "../admin/dashboard/Dashboard";
import Modules from "../admin/modules/Modules";
import Questions from "../admin/questions/Questions"

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
            path="modules"
            element={
              <MainContent>
                <Modules />
              </MainContent>
            }
          />
          <Route
            path="questions"
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
