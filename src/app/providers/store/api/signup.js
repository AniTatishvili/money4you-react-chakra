import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./base-url";

export const signupAPI = createApi({
  reducerPath: "signupAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (build) => ({
    // get
    getPublicRoles: build.query({
      query: () => "roles/public-roles",
    }),

    // test post request
    testPost: build.mutation({
      query: (body) => ({
        url: "auth/post_test",
        method: "POST",
        body,
      }),
    }),

    // investor signup
    investorSignup: build.mutation({
      query: (body) => ({
        url: "auth/investor_signup",
        method: "POST",
        body,
      }),
    }),

    // journalist signup
    journalistSignup: build.mutation({
      query: (body) => ({
        url: "auth/register",
        method: "POST",
        body,
      }),
    }),

    // jobseeker signup
    jobseekerSignup: build.mutation({
      query: (body) => ({
        url: "auth/job_seeker_signup",
        method: "POST",
        body,
      }),
    }),

    // email verification
    emailVerification: build.query({
      query: (id) => `auth/email/verify/${id}`,
    }),

    // resend email verification
    resendEmailVerification: build.query({
      query: () => "auth/email/resend",
    }),

    // otp verification
    otpVerification: build.mutation({
      query: (body) => ({
        url: "auth/otp/verification",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useTestPostMutation,
  useGetPublicRolesQuery,
  useInvestorSignupMutation,
  useJournalistSignupMutation,
  useJobseekerSignupMutation,
  useEmailVerificationQuery,
  useResendEmailVerificationQuery,
  useOtpVerificationMutation,
} = signupAPI;
