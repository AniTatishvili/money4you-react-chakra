import React from "react";

import { Flex, Input } from "@chakra-ui/react";

export const UploadInput = ({ name, id, accept, isLoading, cb, ...props }) => {
  return (
    <>
      <label htmlFor={id}>
        <Flex
          align={"center"}
          justify={"center"}
          px={"4"}
          py={"2"}
          w={"100%"}
          whiteSpace={"nowrap"}
          border={"none"}
          borderRadius={"4"}
          bg={isLoading ? "#d9d9d9" : "#242424"}
          color={"#f2f2f2"}
          fontWeight={"medium"}
          cursor={"pointer"}
          transition={"all 350ms ease"}
          pointerEvents={isLoading ? false : true}
          _hover={{
            background: "#dd9933",
            color: "#242424",
          }}
          {...props}>
          {name}
        </Flex>
      </label>
      <Input type={"file"} id={id} accept={accept} display={"none"} onChange={cb} disabled={isLoading ? true : false} />
    </>
  );
};
