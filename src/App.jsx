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
import Resgister from "./components/register/Register";
import useAuthStore from "./store/auth/useAuthStore";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";

const NotFound = () => {
  const { activeRole } = useAuthStore();
  return <Navigate to={`/${activeRole}`} replace />;
};

const App = () => {
  const { isAuthenticated, user, activeRole } = useAuthStore();

  const getRedirectPath = () => {
    if (!isAuthenticated) return "/login";
    return `/${activeRole}`;
  };

  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to={getRedirectPath()} /> : <Login />
            }
          />

          <Route
            path="/signup"
            element={
              isAuthenticated ? (
                <Navigate to={getRedirectPath()} />
              ) : (
                <Resgister />
              )
            }
          />

          <Route
            path="/signup/:token"
            element={
              isAuthenticated ? (
                <Navigate to={getRedirectPath()} />
              ) : (
                <Resgister />
              )
            }
          />

          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to={getRedirectPath()} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminRoutes />} />

          {/* Student Routes */}
          <Route path="/student/*" element={<StudentRoutes />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Not Found - Redirect based on active role */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
