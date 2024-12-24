import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import useAuthStore from "../store/auth/useAuthStore";

const PrivateRoute = ({ roleRequired }) => {
  const { isAuthenticated, userRole } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (roleRequired && userRole !== roleRequired) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

PrivateRoute.propTypes = {
  roleRequired: PropTypes.string,
};

export default PrivateRoute;
