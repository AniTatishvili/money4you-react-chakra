import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./base-url";

export const signinAPI = createApi({
  reducerPath: "signinAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (build) => ({
    // sign in
    userSignin: build.mutation({
      query: (body) => ({
        url: "auth/send-otp",
        method: "POST",
        body,
      }),
    }),

    // email otp verification
    userEmailOTPVerification: build.mutation({
      query: (body) => ({
        url: "auth/verify-otp",
        method: "POST",
        body,
      }),
    }),

    // sign out
    userSignout: build.query({
      query: () => ({
        url: "auth/logout",
      }),
    }),
  }),
});

export const { useUserSigninMutation, useUserEmailOTPVerificationMutation, useUserSignoutQuery } = signinAPI;
