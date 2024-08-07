import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import { useForgotPasswordMutation } from "app/providers/store/api";
import { Formik, Form } from "formik";
import { forgotPasswordValues, forgotPasswordValidate } from "shared/formik";
import { useChakraToast } from "shared/hooks/useChakraToast";

import { Flex, Stack } from "@chakra-ui/react";
import { PContentLayout, PContentSection } from "entities/layouts";
import { FormikControl } from "shared/formik/FormikControl";
import { PButton } from "shared/ui/buttons";

export const ForgotPasswordWithEmailAndPassportID = () => {
  const { t } = useTranslation(["common", "forms"]);
  const [forgotPassword] = useForgotPasswordMutation();
  const navigate = useNavigate();
  const toast = useChakraToast();

  const [buttonLoadingStatus, setButtonLoadingStatus] = React.useState(false);

  return (
    <PContentLayout name={t("forms:FORGOT_PASSWORD")}>
      <PContentSection>
        <Flex flexDir="column" alignItems="center">
          <Formik
            initialValues={forgotPasswordValues}
            validationSchema={forgotPasswordValidate}
            onSubmit={async (values) => {
              setButtonLoadingStatus(true);
              await forgotPassword(values)
                .unwrap()
                .then((res) => {
                  if (res.success) {
                    navigate("/confirm-new-password");
                  }
                })
                .catch(() => {
                  // const errors = err?.data.error.message;
                  // const msg = Object.keys({ ...errors }).map((item) => errors[item] + " ");
                  const msg = "The entered values were not found.";
                  toast("error", msg, "Error");
                })
                .finally(() => {
                  setButtonLoadingStatus(false);
                });
            }}>
            {() => {
              return (
                <Form style={{ width: "100%" }}>
                  <Stack m="0 auto" spacing={4} maxW="280px">
                    <FormikControl control="input" type="email" name="email" placeholder={t("forms:EMAIL")} />
                    <FormikControl control="input" type="passport_id" name="passport_id" placeholder={t("forms:PASSPORT_ID")} />
                    <PButton type="submit" isLoading={buttonLoadingStatus}>
                      {t("forms:BUTTONS.SEND")}
                    </PButton>
                  </Stack>
                </Form>
              );
            }}
          </Formik>

          <Flex align="center" mt={4} gap={1} color="#dd9933" fontSize=".875rem">
            <Link to="/login">{t("common:USER.AUTH.SIGNIN")}</Link>
            {"/"}
            <Link to="/signup">{t("common:USER.AUTH.SIGNUP")}</Link>
          </Flex>
        </Flex>
      </PContentSection>
    </PContentLayout>
  );
};
