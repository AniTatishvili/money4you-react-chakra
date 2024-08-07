import React from "react";
import { useColorMode } from "@chakra-ui/react";
import { Button, Flex, Drawer, DrawerBody, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure } from "@chakra-ui/react";
import { HiMenu } from "react-icons/hi";

type TChildren = {
  children: JSX.Element | JSX.Element[];
};

export const SideBarMobileMenu = ({ children }: TChildren) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement | null>(null);
  const { colorMode } = useColorMode();

  return (
    <Flex>
      <Button ref={btnRef} onClick={onOpen} className={"jm-button-dark"} p={"16px"} mb={"25px"} fontSize={"2rem"}>
        <HiMenu />
      </Button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent backgroundColor={colorMode === "dark" ? "brand.darkD" : "brand.grey"}>
          <DrawerCloseButton />
          <DrawerBody display={"flex"} flexDir={"column"} py={"3rem"}>
            {children}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};
