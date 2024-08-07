import React from "react";

import { Flex } from "@chakra-ui/react";
import { UserDetails, InterestAndRisksTable, PopularCampaigns, UserLastDonation, YourDonationTable } from "entities/dashboards/user-dashboard";

export const UserDashboard = () => {
  return (
    <Flex flexDir={"column"} gap={"8"}>
      <Flex flexWrap={{ base: "wrap", xl: "nowrap" }} gap={"8"}>
        <Flex flexWrap={{ base: "wrap", md: "nowrap" }} gap={"8"} w={"100%"}>
          <UserDetails />
          <InterestAndRisksTable />
        </Flex>
        <PopularCampaigns />
      </Flex>
      <Flex flexWrap={{ base: "wrap", lg: "nowrap" }} gap={8}>
        <UserLastDonation />
        <YourDonationTable />
      </Flex>
    </Flex>
  );
};
