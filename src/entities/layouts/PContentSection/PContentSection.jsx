import React from "react";

import { Box } from "@chakra-ui/react";

export const PContentSection = (props) => {
  return (
    <Box w='100%' bg={props.bg} bgImage={props.bgImg} flex='0 0 auto' {...props}>
      <Box m='0 auto' p={{ base: "1.5rem 1rem", md: "2rem" }} maxW='1200px'>
        {props.children}
      </Box>
    </Box>
  );
};
