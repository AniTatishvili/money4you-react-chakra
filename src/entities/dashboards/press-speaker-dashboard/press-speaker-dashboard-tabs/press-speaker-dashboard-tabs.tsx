import React from "react";
import { useTranslation } from "react-i18next";

import { Show, TabPanel, TabPanels } from "@chakra-ui/react";
import { DashboardsTitle } from "entities/dashboards/ui/dashboards-title";
import { SidebarMenuTab } from "entities/sidebar-menu/ui";
import { SideBarMobileMenu } from "entities/sidebar-mobile-menu/sidebar-mobile-menu";
import { PressSpeakerDashboardJournalistList } from "../press-speaker-dashboard-journalist-list";

import { FaUsers } from "react-icons/fa";
import s from "./press-speaker-dashboard-tabs.module.scss";

export const PressSpeakerDashboardsTabs = () => {
  const { t } = useTranslation("psd");

  return (
    <TabPanels className={s.tab_panels} w={"100%"} p={{ base: "0", lg: "40px" }}>
      <TabPanel>
        <Show below="lg">
          <SideBarMobileMenu>
            <SidebarMenuTab icon={<FaUsers />}>{t("JOURNALISTS")}</SidebarMenuTab>
          </SideBarMobileMenu>
        </Show>
        <DashboardsTitle page_title={t("JOURNALISTS")} />
        <PressSpeakerDashboardJournalistList />
      </TabPanel>
    </TabPanels>
  );
};
