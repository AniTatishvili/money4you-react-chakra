import { Button, useColorMode } from "@chakra-ui/react";
import React from "react";

interface ButtonProps {
  onClick?: React.MouseEventHandler;
  children: React.ReactNode;
  p?: string;
  borderRadius?: string;
}

export const TooltipBtn = ({ onClick, p, borderRadius, children }: ButtonProps) => {
  const { colorMode } = useColorMode();
  return (
    <Button
      className="jm-button-dark"
      loadingText="Loading..."
      spinnerPlacement="start"
      size="md"
      fontFamily="NunitoVariable"
      onClick={onClick}
      _hover={{
        backgroundColor: colorMode === "dark" ? "#fdfdfd!important" : "#323232!important",
        color: colorMode === "dark" ? "#121212!important" : "#fdfdfd!important",
      }}
      p={p}
      border={0}
      borderColor={"none"}
      borderRadius={borderRadius}>
      {children}
    </Button>
  );
};
// _hover={{"background-color: #12121"}}
