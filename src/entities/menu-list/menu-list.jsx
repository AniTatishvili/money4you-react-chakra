import React from "react";
import { useTranslation } from "react-i18next";

import { List, ListItem, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const MenuList = (props) => {
  const { colorMode } = useColorMode();
  // flexDir = column | row;
  // dynamic_class = header | side | footer;
  // icons = true | false;
  const { t } = useTranslation("common");
  const { icons, dynamic_class, flexDir, gap } = props;

  return (
    <List display="flex" flexDir={flexDir} gap={gap} color={colorMode === "dark" ? "brand.lightA" : "brand.darkA"}>
      <ListItem className={`jm-menu-link-${dynamic_class}`}>
        {icons ? icons : null}
        {/* <a href="https://money4you.financial/">{t("NAVIGATION.MENU.HOME")}</a> */}
        <Link to={"/"}>{t("NAVIGATION.MENU.HOME")}</Link>
      </ListItem>
      <ListItem className={`jm-menu-link-${dynamic_class}`}>
        {icons ? icons : null}
        <a href="https://money4you.financial/projects">{t("NAVIGATION.MENU.PROJECTS")}</a>
      </ListItem>
      <ListItem className={`jm-menu-link-${dynamic_class}`}>
        {icons ? icons : null}
        <a href="https://money4you.financial/about">{t("NAVIGATION.MENU.ABOUT")}</a>
      </ListItem>
      <ListItem className={`jm-menu-link-${dynamic_class}`}>
        {icons ? icons : null}
        <a href="https://money4you.financial/blog">{t("NAVIGATION.MENU.BLOG")}</a>
      </ListItem>
      <ListItem className={`jm-menu-link-${dynamic_class}`}>
        {icons ? icons : null}
        <a href="https://money4you.financial/shop">{t("NAVIGATION.MENU.SHOP")}</a>
      </ListItem>
      <ListItem className={`jm-menu-link-${dynamic_class}`}>
        {icons ? icons : null}
        <a href="https://money4you.financial/jobs">{t("NAVIGATION.MENU.JOBS")}</a>
      </ListItem>
      <ListItem className={`jm-menu-link-${dynamic_class}`}>
        {icons ? icons : null}
        <a href="https://money4you.financial/press">{t("NAVIGATION.MENU.PRESS")}</a>
      </ListItem>
      <ListItem className="jm-menu-link jm-menu-link-extended">
        {icons ? icons : null}
        <a href="https://imedix.money4you.financial">iMediX</a>
      </ListItem>
    </List>
  );
};
