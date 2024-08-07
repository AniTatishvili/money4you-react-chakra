import React from "react";
import { Box } from "@chakra-ui/react";

export const ErrorBox = ({children}) => {
  return (
    <>
      <Box
        align="left"
        color="red.300"
        fontSize="12px">
        {children}
      </Box>
    </>
  )
}
