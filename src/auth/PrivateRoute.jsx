import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import useAuthStore from "../store/auth/useAuthStore";

const PrivateRoute = ({ roleRequired }) => {
  const { isAuthenticated, user, activeRole, isLoading } = useAuthStore();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const hasRequiredRole = user?.roles
    .map((role) => role.toLowerCase())
    .includes(roleRequired.toLowerCase());

  if (roleRequired && !hasRequiredRole) {
    return <Navigate to={`/${activeRole}`} replace />;
  }

  if (roleRequired.toLowerCase() !== activeRole) {
    if (hasRequiredRole) {
      useAuthStore.getState().switchRole(roleRequired);
    }
  }

  return <Outlet />;
};

PrivateRoute.propTypes = {
  roleRequired: PropTypes.string,
};

export default PrivateRoute;
