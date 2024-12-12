import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./auth";
import Layout from "./components/Layout/Layout";

const isAuthenticated = true;
const userRole = "student";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to={userRole === "admin" ? "/admin" : "/student"} />
            ) : (
              <h2>Login</h2>
            )
          }
        />
        <Route
          path="/signup"
          element={
            isAuthenticated ? (
              <Navigate to={userRole === "admin" ? "/admin" : "/student"} />
            ) : (
              <h2>Signup</h2>
            )
          }
        />

        <Route
          path="/"
          element={
            isAuthenticated ? (
              userRole === "admin" ? (
                <Navigate to="/admin" />
              ) : (
                <Navigate to="/student" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route element={<PrivateRoute roleRequired="admin" />}>
          <Route path="admin" element={<Layout userRole="admin" />}>
            <Route path="" element={<h2>Admin Dashboard</h2>} />
            <Route path="users" element={<h2>Admin Users</h2>} />
          </Route>
        </Route>

        <Route element={<PrivateRoute roleRequired="student" />}>
          <Route path="student" element={<Layout userRole="student" />}>
            <Route path="" element={<h2>Student Dashboard</h2>} />
            <Route path="courses" element={<h2>Student Courses</h2>} />
          </Route>
        </Route>

        <Route path="*" element={<h2>Not Found</h2>} />
      </Routes>
    </Router>
  );
};

export default App;
