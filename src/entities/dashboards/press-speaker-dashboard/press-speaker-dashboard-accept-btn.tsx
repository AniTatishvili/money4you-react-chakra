import { Button } from "@chakra-ui/react";
import React from "react";

interface ButtonProps {
  className?: string;
  onClick?: React.MouseEventHandler;
  children: React.ReactNode;
  confirm: boolean;
}

export const PressSpeakerDashboardAcceptBtn = ({ className, onClick, children, confirm }: ButtonProps) => {
  return (
    <Button className={className} onClick={onClick} width={{ base: "100%", sm: "33%" }} isDisabled={confirm}>
      {children}
    </Button>
  );
};
