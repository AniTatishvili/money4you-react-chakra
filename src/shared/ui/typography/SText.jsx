import React from "react";
import { useColorMode } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

export const SText = ({ children, ...props }) => {
  const { colorMode } = useColorMode();

  return (
    <Text color={colorMode === "dark" ? "brand.gold" : "brand.gold"} fontFamily={"NunitoVariable"} fontSize={"15px"} {...props}>
      {children}
    </Text>
  );
};
