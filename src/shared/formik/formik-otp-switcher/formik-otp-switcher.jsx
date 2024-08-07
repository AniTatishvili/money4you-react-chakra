import React from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "app/providers/store";
import { setUpdatedUserData } from "app/providers/store/slices/signup";

import { Text, VStack, HStack, Switch } from "@chakra-ui/react";

export const FormikOTPSwitcher = () => {
  const { t } = useTranslation("forms");
  const dispatch = useAppDispatch();
  const { user_data } = useAppSelector((state) => state.auth);
  const [otpSwitcherStatus, setOtpSwitcherStatus] = React.useState("");

  React.useEffect(() => {
    setOtpSwitcherStatus(user_data?.sms_otp);
  }, [user_data]);

  React.useEffect(() => {
    if (Number(otpSwitcherStatus)) {
      dispatch(setUpdatedUserData({ sms_otp: 1 }));
    } else {
      dispatch(setUpdatedUserData({ sms_otp: 0 }));
    }
  }, [otpSwitcherStatus]);

  const updateOTPSwitcherStatus = (e) => {
    e.target.checked ? setOtpSwitcherStatus("1") : setOtpSwitcherStatus("0");
  };

  return (
    <VStack align={"flex-start"}>
      <Text fontSize={"14"}>{t("LOGIN_AUTHENTICATION_CODE_TYPE")}</Text>
      <HStack align={"center"}>
        <Text>{t("EMAIL")}</Text>
        <Switch onChange={updateOTPSwitcherStatus} isChecked={Number(otpSwitcherStatus) ? true : false} value={otpSwitcherStatus} colorScheme={"yellow"} />
        <Text>{t("SMS")}</Text>
      </HStack>
    </VStack>
  );
};
