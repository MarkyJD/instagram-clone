import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import * as ROUTE from '../constants/routes';

export default function IsLoggedInRoute({ user, isLoggedInPath, children }) {
  if (!user) {
    return children;
  }

  if (user) {
    return (
      <Navigate to={isLoggedInPath} />
    );
  }
  return null;
}

IsLoggedInRoute.propTypes = {
  user: PropTypes.object,
  isLoggedInPath: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};
