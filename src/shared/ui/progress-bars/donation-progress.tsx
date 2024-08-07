import React from "react";

import { Flex, Box, Progress } from "@chakra-ui/react";
import { PText } from "shared/ui";

interface IDonationProgress {
  name?: string;
  value: number;
}

export const DonationProgress = ({ name, value }: IDonationProgress) => {
  return (
    <Box>
      <Progress value={value} hasStripe isAnimated colorScheme={"green"} bg={"brand.lightB"} h={"5px"} border={"none"} borderRadius={"4"} />
      <Flex justify={"space-between"} gap={"4"}>
        <PText>{name}</PText>
        <PText>{value}%</PText>
      </Flex>
    </Box>
  );
};
