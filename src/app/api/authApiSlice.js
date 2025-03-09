import { apiSlice } from './apiSlice';
import { setCredentials } from '../../features/auth/authSlice';
import { saveToCookies, getFromCookies, deleteFromCookies } from '../../utils/cookies';
import { jwtDecode } from "jwt-decode";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: { ...credentials },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // Save tokens to cookies
          saveToCookies('accessToken', data.accessToken);
          saveToCookies('refreshToken', data.refreshToken);

          // Dispatch to auth slice
          var decoded = jwtDecode(data.accessToken);
          
          const user = {
            UserId: decoded.UserId,
            Email: decoded.Email,
            Type: decoded.Type,
          };
          
          dispatch(
            setCredentials({
              user: user,
              accessToken: data.accessToken,
            })
          );
        } catch (err) {
          console.error('Login failed:', err);
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: '/auth/refresh',
        method: 'POST',
        body: { refreshToken: getFromCookies('refreshToken') },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // Save new tokens to cookies
          saveToCookies('accessToken', data.accessToken);
          saveToCookies('refreshToken', data.refreshToken);

          // Dispatch to auth slice
          dispatch(
            setCredentials({
              user: jwtDecode(data.accessToken),
              accessToken: data.accessToken,
            })
          );
        } catch (err) {
          console.error('Token refresh failed:', err);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRefreshMutation } = authApiSlice;
export const { login, refresh } = authApiSlice.endpoints;
