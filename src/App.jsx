import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import AdminRoutes from "./routes/AdminRoutes";
import StudentRoutes from "./routes/StudentRoutes";
import Login from "./components/Login/Login";
import SignUp from "./components/Signup/SignUp";
import useAuthStore from "./store/auth/useAuthStore";

const App = () => {
  const { isAuthenticated, userRole } = useAuthStore();

  return (
    <>
      <Toaster position="top-right" />
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
                <SignUp />
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
    </>
  );
};

export default App;
