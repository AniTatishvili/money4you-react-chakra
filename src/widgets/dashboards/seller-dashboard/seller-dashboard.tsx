import React from "react";
import { useTranslation } from "react-i18next";

import { Flex, Hide, Tabs } from "@chakra-ui/react";
import { SellerDashboardsTabs } from "entities/dashboards/seller-dashboard/seller-dashboard-tabs";
import { UserSidebarMenu } from "entities/sidebar-menu";
import { SidebarMenuTab } from "entities/sidebar-menu/ui";
import { FaLink, FaUsers } from "react-icons/fa";

export const SellerDashboard = () => {
  const { t } = useTranslation("sd");

  return (
    <Flex flexDir="row" w={"100%"} borderRadius={4} overflow={"hidden"}>
      <Tabs variant={"unstyled"} display={"flex"} w={"100%"}>
        <Hide below="lg">
          <UserSidebarMenu>
            <SidebarMenuTab icon={<FaUsers />}>{t("YOUR_CUSTOMERS")}</SidebarMenuTab>
            <SidebarMenuTab icon={<FaLink />}>{t("CREATE_REFERRAL_LINK")}</SidebarMenuTab>
          </UserSidebarMenu>
        </Hide>
        <SellerDashboardsTabs />
      </Tabs>
    </Flex>
  );
};
