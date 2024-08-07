import React from "react";

import { Box } from "@chakra-ui/react";
import { PContentLayout } from "entities/layouts";
import { UserDashboard } from "widgets/dashboards/user-dashboard";

export const Investor = () => {
  return (
    <PContentLayout>
      <Box w="100%" flex="0 0 auto">
        <Box m="0 auto" p={{ base: "1.5rem 1rem", md: "2rem" }} maxW="1480px">
          <UserDashboard />
        </Box>
      </Box>
    </PContentLayout>
  );
};
