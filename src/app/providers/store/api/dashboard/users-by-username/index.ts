import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_URL } from "../../base-url";

export const usersByUsernameAPI = createApi({
  reducerPath: "usersByUsernameAPI",
  refetchOnMountOrArgChange: false,
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
    getUserByUsername: build.mutation({
      query: (body) => ({
        url: `users/users_by_username`,
        method: "POST",
        redirect: "follow",
        body,
      }),
    }),
  }),
});

export const { useGetUserByUsernameMutation } = usersByUsernameAPI;
