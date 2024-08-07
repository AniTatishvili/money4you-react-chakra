import React from "react";
import { IconType } from "react-icons/lib";

import { Box, Center, Icon, Text, VStack } from "@chakra-ui/react";
import shape from "app/assets/images/home/shape.svg";

interface HomeRoleCardProps {
  icon: IconType;
  name: string;
  desc: string;
}

export const HomeRoleCard = ({ icon, name, desc }: HomeRoleCardProps) => {
  return (
    <VStack justify={"flex-start"} gap={{ base: "2", md: "4" }} w={"100%"} maxW={"340px"} overflow={"hidden"}>
      <Box
        pos={"relative"}
        w={"100%"}
        maxW={"142px"}
        h={"148px"}
        backgroundImage={shape}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"contain"}
        backgroundPosition={"center"}>
        <Center pos={"absolute"} w={"100%"} h={"100%"} fontSize={"4xl"} color={"brand.light"}>
          <Icon color={"brand.white"} fontSize={"6xl"} as={icon} />
        </Center>
      </Box>
      <Text fontSize={"xl"} fontWeight={"bold"}>
        {name}
      </Text>
      <Text textAlign={"center"}>{desc}</Text>
    </VStack>
  );
};
