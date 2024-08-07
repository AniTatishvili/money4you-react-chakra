import React from "react";
import { useTranslation } from "react-i18next";

import { Flex, useColorMode } from "@chakra-ui/react";
import { PText } from "shared/ui";

export const TotalAmountBadge = () => {
  const { t } = useTranslation("sd");
  const { colorMode } = useColorMode();

  return (
    <Flex h={"40px"} gap={"2"} px={"5"} borderRadius={"4px"} bg={colorMode === "dark" ? "brand.darkC" : "brand.lightC"}>
      <PText lineHeight={"40px"} fontSize={"12px"}>
        {t("TOTAL_AMOUNT")}
      </PText>
      <PText lineHeight={"40px"} fontSize={"20px"} fontWeight={"bold"}>
        3047$
      </PText>
    </Flex>
  );
};
