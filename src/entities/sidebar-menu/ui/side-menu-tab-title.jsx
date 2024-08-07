import React from "react";

import { Heading } from "@chakra-ui/react";

export const SidebarMenuTabTitle = (props) => {
  const { title } = props;
  return (
    <Heading
      size={{ base: "sm", md: "md" }}
      m={{ base: "1.5rem auto 1.5rem", md: "2rem auto 2rem", lg: "1.5rem auto 2.5rem" }}
      // px={{ base: "0.5rem", md: 4 }}
      letterSpacing="-0.05rem">
      {title}
    </Heading>
  );
};
