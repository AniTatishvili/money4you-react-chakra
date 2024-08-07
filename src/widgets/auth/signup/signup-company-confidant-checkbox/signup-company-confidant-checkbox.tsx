import { useAppDispatch, useAppSelector } from "app/providers/store";
import { setUpdatedUserData } from "app/providers/store/slices/signup";
import { useTranslation } from "react-i18next";
import React, { ChangeEvent } from "react";
import { Checkbox, Flex, Text } from "@chakra-ui/react";

interface Props {
  name: string;
  surname: string;
}

export const SignupCompanyConfidantCheckbox = ({ name, surname }: Props) => {
  const { t } = useTranslation(["forms"]);

  const dispatch = useAppDispatch();

  // const [checkbox, setCheckbox] = React.useState<number>(0);

  const handleChangeCompanyConfidantCheckboxStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const checkboxValue = e.target.checked ? 1 : 0;
    // setCheckbox(checkboxValue);
    dispatch(setUpdatedUserData({ company_confidant_accept: checkboxValue }));
  };

  const { investor_signup_type }: any = useAppSelector((state) => state.signup.data);

  return (
    <Flex alignItems="flex-start">
      {investor_signup_type === 0 && (
        <Checkbox dir="flex" alignItems="flex-start" size="md" colorScheme="yellow" id="confidant_accept" onChange={handleChangeCompanyConfidantCheckboxStatus}>
          <Text fontSize="xs">{t("SIGNUP_COMPANY_CONFIRMATION_CHECKBOX", { full_name: name + " " + surname })}</Text>
        </Checkbox>
      )}
    </Flex>
  );
};
