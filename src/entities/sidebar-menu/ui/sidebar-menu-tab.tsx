import React from "react";
import { useColorMode, useMultiStyleConfig, useTab } from "@chakra-ui/react";

import { Box, Button } from "@chakra-ui/react";
import s from "./sidebar-menu-tab.module.scss";

interface IProps {
  // eslint-disable-next-line
  icon?: any;
  children: string;
}

// eslint-disable-next-line
export const SidebarMenuTab = React.forwardRef((props: IProps, ref: any) => {
  const { colorMode } = useColorMode();
  const tabProps = useTab({ ...props, ref });
  const isSelected = !!tabProps["aria-selected"];
  // 2. Hook into the Tabs `size`, `variant`, props
  const styles = useMultiStyleConfig("Tabs", tabProps);

  return (
    <Button
      __css={styles.tab}
      {...tabProps}
      className={isSelected ? `${s.tab_wrapper}  ${s.isSelected}` : `${s.tab_wrapper}`}
      backgroundColor={isSelected && colorMode === "dark" ? "brand.darkB" : isSelected && colorMode === "light" ? "brand.lightB" : "transparent"}>
      <Box className={s.tab} color={isSelected ? "brand.gold" : colorMode === "dark" ? "brand.light" : "brand.dark"}>
        {props?.icon ? <div className={s.icon}>{props.icon}</div> : null}
        <Box className={s.tab_title}>{tabProps.children}</Box>
      </Box>
    </Button>
  );
});
