import { getRefOrdersAPI } from "app/providers/store/api/dashboard";
import React from "react";

import { ErrorField, PSpinner } from "shared/ui";
import { SellerDashboardCustomer } from "./seller-dashboard-customer";

export const SellerDashboardCustomersList = () => {
  const [getSellerOrders, { data, isLoading, isError }] = getRefOrdersAPI.endpoints.getSellerCustomerList.useLazyQuery();

  const uid_local = typeof window !== undefined ? window.localStorage.getItem("UID") : "";
  const uid = uid_local && JSON.parse(uid_local);
  console.log(uid);

  React.useEffect(() => {
    const sellerOrdersParams = {
      id: uid,
    };

    getSellerOrders(sellerOrdersParams);
  }, []);

  if (isLoading) return <PSpinner />;

  if (!data || isError) return <ErrorField />;

  console.log(data);

  const ordersArr = data.data.orders;
  console.log("@@@orders array:", ordersArr);

  return ordersArr.map((order: any) => <SellerDashboardCustomer key={order.id} username={order.username} />);
};
