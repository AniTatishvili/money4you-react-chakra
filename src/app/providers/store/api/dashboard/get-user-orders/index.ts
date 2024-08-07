import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { TOrdersRequest } from "shared/types";
import { BASE_URL } from "../../base-url";

export const getUserOrdersAPI = createApi({
  reducerPath: "getUserOrdersAPI",
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
    getUserOrders: build.query({
      query: ({ offset, limit, id }: TOrdersRequest) => {
        const l = limit ?? 10;
        const o = offset ?? 0;
        return `projects/user_orders?limit=${l}&offset=${o}&user_id=${id}`;
      },
    }),
  }),
});

export const { useGetUserOrdersQuery } = getUserOrdersAPI;
