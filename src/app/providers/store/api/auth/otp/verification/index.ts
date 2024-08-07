import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_URL } from "../../../base-url";

export const otpAPI = createApi({
  reducerPath: "otpAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,

    prepareHeaders: (headers) => {
      const user_auth = window !== undefined && window.localStorage.getItem("USER_AUTH");
      const { token } = user_auth && JSON.parse(user_auth);

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  endpoints: (build) => ({
    OTPVerify: build.mutation({
      query: (body) => ({
        url: `auth/otp/verification`,
        method: "POST",
        redirect: "follow",
        body,
      }),
    }),
  }),
});

export const { useOTPVerifyMutation } = otpAPI;
