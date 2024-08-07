import React from "react";

import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Input, useColorMode, useDisclosure } from "@chakra-ui/react";
import { MenuList } from "entities/menu-list";
import { CgMenuGridR } from "react-icons/cg";

export const SideMenu = () => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Box ref={btnRef} onClick={onOpen}>
        <HamburgerIcon bg={colorMode === "dark" ? "brand.darkA" : "brand.lightA"} fontSize="1.5rem" />
      </Box>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef} size="xs">
        <DrawerOverlay />
        <DrawerContent bg="#242424" color="#f2f2f2">
          <Box pos="relative">
            <DrawerCloseButton top="50%" transform="translateY(-50%)" />
            <DrawerHeader bg="#dd9933" display="flex" fontSize="0.875rem" fontWeight="700" textTransform="uppercase">
              Navigation
            </DrawerHeader>
          </Box>

          <DrawerBody color="#999">
            <Input my={4} placeholder="Search..." />
            <MenuList flexDir="column" icons={<CgMenuGridR />} gap={2.5} dynamic_class="side" />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
