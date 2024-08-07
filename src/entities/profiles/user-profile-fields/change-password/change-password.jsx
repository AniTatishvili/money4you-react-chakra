import React from "react";
import { useTranslation } from "react-i18next";
import { useUpdatePasswordMutation } from "app/providers/store/api";
import { Formik, Form } from "formik";
import { FormikControl } from "shared/formik/FormikControl";
import { changePasswordValues, userProfileChangePasswordValidationSchema } from "entities/profiles/lib";

import { useChakraToast } from "shared/hooks";

import { Stack } from "@chakra-ui/react";
import { LockIcon } from "@chakra-ui/icons";
import { PButton } from "shared/ui/buttons";

export const ChangePassword = () => {
  const { t } = useTranslation("forms");
  const [changePassword] = useUpdatePasswordMutation();
  const toast = useChakraToast();

  const changePaswordOnFormSubmit = (values) => {
    // console.log(values);
  };

  return (
    <Formik initialValues={changePasswordValues} validationSchema={userProfileChangePasswordValidationSchema} onSubmit={changePaswordOnFormSubmit}>
      {(formik) => {
        const { isSubmitting, isValid, dirty, values, errors } = formik;

        return (
          <Form style={{ width: "100%" }}>
            <Stack spacing={4} maxW="280px">
              <FormikControl control="input" name="new_password" type="password" placeholder={t("PROFILE_SETTINGS.PASSWORD.NEW_PASSWORD")} icon={LockIcon} />
              <FormikControl
                control="input"
                name="new_password_confirm"
                type="password"
                placeholder={t("PROFILE_SETTINGS.PASSWORD.CONFIRM_NEW_PASSWORD")}
                icon={LockIcon}
              />
              <PButton maxW={"140px"} type="submit" isDisabled={!(isValid && dirty)}>
                {t("BUTTONS.UPDATE")}
              </PButton>
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
};
