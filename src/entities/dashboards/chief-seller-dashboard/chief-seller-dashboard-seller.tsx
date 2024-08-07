import { getRefOrdersAPI } from "app/providers/store/api/dashboard";
import React, { useState } from "react";

import { Avatar, Box, Divider, Flex } from "@chakra-ui/react";
import { PSpinner, PText } from "shared/ui";

import { ChiefSellerDashboardDetailsBtn } from "../ui";
import { ChiefSellerDashboardSellerCustomers } from "./chief-seller-dashboard-seller-customers";

interface ChiefSellerDashboardSellerProps {
  id: number;
  name: string;
  surname: string;
  profileImage: string;
}

export const ChiefSellerDashboardSeller = ({ id, name, surname, profileImage }: ChiefSellerDashboardSellerProps) => {
  const [getRefOrders, { isLoading, isError }] = getRefOrdersAPI.endpoints.getSellerCustomerList.useLazyQuery();

  const [showDonations, setShowDonations] = useState<boolean>(false);
  const [ordersArr, setOrdersArr] = useState([]);

  const handleShowCustomerDonations: () => void = async () => {
    setShowDonations((prev) => !prev);

    await getRefOrders({ limit: 10, offset: 0, id: id }).then((res) => {
      isError ? null : setOrdersArr(res.data.data.orders);
    });
  };

  return (
    <>
      <Flex align={{ base: "flex-start", xl: "center" }} justify={"space-between"} flexDirection={{ base: "column", sm: "row" }} gap={4} my={"5"}>
        <Flex align={"center"} gap={"15px"}>
          <Avatar
            src={`https://api.devhunters.ru/storage/users/${id}/${profileImage}`}
            name={`${name} ${surname}`}
            size={"md"}
            border={"none"}
            borderRadius={"100%"}
          />
          <PText fontSize={"16px"} fontWeight={"bold"}>
            {name} {surname}
          </PText>
        </Flex>
        <Flex
          width={{ base: "100%", sm: "auto" }}
          flexDirection={{ base: "column", md: "row" }}
          align={{ base: "flex-start", md: "center" }}
          gap={{ base: "16px", lg: "35px" }}>
          <Box width={{ base: "100%", sm: "auto" }} onClick={handleShowCustomerDonations}>
            <ChiefSellerDashboardDetailsBtn />
          </Box>
        </Flex>
      </Flex>

      {isLoading && (
        <Flex justify={"center"} align={"center"} w={"100%"}>
          <PSpinner />
        </Flex>
      )}

      {isError && showDonations && (
        <Flex justify={"center"} align={"center"} w={"100%"}>
          Something went wrong...
        </Flex>
      )}

      {showDonations && !isLoading && !isError ? <ChiefSellerDashboardSellerCustomers ordersArr={ordersArr} /> : null}
      <Divider my={"5"} />
    </>
  );
};
