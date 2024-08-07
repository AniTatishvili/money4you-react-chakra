import React from "react";

import { Flex } from "@chakra-ui/react";
import { PContentLayout, PContentSection } from "entities/layouts";
import { PinWidget } from "entities/pin";
import { PText } from "shared/ui";

export const Pin = () => {
  return (
    <PContentLayout name="OTP code:">
      <PContentSection>
        <Flex flexDir="column" alignItems="center">
          <PinWidget relocate="login" />
          <PText fontSize={"11px"} maxW={"620px"} pt={"60px"} pb={"30px"} px={"15px"}>
            *OTP - A one-time password, also known as a one-time PIN, one-time authorization code or dynamic password, is a password that is valid for only one
            login session or transaction, on a computer system or other digital device. (Wikipedia)
          </PText>
        </Flex>
      </PContentSection>
    </PContentLayout>
  );
};
