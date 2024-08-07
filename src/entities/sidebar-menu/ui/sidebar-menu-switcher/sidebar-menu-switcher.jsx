import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { userProfileMenuVisibilityStatus } from "app/providers/store/slices/profiles/user-profile-slice";

import { Box } from "@chakra-ui/react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import s from "./sidebar-menu-switcher.module.scss";

export const SidebarMenuSwitcher = () => {
  const { t } = useTranslation("forms");
  const dispatch = useDispatch();
  const { user_profile_menu_visibility } = useSelector((state) => state.user_profile_slice);

  const [tabStatus, setTabStatus] = React.useState(JSON.parse(window.localStorage.getItem("user_profile_menu_status")));

  const handleHiddingTabsTitle = () => {
    setTabStatus((prev) => !prev);
    JSON.stringify(window.localStorage.setItem("user_profile_menu_status", !tabStatus));
  };

  React.useEffect(() => {
    const status = JSON.parse(window.localStorage.getItem("user_profile_menu_status"));
    if (status === null || status === undefined) JSON.stringify(window.localStorage.setItem("user_profile_menu_status", true));

    dispatch(userProfileMenuVisibilityStatus(status));
  }, [dispatch, tabStatus]);

  return (
    <>
      <Box className={s.menu_switcher} onClick={handleHiddingTabsTitle}>
        <Box className={s.switcher_icon}>{user_profile_menu_visibility ? <FaAngleDoubleLeft rotate="180deg" /> : <FaAngleDoubleRight />}</Box>
        <Box className={s.switcher_title}>{user_profile_menu_visibility ? <Box>{t("BUTTONS.COLLAPSE_MENU")}</Box> : null}</Box>
      </Box>
    </>
  );
};
