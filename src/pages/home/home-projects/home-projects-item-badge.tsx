import React from "react";
import { useTranslation } from "react-i18next";

import { Box } from "@chakra-ui/react";

interface HomeProjectsItemBadgeProps {
  days: number;
  success_status: string;
}

export const HomeProjectsItemBadge = ({ days, success_status }: HomeProjectsItemBadgeProps) => {
  const { t } = useTranslation("home");

  return (
    <Box
      pos={"absolute"}
      top={"10%"}
      right={"-30%"}
      transform={"rotate(45deg)"}
      w={"100%"}
      py={"15px"}
      fontSize={"1rem"}
      textAlign={"center"}
      color={"brand.light"}
      opacity={"0.95"}
      zIndex={"2"}
      bg={success_status === "2" ? "brand.gold" : days > 0 ? "brand.green" : "brand.greyB"}>
      {success_status === "2"
        ? t("PROJECTS.ITEM.STATUS.COMING_SOON")
        : days > 0
        ? t("PROJECTS.ITEM.STATUS.DAYS_REMAINING", { days: days })
        : t("PROJECTS.ITEM.STATUS.CLOSE")}
    </Box>
  );
};
