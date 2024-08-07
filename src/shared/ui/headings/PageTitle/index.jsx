import React from "react";

import { Heading } from "@chakra-ui/react";

export const PageTitle = (props) => {
  return (
    <Heading
      size={{ base: "lg", md: "xl" }}
      m={{ base: "1.5rem auto 0", md: "2rem auto 0", lg: "3.5rem auto 0" }}
      px={{ base: "0.5rem", md: 4 }}
      letterSpacing='-0.05rem'>
      {props.name}
    </Heading>
  );
};
