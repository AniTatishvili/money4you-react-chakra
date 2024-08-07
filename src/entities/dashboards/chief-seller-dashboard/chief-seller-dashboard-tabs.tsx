import React from "react";
import { useTranslation } from "react-i18next";

import { Show, TabPanel, TabPanels, useColorMode } from "@chakra-ui/react";
import { SidebarMenuTab } from "entities/sidebar-menu/ui";
import { SideBarMobileMenu } from "entities/sidebar-mobile-menu/sidebar-mobile-menu";
import { FaUsers } from "react-icons/fa";
import { DashboardsTitle } from "../ui/dashboards-title";
import { ChiefSellerDashboard } from "./chief-seller-dashboard";

export const ChiefSellerDashboardsTabs = () => {
  const { t } = useTranslation("csd");
  const { colorMode } = useColorMode();

  return (
    <TabPanels
      h={"780px"}
      overflowY={"auto"}
      overflowX={"hidden"}
      bg={colorMode === "dark" ? "brand.darkB" : "brand.lightB"}
      w={"100%"}
      p={{ base: "0", lg: "40px" }}>
      <TabPanel h={"100%"}>
        <Show below="lg">
          <SideBarMobileMenu>
            <SidebarMenuTab icon={<FaUsers />}>{t("SELLERS")}</SidebarMenuTab>
          </SideBarMobileMenu>
        </Show>
        <DashboardsTitle page_title={t("SELLERS")} />
        <ChiefSellerDashboard />
      </TabPanel>
    </TabPanels>
  );
};
