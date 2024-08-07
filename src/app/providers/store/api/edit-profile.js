import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./base-url";

export const editProfileAPI = createApi({
  reducerPath: "editProfileAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,

    prepareHeaders: (headers) => {
      const { token } = JSON.parse(window.localStorage.getItem("USER_AUTH")) || {};
      // console.log("edit profile token: ", token);
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    // profile edit
    userEditProfile: build.mutation({
      query: (body) => ({
        url: "profile/edit",
        method: "POST",
        redirect: "follow",
        body,
      }),
    }),

    // update mobile phone
    checkPhone: build.mutation({
      query: (body) => ({
        url: "profile/check_phone",
        method: "POST",
        body,
      }),
    }),

    // update mobile phone
    updatePhone: build.mutation({
      query: (body) => ({
        url: "profile/update_phone",
        method: "POST",
        body,
      }),
    }),

    // verifyPhone
    verifyPhone: build.mutation({
      query: (body) => ({
        url: "profile/verify_phone",
        method: "POST",
        body,
      }),
    }),

    // update KYC
    updateKYC: build.mutation({
      query: (body) => ({
        url: "profile/edit_kyc",
        method: "POST",
        redirect: "follow",
        body,
      }),
    }),

    // update password
    updatePassword: build.mutation({
      query: (body) => ({
        url: "",
        method: "POST",
        redirect: "follow",
        body,
      }),
    }),
  }),
});

export const {
  useUserEditProfileMutation,
  useCheckPhoneMutation,
  useUpdatePhoneMutation,
  useVerifyPhoneMutation,
  useUpdateKYCMutation,
  useUpdatePasswordMutation,
} = editProfileAPI;
