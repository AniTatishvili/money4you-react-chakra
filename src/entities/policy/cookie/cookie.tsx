import React, { useEffect } from "react";

import { Box, Button, Flex, FormLabel, Slide, Switch, useColorMode, useDisclosure } from "@chakra-ui/react";
import { PText } from "shared/ui";

export const CookiePolicy = () => {
  const { colorMode } = useColorMode();
  const { isOpen, onToggle } = useDisclosure();

  const l = window !== undefined && window.localStorage.getItem("COOKIE_POLICY");

  const closeCookieAlert = () => {
    window.localStorage.setItem("COOKIE_POLICY", JSON.stringify(true));
    onToggle();
  };

  useEffect(() => {
    const cookie_status = l && JSON.parse(l);
    !cookie_status ? onToggle() : null;
  }, []);

  return (
    <div>
      <Slide direction="bottom" in={isOpen} style={{ zIndex: 99999999 }}>
        <Box p="40px" color="white" mt="4" bg={colorMode === "dark" ? "#242424" : "#ffffff"} shadow="md">
          <PText fontSize={"14px"}>In order to provide you with the best online experience this website uses cookies.</PText>
          <PText fontSize={"14px"}>
            By using our website, you agree to our use of cookies. We use cookies and other tracking technologies to improve your experience on our website.
          </PText>
          <PText fontSize={"14px"}>
            We may store and/or access information on a device and process personal data, such as your IP address and browsing data, for personalised
            advertising and content, advertising and content measurement, audience research and services development. Additionally, we may utilize precise
            geolocation data and identification through device scanning. Please note that your consent will be valid across all our subdomains. You can withdraw
            your consent at any time and leave our Internet resource. We respect your choices and are committed to providing you with a transparent and secure
            browsing experience.
          </PText>
          <Flex>
            <FormLabel htmlFor="isDisabled" color={colorMode === "dark" ? "#ffffff" : "#242424"}>
              I have read the terms of use and agree:
            </FormLabel>
            <Switch id="isDisabled" colorScheme={"yellow"} readOnly defaultChecked />
          </Flex>
          <Button onClick={closeCookieAlert}>Close</Button>
        </Box>
      </Slide>
    </div>
  );
};
