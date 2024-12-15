import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../auth/PrivateRoute";
import Layout from "../components/Layout/Layout";

const StudentRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute roleRequired="student" />}>
        <Route path="/" element={<Layout userRole="student" />}>
          <Route index element={<h2>Student Dashboard</h2>} />
          <Route path="courses" element={<h2>Student Courses</h2>} />
        </Route>
      </Route>
    </Routes>
  );
};

export default StudentRoutes;
