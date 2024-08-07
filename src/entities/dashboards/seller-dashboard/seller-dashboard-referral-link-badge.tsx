import React from "react";
import { IconType } from "react-icons/lib";

import { ListItem, ListIcon, useColorMode, VStack, HStack } from "@chakra-ui/react";
import { PText } from "shared/ui";

interface ISellerDashboardReferralLinkBadge {
  icon?: IconType;
  text: string | number;
  children?: React.ReactNode;
}

export const SellerDashboardReferralLinkBadge = ({ icon, text, children }: ISellerDashboardReferralLinkBadge) => {
  const { colorMode } = useColorMode();

  return (
    <ListItem
      display={"flex"}
      alignItems={"center"}
      h={"50px"}
      w={"100%"}
      py={"2"}
      px={"4"}
      borderRadius={"4px"}
      bg={colorMode === "dark" ? "brand.darkC" : "brand.lightC"}
      overflow={"hidden"}>
      <VStack flexDir={"column"}>
        <HStack>
          {icon ? <ListIcon as={icon} margin={"0"} /> : null}
          <PText>{text}</PText>
        </HStack>
        {children}
      </VStack>
    </ListItem>
  );
};
