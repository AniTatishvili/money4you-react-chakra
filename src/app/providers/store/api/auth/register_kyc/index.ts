import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_URL } from "../../base-url";

export const registerKycAPI = createApi({
  reducerPath: "kycAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (build) => ({
    signupWithKyc: build.mutation({
      query: (body) => ({
        url: "auth/kyc_register",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSignupWithKycMutation } = registerKycAPI;
