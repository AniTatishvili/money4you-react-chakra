import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { getAcceptTerms } from "app/providers/store/slices/signup";

import { Flex, Checkbox, Text } from "@chakra-ui/react";

export const FormikRegistrationCheckbox = () => {
  const { t } = useTranslation("forms");
  const dispatch = useDispatch();

  const handlerAcceptUserTerms = (e) => {
    dispatch(getAcceptTerms({ terms_status: e.target.checked }));
  };

  return (
    <Flex alignItems="flex-start">
      <Checkbox dir="flex" alignItems="flex-start" size="md" colorScheme="yellow" id="terms_accept" onChange={handlerAcceptUserTerms}>
        <Text fontSize="xs">{t("SIGNUP_CONFIRMATION_CHECKBOX")}</Text>
      </Checkbox>
    </Flex>
  );
};
