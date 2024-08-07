import React from "react";
import { useTranslation } from "react-i18next";

import { Box, Flex, Stack, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PButton, TextLogotype } from "shared/ui";
import { HomeRoleCard } from "./home-role-card";

// icons
import { FaMoneyCheckAlt } from "react-icons/fa";
import { FaArrowUpRightDots } from "react-icons/fa6";
import { HiHomeModern } from "react-icons/hi2";

export const HomeRole = () => {
  const { t } = useTranslation("home");
  const { colorMode } = useColorMode();

  return (
    <Flex flexDir={"column"} align={"center"} gap={{ base: "4", lg: "8" }}>
      <Box
        pos={"relative"}
        w={"100%"}
        px={"4"}
        py={{ base: "1", md: "3" }}
        fontFamily={"RalewayVariable"}
        fontWeight={"bold"}
        fontSize={{ base: "2xl", md: "4xl" }}
        textAlign={"center"}
        bg={colorMode === "dark" ? "brand.darkA" : "brand.lightA"}
        color={colorMode === "dark" ? "brand.lightA" : "brand.darkA"}
        zIndex={"1"}>
        {t("TITLES.ROLE_OF_MONEY4YOU")}
      </Box>
      <Flex align={"center"} justify={"center"} fontSize={"2xl"} maxW={"980px"} m={"0 auto"}>
        <Box fontFamily={"RalewayVariable"} fontSize={{ base: "lg", lg: "3xl" }} fontWeight={"extrabold"} textAlign={"center"}>
          <TextLogotype size={"4xl"} bg={"brand.gold"} color={"brand.dark"} />
          {" — "}
          {t("ROLE.DESC")}
        </Box>
      </Flex>

      <Stack align={"flex-start"} justify={"space-around"} direction={{ base: "column", md: "row" }} gap={"25px"} mt={"1rem"}>
        <HomeRoleCard icon={HiHomeModern} name={t("ROLE.LABELS.TITLES.CREATING_HOMES")} desc={t("ROLE.LABELS.DESC.1")} />{" "}
        <HomeRoleCard icon={FaMoneyCheckAlt} name={t("ROLE.LABELS.TITLES.GENERATE_PROFIT")} desc={t("ROLE.LABELS.DESC.2")} />
        <HomeRoleCard icon={FaArrowUpRightDots} name={t("ROLE.LABELS.TITLES.BOOSTING_THE_ECONOMY")} desc={t("ROLE.LABELS.DESC.3")} />
      </Stack>

      <Link to={"https://money4you.financial/about"}>
        <PButton fontFamily={"RalewayVariable"} fontSize={"15px"} fontWeight={"bold"} textTransform={"uppercase"}>
          {t("ROLE.BUTTONS.READ_MORE")}
        </PButton>
      </Link>
    </Flex>
  );
};
