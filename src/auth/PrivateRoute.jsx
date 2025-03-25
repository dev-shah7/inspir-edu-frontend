import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import useAuthStore from "../store/auth/useAuthStore";

const PrivateRoute = ({ roleRequired = 'admin' }) => {
  const { user, activeRole, isLoading } = useAuthStore();

  if (isLoading) {
    return null;
  }

  const currentRole = activeRole || 'admin';

  if (roleRequired.toLowerCase() !== currentRole) {
    useAuthStore.getState().switchRole(roleRequired);
  }

  return <Outlet />;
};

PrivateRoute.propTypes = {
  roleRequired: PropTypes.string,
};

export default PrivateRoute;
