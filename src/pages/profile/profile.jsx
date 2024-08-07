import React from "react";
import { useColorMode } from "@chakra-ui/react";

import { Box } from "@chakra-ui/react";
import { PContentLayout, PContentSection } from "entities/layouts";
import { SelectProfile } from "./select-profile";

export const Profile = () => {
  const { colorMode } = useColorMode();

  return (
    <PContentLayout>
      <PContentSection>
        <Box bg={colorMode === "dark" ? "brand.darkB" : "brand.lightB"} borderRadius={4} w="100%" overflow={"hidden"}>
          <SelectProfile />
        </Box>
      </PContentSection>
    </PContentLayout>
  );
};
