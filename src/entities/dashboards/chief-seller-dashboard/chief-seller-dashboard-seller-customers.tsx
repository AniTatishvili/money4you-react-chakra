import React from "react";

import { ChiefSellerDashboardSellerCustomer } from "./chief-seller-dashboard-seller-customer";

interface Order {
  username: string;
  id: number;
}

export const ChiefSellerDashboardSellerCustomers = ({ ordersArr }: any) => {
  console.log("@@@orders array:", ordersArr);

  return ordersArr.map((order: Order) => <ChiefSellerDashboardSellerCustomer key={order.id} username={order.username} />);
};
