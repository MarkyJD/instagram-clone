import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import * as ROUTE from '../constants/routes';

export default function ProtectedRoute({ user, children }) {
  if (user) {
    return children;
  }

  if (!user) {
    return (
      <Navigate to={ROUTE.LOGIN} />
    );
  }
  return null;
}

ProtectedRoute.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object.isRequired,
};
