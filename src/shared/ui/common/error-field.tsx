import { Flex } from "@chakra-ui/react";
import React from "react";
import { PageTitle } from "../headings/PageTitle";
import { PText } from "../typography";

interface ErrorFieldProps {
  title?: string;
  text?: string;
}

export const ErrorField = ({ title, text }: ErrorFieldProps) => {
  return (
    <Flex flexDir={"column"} align={"center"}>
      <PageTitle name={title ?? "Whoops."} />
      <PText>{text ?? "Something went wrong. Please either refresh the page or contact support."}</PText>
    </Flex>
  );
};
