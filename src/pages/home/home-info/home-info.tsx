import React from "react";
import { useTranslation } from "react-i18next";

import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { PButton } from "shared/ui";

import stat from "app/assets/images/home/home-stat.png";

export const HomeInfo = () => {
  const { t } = useTranslation("home");

  return (
    <HStack flexWrap={{ base: "wrap", lg: "nowrap" }} gap={5}>
      <VStack align={"flex-start"} gap={"5"} w={{ base: "100%", lg: "50%" }}>
        <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight={"bold"}>
          {t("TITLES.DID_YOU_KNOW")}
        </Text>
        <Text>{t("DID_YOU_KNOW.DESC")}</Text>
        <Box>
          <PButton>{t("DID_YOU_KNOW.BUTTONS.KNOW_MORE_HERE")}</PButton>
        </Box>
      </VStack>

      <VStack w={{ base: "100%", lg: "50%" }}>
        <Image w={"100%"} maxW={"420px"} h={"auto"} src={stat} border={"none"} borderRadius={"md"} shadow={"md"} />
      </VStack>
    </HStack>
  );
};
