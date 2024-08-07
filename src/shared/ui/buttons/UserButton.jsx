import React from "react";

import { Button } from "@chakra-ui/react";

export const UserButton = (props) => {
  return (
    <Button
      loadingText="Loading..."
      spinnerPlacement="start"
      size="12px"
      // fontFamily='Nunito'
      {...props}>
      {props.children}
    </Button>
  );
};
