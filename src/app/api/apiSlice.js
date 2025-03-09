import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../../features/auth/authSlice'
import { saveToCookies } from '../../utils/cookies'
import { jwtDecode } from 'jwt-decode'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5188/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.originalStatus === 401) {
        console.log('sending refresh token')
        // send refresh token to get new access token 
        const refreshResult = await baseQuery('auth/refresh', api, extraOptions)
        console.log(refreshResult.data) 
        console.log("***********" )
        if (refreshResult?.data) {
            // get user from access token
            const decoded = jwtDecode(refreshResult.data.accessToken)
            const user = {
                UserId: decoded.UserId,
                Email: decoded.Email,
                Type: decoded.Type}
            // save new tokens to cookies
            saveToCookies('accessToken', refreshResult.data.accessToken)
            saveToCookies('refreshToken', refreshResult.data.refreshToken)
            // store the new token 
            api.dispatch(setCredentials({ user: user, accessToken: refreshResult.data.accessToken }))
            // retry the original query with new access token 
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})
