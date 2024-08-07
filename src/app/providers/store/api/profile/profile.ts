import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_URL } from "../base-url";

export const laravelUserDataApi = createApi({
  reducerPath: "laravelUserDataApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,

    prepareHeaders: (headers) => {
      const user_auth = window !== undefined && window.localStorage.getItem("USER_AUTH");
      const { token } = user_auth && JSON.parse(user_auth);

      if (!token) return;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  endpoints: (build) => ({
    getLaravelUserData: build.mutation({
      query: (body) => ({
        url: `/profile`,
        method: "POST",
        redirect: "follow",
        body,
      }),
    }),
  }),
});

export const { useGetLaravelUserDataMutation } = laravelUserDataApi;
