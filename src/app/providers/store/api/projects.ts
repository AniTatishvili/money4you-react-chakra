import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_URL } from "./base-url";

export const dashboardsAPI = createApi({
  reducerPath: "dashboardsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,

    // prepareHeaders: (headers) => {
    //   headers.set("authorization", `Bearer ${token}`);
    //   return headers;
    // },
  }),
  endpoints: (build) => ({
    // all orders
    getOrders: build.query({
      query: (sort) => ({
        url: `projects/orders?limit=${sort.limit}&offset=${sort.offset}`,
      }),
    }),

    // all projects
    getProjects: build.mutation({
      query: (body) => ({
        url: "projects",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetOrdersQuery, useGetProjectsMutation } = dashboardsAPI;
