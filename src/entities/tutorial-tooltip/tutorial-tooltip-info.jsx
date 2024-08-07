import { Box, Button, useColorMode, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { PText } from "shared/ui";

export const TutoriaTooltipInfo = () => {
  const { colorMode } = useColorMode();
  const { isOpen, onToggle } = useDisclosure();

  const l = (typeof window !== "undefined" && window.localStorage.getItem("COOKIE_TUTORIAL")) || "";

  const closeCookieAlert = () => {
    window.localStorage.setItem("COOKIE_TUTORIAL", JSON.stringify(true));
    onToggle();
  };

  // React.useEffect(() => {
  //   if (!l) return;
  //   const cookie_status = l && JSON.parse(l);

  //   !cookie_status ? onToggle() : null;
  // }, []);

  return (
    <Box
      bg={colorMode === "dark" ? "#242424" : "#ffffff"}
      w={"280px"}
      display={!l ? "flex" : "none"}
      flexDir={"column"}
      justifyContent={"flex-end"}
      alignItems={"flex-end"}
      gap={"8px"}
      color="white"
      position={"absolute"}
      top={"30px"}
      right={"0"}
      p="15px 20px"
      mt={3}
      borderRadius={"8px"}
      shadow="md"
      style={{ zIndex: 99999999 }}>
      <PText fontSize={"12px"}>Here is a website tutorial. You can see some important feature. Click “Got it” to close this window. </PText>
      <Button onClick={closeCookieAlert} w={"fit-content"} fontSize={"12px"}>
        Got it
      </Button>
    </Box>
  );
};
