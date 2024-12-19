import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../auth/PrivateRoute";
import Layout from "../components/Layout/Layout";
import Courses from "../admin/Courses/Courses";
import Dashboard from "../admin/Dashboard/Dashboard";
import MainContent from "../admin/MainContent";

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
          <Route path="users" element={<h2>Admin Users</h2>} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
