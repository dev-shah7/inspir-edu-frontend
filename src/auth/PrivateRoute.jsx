import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import useAuthStore from "../store/auth/useAuthStore";

const PrivateRoute = ({ roleRequired }) => {
  const { isAuthenticated, activeRole, isLoading } = useAuthStore();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roleRequired && activeRole !== roleRequired ) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

PrivateRoute.propTypes = {
  roleRequired: PropTypes.string,
};

export default PrivateRoute;
