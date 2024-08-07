import React from "react";
import { useColorMode } from "@chakra-ui/react";
import { useAppSelector } from "app/providers/store";

import { TabList } from "@chakra-ui/react";
import { SidebarMenuSwitcher } from "../ui/sidebar-menu-switcher";

type TChildren = {
  children: JSX.Element | JSX.Element[];
};

export const UserSidebarMenu = ({ children }: TChildren) => {
  const { colorMode } = useColorMode();
  const { user_profile_menu_visibility } = useAppSelector((state) => state.user_profile_slice);

  return (
    <TabList
      pos={"relative"}
      display={"flex"}
      flexDir={"column"}
      w={"100%"}
      h={"780px"}
      maxW={user_profile_menu_visibility ? "280px" : "70px"}
      p={"25px 0 25px 15px"}
      backgroundColor={colorMode === "dark" ? "brand.darkD" : "brand.grey"}
      overflow={"hidden"}
      transition={"all 150ms ease"}
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "70px",
        backgroundColor: colorMode === "dark" ? "brand.dark" : "brand.greyA",
        color: "#f2f2f2",
        zIndex: 1,
      }}>
      {children}
      <SidebarMenuSwitcher />
    </TabList>
  );
};
