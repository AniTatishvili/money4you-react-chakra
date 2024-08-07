import React from "react";
import { createPortal } from "react-dom";
import { Outlet } from "react-router-dom";

import { Box, Flex } from "@chakra-ui/react";
import { CookiePolicy } from "entities/policy";
import { RadioWidget } from "entities/radio";
import { TutorialTooltip } from "entities/tutorial-tooltip";
import { Tv } from "entities/tv";
import { Footer } from "widgets/footer";
import { SHeader } from "widgets/headers";

export const PageMainLayout = () => {
  return (
    <Flex flexDir="column" w="100%" maxW="100vw" minH="100vh">
      <SHeader />
      <Box m="0 auto" flex="1 0 auto" w="100%" maxW={"100%"}>
        <Outlet />
      </Box>

      {createPortal(<TutorialTooltip />, document.body)}

      {createPortal(<Tv />, document.body)}
      {createPortal(<RadioWidget />, document.body)}
      {createPortal(<CookiePolicy />, document.body)}
      <Footer />
    </Flex>
  );
};
