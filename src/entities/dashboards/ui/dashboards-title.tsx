import React from "react";
import { useColorMode } from "@chakra-ui/react";

import { Heading } from "@chakra-ui/react";

type DashboardTitleType = {
  page_title: string;
};

export const DashboardsTitle = ({ page_title }: DashboardTitleType) => {
  const { colorMode } = useColorMode();

  return (
    <Heading as={"h2"} fontSize={"24px"} fontWeight={"bold"} color={colorMode === "dark" ? "brand.white" : "brand.dark"} mb={"5px"}>
      {page_title}
    </Heading>
  );
};
