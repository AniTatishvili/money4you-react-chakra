import React from "react";

import { Button } from "@chakra-ui/react";

export const UserChatButton = (props) => {
  return (
    <Button
      className="bg_primary bg_rounded"
      loadingText="Loading..."
      spinnerPlacement="start"
      size="1rem"
      background="linear-gradient(203.65deg, #ED7CAB -1.51%, #A35173 100%)"
      // fontFamily='Nunito'
      {...props}>
      {props.children}
    </Button>
  );
};
