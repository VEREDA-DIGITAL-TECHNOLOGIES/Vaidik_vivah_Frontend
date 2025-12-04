import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError
} from '@reduxjs/toolkit/query/react';

import type { RootState } from '../store';
import { setCredentials, logout } from '../Reducers/user.reducer';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


// PUBLIC ROUTES (NO AUTH HEADER)
const noAuthEndpoints = [
    "registerUser",
    "verifyOtp",
    "setPassword",
    "forgotpassword",
    "verify",
    "resetpassword",
    "login",
    "activateUser",
    "activate-user-mobile",
    "set-password-mobile",
    "verify-otp-for-mobile",
    "reset-password-for-mobile",
];


const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/api/v1/`,
    credentials: "include",

    prepareHeaders: (headers, { getState, endpoint }) => {
        const accessToken = (getState() as RootState).userReducer.accessToken;

        // 🔥 If the endpoint is public → DO NOT SEND Authorization
        if (noAuthEndpoints.includes(endpoint)) {
            headers.delete("Authorization");
            return headers;
        }

        // 🔥 For protected endpoints → add Authorization
        if (accessToken) {
            headers.set("Authorization", `Bearer ${accessToken}`);
        } else {
            headers.delete("Authorization");
        }

        return headers;
    }
});


// 🔁 Refresh token logic
export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {

    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
        console.log("refreshing token...");

        const refreshResult = await baseQuery("/user/refresh", api, extraOptions);

        if (refreshResult?.data) {
            api.dispatch(setCredentials({ ...refreshResult.data }));
            result = await baseQuery(args, api, extraOptions);
        } else {
            console.log("refresh token failed");
            api.dispatch(logout());
        }
    }

    return result;
};


export const apiSlice = createApi({
    reducerPath: "apiSlice",
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
});
