import { Flex } from "@chakra-ui/react";
import React, { LegacyRef, forwardRef } from "react";

import { AiFillCloseCircle } from "react-icons/ai";
import { TooltipBtn } from "./ui/tooltip-btn";

interface TooltipCloseBtnProps {
  onClick: () => void;
}

export const TooltipCloseBtn = forwardRef((props: TooltipCloseBtnProps, ref: LegacyRef<HTMLDivElement> | undefined) => {
  return (
    <Flex justifyContent={"flex-end"} ref={ref} onClick={props.onClick} pos={"absolute"} top={"-15px"} right={"-10px"}>
      <TooltipBtn onClick={props.onClick} p={"0"} borderRadius={"50%"}>
        <AiFillCloseCircle style={{ fontSize: "18px" }} />
      </TooltipBtn>
    </Flex>
  );
});
