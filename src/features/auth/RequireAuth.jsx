import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectCurrentToken, selectCurrentUser } from './authSlice';

const RequireAuth = ({ allowedRoles }) => {
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser); // Assuming this contains { type: 'Faculty' | 'Student' }
  const location = useLocation();

  if (!token) {
    // Redirect to the appropriate login page if not authenticated
    return (
      <Navigate
        to={user?.type === 'Student' ? '/student-login' : '/faculty-login'}
        state={{ from: location }}
        replace
      />
    );
  }

  if (!allowedRoles.includes(user?.type)) {
    // Redirect to Unauthorized page if user doesn't have access
    return (
      <Navigate
        to="/unauthorized"
        state={{ from: location }}
        replace
      />
    );
  }

  // Render the component if authenticated and authorized
  return <Outlet />;
};

export default RequireAuth;
