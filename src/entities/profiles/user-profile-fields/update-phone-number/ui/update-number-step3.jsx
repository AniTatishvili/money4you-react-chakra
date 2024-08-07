import React from "react";

import { PButton } from "shared/ui/buttons";

import { Flex, FormLabel, Box } from "@chakra-ui/react";

import { FormikControl } from "shared/formik/FormikControl";


export const UpdateNumberStep3 = ({ isSubmitting, isValid }) => {
  const inputValueData = (e) => {
    console.log("typed value", e.target.value);
  };

  return (
    <Box>
      <FormLabel>Confirm new number</FormLabel>
      <Flex gap={5}>
        <FormikControl control="input" name="code" placeholder="Sms code" onKeyUp={inputValueData} />
        <PButton type="submit" isDisabled={isSubmitting || isValid} isLoading={isSubmitting}>
          Save number
        </PButton>
      </Flex>
    </Box>
  );
};
