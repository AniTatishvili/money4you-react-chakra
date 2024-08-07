import React from "react";
import { Radio } from "@chakra-ui/react";

export const PRadioButton = (props) => {
  return (
    <Radio mt={"0"} colorScheme="yellow" size="md" value={props.value} {...props}>
      {props.name}
    </Radio>
  );
};
