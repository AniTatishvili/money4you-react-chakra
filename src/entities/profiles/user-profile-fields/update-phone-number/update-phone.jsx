import { useAppDispatch, useAppSelector } from "app/providers/store";
import { useUpdatePhoneMutation } from "app/providers/store/api";
import { editProfileUpdatePhoneNumber } from "app/providers/store/slices/profiles/user-update-number-slice";
import { updatePhoneValue } from "entities/profiles/lib";
import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { useChakraToast } from "shared/hooks";

import { HStack, Text, VStack } from "@chakra-ui/react";
import { isValidPhoneNumber } from "react-phone-number-input";
import { FormikControl } from "shared/formik/FormikControl";
import { PButton } from "shared/ui/buttons";

export const UpdatePhone = () => {
  const { t } = useTranslation("forms");
  const [updatePhone, { isLoading }] = useUpdatePhoneMutation();
  const dispatch = useAppDispatch();
  const toast = useChakraToast();
  const { new_phone } = useAppSelector((state) => state.update_number.update_number_datas);

  const updatePhoneOnFormSubmit = async (values) => {
    const fd = new FormData();
    fd.append("phone", values.phone);
    await updatePhone(fd)
      .unwrap()
      .then(() => {
        dispatch(editProfileUpdatePhoneNumber({ new_number_is_valid: true }));
      })
      .catch((err) => {
        const msgArr = err.data.error.message;
        const msg = Array.isArray(msgArr) ? msgArr.map((i) => i + " ") : msgArr;
        toast("error", msg, "Error");

        // FIXME: update this function after SMS API is ready
        dispatch(editProfileUpdatePhoneNumber({ new_number_is_valid: false }));
      });
  };

  const phoneFieldValue = (value, setFieldValue) => {
    dispatch(editProfileUpdatePhoneNumber({ new_phone: value }));
    setFieldValue("phone", value);
  };

  return (
    <Formik initialValues={updatePhoneValue} onSubmit={updatePhoneOnFormSubmit}>
      {(formik) => {
        const { isValid, dirty, values, setFieldValue } = formik;

        return (
          <Form style={{ width: "100%", marginTop: "20px" }}>
            <VStack align={"flex-start"} justify={"flex-start"} gap={"4"} maxW={"420px"}>
              <HStack>
                <Text fontSize={"14"}>{t("PROFILE_SETTINGS.PHONE.ENTER_NEW_MOBILE_NUMBER")}</Text>
              </HStack>
              <VStack align={"flex-start"} flexWrap={{ base: "wrap", sm: "nowrap" }} gap={"4"}>
                <FormikControl
                  onChange={(value) => phoneFieldValue(value, setFieldValue)}
                  value={values["phone"]}
                  control="phone"
                  type="input"
                  name="phone"
                  placeholder={t("PROFILE_SETTINGS.PHONE.NEW_MOBILE_NUMBER")}
                />
                <PButton
                  type="submit"
                  w="100%"
                  maxW="180px"
                  isLoading={isLoading}
                  isDisabled={!new_phone || !isValidPhoneNumber(new_phone) || !isValid || !dirty}>
                  {t("BUTTONS.ACCEPT")}
                </PButton>
              </VStack>
            </VStack>
          </Form>
        );
      }}
    </Formik>
  );
};
