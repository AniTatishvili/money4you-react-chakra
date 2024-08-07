import React from "react";
import { useTranslation } from "react-i18next";
import { FormikControl } from "shared/formik/FormikControl";
import { WarningIcon } from "@chakra-ui/icons";
import { PButton } from "shared/ui";

export const LoginOtpVerifyField = (formik) => {
  const { t } = useTranslation("forms");
  const { loading, isValid, dirty } = formik;
  return (
    <>
      <FormikControl control="input" name="otp" type="text" placeholder={t("ONE_TIME_PASSWORD")} icon={WarningIcon} />
      <PButton type="submit" disabled={loading || !(isValid && dirty)} isLoading={loading}>
        {t("BUTTONS.SEND")}
      </PButton>
    </>
  );
};
