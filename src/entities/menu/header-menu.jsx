import { MenuList } from "entities/menu-list";
import React from "react";

export const HeaderMenu = () => {
  return <MenuList icons={false} dynamic_class="header" gap="2.5" />;
};
