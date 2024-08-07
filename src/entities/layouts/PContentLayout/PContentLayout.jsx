import React from "react";

import { Box, useColorMode } from "@chakra-ui/react";
import { PAnimateLayout } from "entities/layouts";
import { PageTitle } from "shared/ui/headings/PageTitle";
import s from "./PageContentLayout.module.scss";

export const PContentLayout = (props) => {
  const { colorMode } = useColorMode();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PAnimateLayout>
      <Box className={s.wrapper} backgroundColor={colorMode === "dark" ? "brand.darkA" : "brand.lightA"}>
        {props.name ? <PageTitle name={props.name} {...props} /> : null}
        <div className={s.content}>{props.children}</div>
      </Box>
    </PAnimateLayout>
  );
};
