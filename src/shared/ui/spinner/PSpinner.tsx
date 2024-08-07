import React from "react";

import { Spinner, useColorMode } from "@chakra-ui/react";

export const PSpinner = () => {
  const { colorMode } = useColorMode();

  return <Spinner thickness="4px" speed="0.65s" size="md" color={colorMode === "dark" ? "brand.gold" : "brand.dark"} />;
};
