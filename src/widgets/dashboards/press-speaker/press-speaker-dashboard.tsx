import React from "react";
import { useTranslation } from "react-i18next";

import { Flex, Hide, Tabs, useColorMode } from "@chakra-ui/react";
import { PressSpeakerDashboardsTabs } from "entities/dashboards/press-speaker-dashboard/press-speaker-dashboard-tabs/press-speaker-dashboard-tabs";
import { UserSidebarMenu } from "entities/sidebar-menu";
import { SidebarMenuTab } from "entities/sidebar-menu/ui";

import { FaUsers } from "react-icons/fa";

export const PressSpeakerDashboard = () => {
  const { t } = useTranslation("psd");
  const { colorMode } = useColorMode();

  return (
    <Flex flexDir="row" w={"100%"} borderRadius={4} bg={colorMode === "dark" ? "brand.darkB" : "brand.lightB"} overflow={"hidden"}>
      <Tabs variant={"unstyled"} display={"flex"} w={"100%"}>
        <Hide below="lg">
          <UserSidebarMenu>
            <SidebarMenuTab icon={<FaUsers />}>{t("JOURNALISTS")}</SidebarMenuTab>
          </UserSidebarMenu>
        </Hide>
        <PressSpeakerDashboardsTabs />
      </Tabs>
    </Flex>
  );
};
