import React from "react";
import { useColorMode } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

export const PText = ({ children, ...props }) => {
  const { colorMode } = useColorMode();

  return (
    <Text color={colorMode === "dark" ? "brand.light" : "brand.dark"} fontFamily={"NunitoVariable"} fontSize={"15px"} {...props}>
      {children}
    </Text>
  );
};
