import React from "react";
import { useTranslation } from "react-i18next";

import { SidebarMenuTab } from "entities/sidebar-menu/ui";
import { FaUserEdit, FaMobileAlt, FaFingerprint, FaUnlockAlt, FaAddressCard } from "react-icons/fa";

export const UserProfileMenuTabs = () => {
  const { t } = useTranslation("forms");

  return (
    <>
      <SidebarMenuTab icon={<FaUserEdit />}>{t("PROFILE_SETTINGS.TABS.UPDATE_PROFILE")}</SidebarMenuTab>
      <SidebarMenuTab icon={<FaMobileAlt />}>{t("PROFILE_SETTINGS.TABS.UPDATE_PHONE_NUMBER")}</SidebarMenuTab>
      <SidebarMenuTab icon={<FaFingerprint />}>{t("PROFILE_SETTINGS.TABS.UPDATE_KYC")}</SidebarMenuTab>
      <SidebarMenuTab icon={<FaUnlockAlt />}>{t("PROFILE_SETTINGS.TABS.CHANGE_PASSWORD")}</SidebarMenuTab>
      <SidebarMenuTab icon={<FaAddressCard />}>{t("PROFILE_SETTINGS.TABS.RESUME")}</SidebarMenuTab>
    </>
  );
};
