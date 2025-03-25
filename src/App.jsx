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
  return <Navigate to={`/${activeRole === 'student' ? 'student' : 'admin'}`} replace />;
};

const App = () => {
  const { activeRole } = useAuthStore();

  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Resgister />} />
          <Route path="/signup/:token" element={<Resgister />} />
          <Route path="/" element={<Navigate to={`/${activeRole === 'student' ? 'student' : 'admin'}`} />} />

          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/student/*" element={<StudentRoutes />} />
          
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
