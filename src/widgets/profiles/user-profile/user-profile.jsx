import React from "react";

import { Tabs, Hide } from "@chakra-ui/react";
import { UserSidebarMenu } from "entities/sidebar-menu";
import { UserProfileTabs } from "entities/profiles";
import { UserProfileMenuTabs } from "../user-profile-menu-tab";

export const UserProfile = () => {
  return (
    <Tabs variant="unstyled" display="flex">
      <Hide below="lg">
        <UserSidebarMenu>
          <UserProfileMenuTabs />
        </UserSidebarMenu>
      </Hide>
      <UserProfileTabs />
    </Tabs>
  );
};
