import React from "react";

import { Button } from "@chakra-ui/react";

export const PButton = (props) => {
  return (
    <Button className="jm-button-dark" loadingText="Loading..." spinnerPlacement="start" size="md" fontFamily="NunitoVariable" {...props}>
      {props.children}
    </Button>
  );
};
