import React from "react";
import { useTranslation } from "react-i18next";

import { Stack } from "@chakra-ui/react";
import { LockIcon } from "@chakra-ui/icons";
import { PButton } from "shared/ui/buttons";
import { FormikControl } from "shared/formik/FormikControl";

export const LoginFields = (formik) => {
  const { t } = useTranslation(["common", "forms"]);
  const { loading, isValid, dirty } = formik;

  return (
    <Stack m="0 auto" spacing={4} maxW="280px">
      <FormikControl control="input" name="username" type="text" placeholder={t("forms:USERNAME")} />
      <FormikControl control="input" name="password" type="password" placeholder={t("forms:PASSWORD")} icon={LockIcon} />
      <PButton type="submit" disabled={loading || !(isValid && dirty)} isLoading={loading}>
        {t("common:USER.AUTH.SIGNIN")}
      </PButton>
    </Stack>
  );
};
