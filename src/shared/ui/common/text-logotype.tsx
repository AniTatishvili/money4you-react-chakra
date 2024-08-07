import React from "react";

import { Flex, Text } from "@chakra-ui/react";

interface TextLogotypeProps {
  size?: string;
  color?: string;
  bg?: string;
  display?: string;
}

export const TextLogotype = ({ size, color, bg, display }: TextLogotypeProps) => {
  return (
    <Flex
      display={display ?? "inline-flex"}
      fontSize={{ base: "xl", sm: size ?? "2xl" }}
      color={color ?? "brand.gold"}
      bg={bg ?? ""}
      px={bg ? "4" : ""}
      borderRadius={bg ? "full" : ""}
      border={"none"}
      fontFamily={"NunitoVariable"}
      fontWeight={"extrabold"}>
      money
      <Text color={"brand.red"}>4</Text>
      you.financial
    </Flex>
  );
};
