import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_URL } from "app/providers/store/api/base-url";

export const usersByRoleAPI = createApi({
  reducerPath: "usersByRoleAPI",
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
    // users by role
    usersByRole: build.mutation({
      query: (body) => ({
        url: "users/users_by_role",
        method: "POST",
        redirect: "follow",
        body,
      }),
    }),
  }),
});

export const { useUsersByRoleMutation } = usersByRoleAPI;
