import { useDispatch } from 'react-redux';
import { setCredentials, logOut } from '../features/auth/authSlice';
import { useRefreshMutation } from '../app/api/authApiSlice';
import { getFromCookies } from '../utils/cookies';
import {jwtDecode} from 'jwt-decode'; 


const useAuthInit = () => {
  const dispatch = useDispatch();
  const [refresh] = useRefreshMutation();

  const initializeAuth = async () => {
    const accessToken = getFromCookies('accessToken');
    const refreshToken = getFromCookies('refreshToken');

    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken);

        if (decoded.exp * 1000 > Date.now()) {
          // Valid token
          dispatch(
            setCredentials({
              user: {
                UserId: decoded.UserId,
                Email: decoded.Email,
                Type: decoded.Type,
              },
              accessToken,
            })
          );
        } else if (refreshToken) {
          // Refresh the token
          await handleRefresh(refreshToken);
        } else {
          // Log out if no valid tokens
          dispatch(logOut());
        }
      } catch (err) {
        console.error('Token validation failed:', err);
        if (refreshToken) await handleRefresh(refreshToken);
        else dispatch(logOut());
      }
    } else if (refreshToken) {
      // Refresh token exists but no access token
      await handleRefresh(refreshToken);
    } else {
      dispatch(logOut());
    }
  };

  const handleRefresh = async (refreshToken) => {
    try {
      const { data } = await refresh({ refreshToken });
      const decoded = jwtDecode(data.accessToken);

      dispatch(
        setCredentials({
          user: {
            UserId: decoded.UserId,
            Email: decoded.Email,
            Type: decoded.Type,
          },
          accessToken: data.accessToken,
        })
      );
    } catch (err) {
      console.error('Refresh token failed:', err);
      dispatch(logOut());
    }
  };

  return { initializeAuth };
};

export default useAuthInit;
