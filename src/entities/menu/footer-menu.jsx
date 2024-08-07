import React from "react";

import { MenuList } from "entities/menu-list";
import { FaAngleRight } from "react-icons/fa";

export const FooterMenu = () => {
  return <MenuList icons={<FaAngleRight />} flexDir="column" dynamic_class="footer" />;
};
