import React from "react";
import { useTranslation } from "react-i18next";
import { useCheckPhoneMutation } from "app/providers/store/api";
import { useAppSelector, useAppDispatch } from "app/providers/store";
import { editProfileUpdatePhoneNumber } from "app/providers/store/slices/profiles/user-update-number-slice";
import { Formik, Form } from "formik";
import { checkPhoneValue, checkPhoneValidationSchema } from "entities/profiles/lib";
import { useChakraToast } from "shared/hooks";

import { VStack, HStack, Text } from "@chakra-ui/react";
import { PButton } from "shared/ui/buttons";
import { FormikControl } from "shared/formik/FormikControl";

export const CheckPhone = () => {
  const { t } = useTranslation("forms");
  const [checkPhone, { isLoading }] = useCheckPhoneMutation();
  const { user_data } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const toast = useChakraToast();

  const [number, setNumber] = React.useState();
  React.useEffect(() => {
    if (user_data?.phone) {
      const arr = Array.from(user_data?.phone);
      arr.map((_, i) => {
        if (i >= arr.length - 4) {
          arr[i] = "*";
        }
      });
      setNumber(arr.join(""));
    }
  }, [user_data]);

  const checkMobilePhoneLastCharactersFormSubmit = async (values) => {
    const fd = new FormData();
    fd.append("phone", values.old_number_last_characters);
    checkPhone(fd)
      .unwrap()
      .then((res) => {
        dispatch(editProfileUpdatePhoneNumber({ old_number: res.data }));
      })
      .catch((e) => {
        // console.log(e);
        const msg = e.data.error.message;
        toast("error", msg, "Error");
      });
  };

  return (
    <Formik initialValues={checkPhoneValue} validationSchema={checkPhoneValidationSchema} onSubmit={checkMobilePhoneLastCharactersFormSubmit}>
      {(formik) => {
        const { isValid, dirty } = formik;

        return (
          <Form style={{ width: "100%" }}>
            <VStack align={"flex-start"} justify={"flex-start"} gap={"4"} maxW={"420px"}>
              <HStack flexWrap={"wrap"}>
                <Text fontSize={"14"}>{t("PROFILE_SETTINGS.PHONE.CONFIRM_OLD_NUMBER")}</Text>
                <Text fontSize={"14"} fontWeight={"800"}>
                  {number}
                </Text>
              </HStack>
              <HStack align={"flex-start"} flexWrap={{ base: "wrap", sm: "nowrap" }} gap={{ base: "2", sm: "4" }}>
                <FormikControl
                  control="input"
                  type="input"
                  name="old_number_last_characters"
                  placeholder={t("PROFILE_SETTINGS.PHONE.ENTER_LAST_SYMBOLS")}
                  minW={"220px"}
                />
                <PButton type="submit" w="100%" maxW="200px" isLoading={isLoading} isDisabled={!isValid || !dirty}>
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
