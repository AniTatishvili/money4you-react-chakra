import { useAppSelector } from "app/providers/store";
import React from "react";

import { Flex } from "@chakra-ui/react";
import { CheckPhone } from "./check-phone";
import { UpdatePhone } from "./update-phone";
import { VerifyPhone } from "./verify-phone";

export const UpdatePhoneNumber = () => {
  const { old_number, new_number_is_valid } = useAppSelector((state) => state.update_number.update_number_datas);

  return (
    <Flex flexDir={"column"} gap={"5"}>
      <CheckPhone />
      {old_number && <UpdatePhone />}
      {new_number_is_valid ? <VerifyPhone /> : null}
    </Flex>
  );
};
