import React from "react";

import { Box, Divider, Flex } from "@chakra-ui/react";
import { SellerDashboardDetailsTable } from "../seller-dashboard/seller-dashboard-details-table";

import { TCustomer } from "shared/types";
import s from "../seller-dashboard/seller-dashboard.module.scss";

type TCustomerProps<T> = {
  cdata: T;
};

export const SellerDashboardCustomerDetails = ({ cdata }: TCustomerProps<TCustomer>) => {
  const { id, phone, email, country, city, state, street, apt_number } = cdata;

  return (
    <Flex flexDir={"column"}>
      <Flex justify={"space-between"} gap={"6"} my={"4"} width={"100%"} fontSize={"13px"} overflowX={"auto"}>
        <Box>{phone}</Box>
        <Box>{email}</Box>
        <Box whiteSpace={"nowrap"} title="Azerbaijan, Baku. Bakihanov s. 85A, 87.">
          {country}, {city}. {state}, {street}, {apt_number}.
        </Box>
      </Flex>
      <Divider mb={"4"} />
      <Box className={s.customer_table} overflowX={"scroll"} overflowY={"hidden"}>
        <SellerDashboardDetailsTable id={id} />
      </Box>
    </Flex>
  );
};
