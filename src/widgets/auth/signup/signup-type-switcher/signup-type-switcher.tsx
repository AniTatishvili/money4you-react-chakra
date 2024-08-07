import { useAppDispatch } from "app/providers/store";
import { setUpdatedUserData } from "app/providers/store/slices/signup";
import { useTranslation } from "react-i18next";
import React, { ChangeEvent, useEffect, useState } from "react";

import { HStack, Switch, Text, VStack } from "@chakra-ui/react";

export const SignupTypeSwitcher = () => {
  const { t } = useTranslation(["forms"]);

  const [signupTypeSwitcherValue, setSignupTypeSwitcherValue] = useState<number>(0);
  const dispatch = useAppDispatch();

  const handleChangeSignupTypeSwitcherStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const switcherValue = e.target.checked ? 1 : 0;
    setSignupTypeSwitcherValue(switcherValue);
    dispatch(setUpdatedUserData({ investor_signup_type: switcherValue }));
  };

  useEffect(() => {
    dispatch(setUpdatedUserData({ investor_signup_type: signupTypeSwitcherValue }));
  }, [signupTypeSwitcherValue]);

  return (
    <VStack align={"flex-start"} gap={"0"}>
      <Text fontSize={"13px"}>{t("forms:REPRESENT")}:</Text>
      <HStack align={"center"}>
        <Text fontSize={"14px"}>{t("forms:COMPANY")}</Text>
        <Switch
          variant={"signupTypeSwitch"}
          onChange={handleChangeSignupTypeSwitcherStatus}
          isChecked={Number(signupTypeSwitcherValue) ? true : false}
          value={signupTypeSwitcherValue}
          colorScheme={"yellow"}
        />
        <Text fontSize={"14px"}>{t("forms:PERSON")}</Text>
      </HStack>
    </VStack>
  );
};
