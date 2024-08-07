import React from "react";

import { Button } from "@chakra-ui/react";

export const UserCampaiginsButton = (props) => {
  return (
    <Button
      //   className='jm-button-dark'
      loadingText="Loading..."
      spinnerPlacement="start"
      size="md"
      // fontFamily='Nunito'
      {...props}>
      {props.children}
    </Button>
  );
};
