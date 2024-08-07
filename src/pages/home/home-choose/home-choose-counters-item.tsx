import React from "react";
import { IconType } from "react-icons/lib";

import { Center, Icon, Text, VStack } from "@chakra-ui/react";

interface HomeChooseCountersItemProps {
  icon: IconType;
  desc: string;
  count: string;
}

export const HomeChooseCountersItem = ({ icon, count, desc }: HomeChooseCountersItemProps) => {
  return (
    <VStack justify={"flex-start"} w={"100%"} maxW={"340px"} overflow={"hidden"}>
      <Center background={"#8E5601"} minW={"90px"} minH={"90px"} p={"10px"} borderRadius={"full"} boxShadow={"md"}>
        <Icon color={"brand.light"} fontSize={"5xl"} as={icon} />
      </Center>
      <Text fontSize={{ base: "2xl", md: "4xl" }} fontWeight={"bold"}>
        {count}
      </Text>
      <Text textAlign={"center"}>{desc}</Text>
    </VStack>
  );
};
