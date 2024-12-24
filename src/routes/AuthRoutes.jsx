import { Routes, Route, Navigate } from "react-router-dom";

// import ForgotPassword from "../auth/ForgotPassword";
// import ResetPassword from "../auth/ResetPassword";
import Login from "../components/Login/Login";
import Signup from "../components/Signup/SignUp";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<SignUp />} />
      {/* <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password" element={<ResetPassword />} /> */}
      <Route path="*" element={<Navigate to="login" replace />} />
    </Routes>
  );
};

export default AuthRoutes;