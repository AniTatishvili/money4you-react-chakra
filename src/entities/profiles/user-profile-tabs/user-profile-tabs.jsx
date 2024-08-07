import React from "react";
import { useTranslation } from "react-i18next";

import { TabPanels, TabPanel, Show } from "@chakra-ui/react";
// import { SidebarMenuPlaceholder } from "entities/sidebar-menu/ui";
import { UserProfileMenuTabs } from "widgets/profiles/user-profile-menu-tab";
import { SidebarMenuTabTitle } from "entities/sidebar-menu/ui";
import { SideBarMobileMenu } from "entities/sidebar-mobile-menu/sidebar-mobile-menu";
import { UpdateProfile } from "entities/profiles/user-profile-fields/update-profile/update-profile";
import { UpdatePhoneNumber } from "entities/profiles/user-profile-fields/update-phone-number/update-phone-number";
import { UpdateKYC } from "entities/profiles/user-profile-fields/update-kyc/update-kyc";
import { ChangePassword } from "entities/profiles/user-profile-fields/change-password/change-password";
import { UploadResume } from "../user-profile-fields/upload-resume/upload-resume";

import s from "./user-profile-tabs.module.scss";

export const UserProfileTabs = () => {
  const { t } = useTranslation("forms");

  return (
    <TabPanels className={s.tab_panels}>
      <TabPanel>
        <Show below="lg">
          <SideBarMobileMenu>
            <UserProfileMenuTabs />
          </SideBarMobileMenu>
        </Show>
        <SidebarMenuTabTitle title={t("PROFILE_SETTINGS.TABS.UPDATE_PROFILE")} />
        <UpdateProfile />
      </TabPanel>
      <TabPanel>
        <Show below="lg">
          <SideBarMobileMenu>
            <UserProfileMenuTabs />
          </SideBarMobileMenu>
        </Show>
        <SidebarMenuTabTitle title={t("PROFILE_SETTINGS.TABS.UPDATE_PHONE_NUMBER")} />
        <UpdatePhoneNumber />
      </TabPanel>
      <TabPanel>
        <Show below="lg">
          <SideBarMobileMenu>
            <UserProfileMenuTabs />
          </SideBarMobileMenu>
        </Show>
        <SidebarMenuTabTitle title={t("PROFILE_SETTINGS.TABS.UPDATE_KYC")} />
        <UpdateKYC />
      </TabPanel>
      <TabPanel>
        <Show below="lg">
          <SideBarMobileMenu>
            <UserProfileMenuTabs />
          </SideBarMobileMenu>
        </Show>
        <SidebarMenuTabTitle title={t("PROFILE_SETTINGS.TABS.CHANGE_PASSWORD")} />
        <ChangePassword />
      </TabPanel>
      <TabPanel>
        <Show below="lg">
          <SideBarMobileMenu>
            <UserProfileMenuTabs />
          </SideBarMobileMenu>
        </Show>
        <SidebarMenuTabTitle title={t("PROFILE_SETTINGS.TABS.RESUME")} />
        <UploadResume />
      </TabPanel>
    </TabPanels>
  );
};
