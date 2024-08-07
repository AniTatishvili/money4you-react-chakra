import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_URL } from "app/providers/store/api/base-url";
import { TOrdersRequest } from "shared/types";

export const getRefOrdersAPI = createApi({
  reducerPath: "getRefOrdersAPI",
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
    getSellerCustomerList: build.query({
      query: ({ limit, offset, id }: TOrdersRequest) => {
        const l = limit ?? 10;
        const o = offset ?? 0;
        return `projects/ref_orders?limit=${l}&offset=${o}&user_id=${id}`;
      },
    }),
  }),
});

export const { useGetSellerCustomerListQuery } = getRefOrdersAPI;
