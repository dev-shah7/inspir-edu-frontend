import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({ roleRequired }) => {
  const isAuthenticated = true;
  const role = "student";

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role !== roleRequired) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

PrivateRoute.propTypes = {
  roleRequired: PropTypes.string.isRequired,
};

export default PrivateRoute;
