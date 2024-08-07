import React from "react";
import { useTranslation } from "react-i18next";

import { Flex, Hide, Tabs } from "@chakra-ui/react";
import { ChiefSellerDashboardsTabs } from "entities/dashboards/chief-seller-dashboard/chief-seller-dashboard-tabs";
import { UserSidebarMenu } from "entities/sidebar-menu";
import { SidebarMenuTab } from "entities/sidebar-menu/ui";
import { FaUsers } from "react-icons/fa";

export const ChiefSellerDashboard = () => {
  const { t } = useTranslation("csd");

  return (
    <Flex flexDir="row" w={"100%"} borderRadius={4} overflow={"hidden"}>
      <Tabs variant={"unstyled"} display={"flex"} w={"100%"}>
        <Hide below="lg">
          <UserSidebarMenu>
            <SidebarMenuTab icon={<FaUsers />}>{t("SELLERS")}</SidebarMenuTab>
          </UserSidebarMenu>
        </Hide>
        <ChiefSellerDashboardsTabs />
      </Tabs>
    </Flex>
  );
};
