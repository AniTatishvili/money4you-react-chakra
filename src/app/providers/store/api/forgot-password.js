import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_URL } from "./base-url";

export const forgotPasswordAPI = createApi({
  reducerPath: "forgotPasswordAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (build) => ({
    forgotPassword: build.mutation({
      query: (body) => ({
        url: "auth/forgot-password",
        method: "POST",
        body,
      }),
    }),
    forgotPasswordTokenValidation: build.mutation({
      query: (body) => ({
        url: "auth/forgot-password-token-validate",
        method: "POST",
        body,
      }),
    }),
    forgotPasswordReset: build.mutation({
      query: (body) => ({
        url: "auth/password-reset",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useForgotPasswordMutation, useForgotPasswordTokenValidationMutation, useForgotPasswordResetMutation } = forgotPasswordAPI;
