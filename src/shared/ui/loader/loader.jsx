import React from "react";

import { Flex, Image } from "@chakra-ui/react";
import LoaderImg from "../../../app/assets/images/loader/bars.svg";

export const Loader = () => {
  return (
    <Flex pos={"fixed"} top={"0"} align={"center"} justify={"center"} w={"100%"} h={"100vh"} zIndex={"9999"} bg={"#242424"}>
      <Image src={LoaderImg} />
    </Flex>
  );
};
