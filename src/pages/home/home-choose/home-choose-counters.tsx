import React from "react";
import { useTranslation } from "react-i18next";

import { HStack, VStack } from "@chakra-ui/react";
import { HomeChooseCountersItem } from "./home-choose-counters-item";

// icons
import { LiaChalkboardSolid, LiaMapMarkedAltSolid } from "react-icons/lia";

export const HomeChooseCounters = () => {
  const { t } = useTranslation("home");

  return (
    <VStack w={"100%"} maxW={"520px"} gap={{ base: "6", md: "12" }}>
      {/* <HStack justify={"space-between"} w={"100%"}>
        <HomeChooseCountersItem count={"0"} desc={t("CHOOSE.STATS.SATISFIED_CUSTOMERS")} icon={LiaUserTieSolid} />
        <HomeChooseCountersItem count={"0"} desc={t("CHOOSE.STATS.EXPERIENCED_ADVISORS")} icon={LiaUserShieldSolid} />
      </HStack> */}

      <HStack justify={"space-between"} w={"100%"}>
        <HomeChooseCountersItem count={"10"} desc={t("CHOOSE.STATS.WORLDWIDE_LOCATIONS")} icon={LiaMapMarkedAltSolid} />
        <HomeChooseCountersItem count={"10"} desc={t("CHOOSE.STATS.YEARS_OF_EXPERIENCE")} icon={LiaChalkboardSolid} />
      </HStack>
    </VStack>
  );
};
