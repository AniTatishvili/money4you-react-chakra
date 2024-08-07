import React from "react";

import { useAppSelector } from "app/providers/store";
import { useVerifyPhoneMutation } from "app/providers/store/api";
import { useNavigate } from "react-router-dom";

import { verifyPhoneValidationSchema, verifyPhoneValue } from "entities/profiles/lib";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";

import { HStack, Text, VStack } from "@chakra-ui/react";
import { isValidPhoneNumber } from "react-phone-number-input";
import { FormikControl } from "shared/formik/FormikControl";
import { useChakraToast } from "shared/hooks";
import { PButton } from "shared/ui/buttons";

export const VerifyPhone = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("forms");
  const [verifyPhone, { isLoading }] = useVerifyPhoneMutation();
  const toast = useChakraToast();
  const { new_phone } = useAppSelector((state) => state.update_number.update_number_datas);

  const updatePhoneOnFormSubmit = async (values) => {
    // phone, otp, user_id
    const id = window !== undefined ? window.localStorage.getItem("UID") : null;
    const uid = id && JSON.parse(id);
    const verifyPhoneValues = {
      phone: new_phone,
      user_id: uid,
      ...values,
    };

    await verifyPhone(verifyPhoneValues)
      .unwrap()
      .then(() => {
        toast("success", "Your number has been updated");
      })
      .catch((err) => {
        const msgArr = err.data.error.message;
        const msg = Array.isArray(msgArr) ? msgArr.map((i) => i + " ") : msgArr;
        toast("error", msg, "Error");
      });
  };

  return (
    <Formik initialValues={verifyPhoneValue} validationSchema={verifyPhoneValidationSchema} onSubmit={updatePhoneOnFormSubmit}>
      {(formik) => {
        const { isValid, dirty } = formik;

        return (
          <Form style={{ width: "100%", marginTop: "20px" }}>
            <VStack align={"flex-start"} justify={"flex-start"} gap={"4"} maxW={"420px"}>
              <HStack>
                <Text fontSize={"14"}>{t("PROFILE_SETTINGS.PHONE.ENTER_SMS_CODE")}</Text>
              </HStack>
              <HStack align={"flex-start"} flexWrap={{ base: "wrap", sm: "nowrap" }} gap={"4"}>
                <FormikControl control="input" type="input" name="otp" placeholder={t("PROFILE_SETTINGS.PHONE.SMS_CODE")} minW={"220px"} />
                <PButton
                  type="submit"
                  w="100%"
                  maxW="180px"
                  isLoading={isLoading}
                  isDisabled={!new_phone || !isValidPhoneNumber(new_phone) || !isValid || !dirty}>
                  {t("BUTTONS.ACCEPT")}
                </PButton>
              </HStack>
            </VStack>
          </Form>
        );
      }}
    </Formik>
  );
};
