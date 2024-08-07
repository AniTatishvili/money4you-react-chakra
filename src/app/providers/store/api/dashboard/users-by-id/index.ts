import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_URL } from "../../base-url";

export const usersByIdAPI = createApi({
  reducerPath: "usersByIdAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,

    prepareHeaders(headers) {
      const user_auth = window !== undefined && window.localStorage.getItem("USER_AUTH");
      const { token } = user_auth && JSON.parse(user_auth);

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  endpoints: (build) => ({
    getUserById: build.query({
      query: (id: number) => `users/${id}`,
    }),
  }),
});

export const { useGetUserByIdQuery } = usersByIdAPI;
