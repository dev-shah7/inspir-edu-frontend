import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AdminRoutes from "./routes/AdminRoutes";
import StudentRoutes from "./routes/StudentRoutes";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";

const isAuthenticated = true;
const userRole = "student";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to={userRole === "admin" ? "/admin" : "/student"} />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/signup"
          element={
            isAuthenticated ? (
              <Navigate to={userRole === "admin" ? "/admin" : "/student"} />
            ) : (
              <Signup />
            )
          }
        />

        {/* Redirect Based on Role */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to={userRole === "admin" ? "/admin" : "/student"} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* Student Routes */}
        <Route path="/student/*" element={<StudentRoutes />} />

        {/* Not Found */}
        <Route path="*" element={<h2>Not Found</h2>} />
      </Routes>
    </Router>
  );
};

export default App;
