import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../auth/PrivateRoute";
import Layout from "../components/Layout/Layout";
import Courses from "../admin/courses/Courses";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute roleRequired="admin" />}>
        <Route path="/" element={<Layout userRole="admin" />}>
          <Route index element={<h2>Admin Dashboard</h2>} />
          <Route path="courses" element={<Courses />} />
          <Route path="users" element={<h2>Admin Users</h2>} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
