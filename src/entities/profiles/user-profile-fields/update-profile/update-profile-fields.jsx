import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { AtSignIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/react";
import { CountrySelect } from "shared/formik/CountrySelect";
import { FormikControl } from "shared/formik/FormikControl";
import { PButton } from "shared/ui/buttons/PButton";

export const UserProfileFields = ({ isSubmitting, isValid, dirty, touched }) => {
  const { t } = useTranslation("forms");
  const data = useSelector((state) => state.signup.data);

  return (
    <>
      <Flex justify={"space-between"} wrap={{ base: "wrap", lg: "nowrap" }} gap={4} mt={"5"} maxW={"700px"}>
        <Flex flexDir="column" width={320} gap={"4"}>
          <FormikControl control="input" name="name" type="text" placeholder={t("FIRST_NAME")} />
          <FormikControl control="input" name="surname" type="text" placeholder={t("LAST_NAME")} />
          <FormikControl control="custom_select" name="gender" />
          <FormikControl control="custom_select" name="prefix" />
          <FormikControl control="input" name="email" type="email" placeholder={t("EMAIL")} icon={AtSignIcon} />
          <FormikControl control="otp_switcher" name="otp_switcher" />
        </Flex>
        <Flex flexDir="column" alignItems="flex-end" width={320}>
          <Flex flexDir="column" gap={"4"}>
            <FormikControl control="input" name="passport_id" type="text" placeholder={t("PASSPORT_ID")} />
            <CountrySelect />
            <FormikControl control="input" name="city" type="text" placeholder={t("CITY")} />
            <FormikControl control="input" name="post_code" type="text" placeholder={t("POST_CODE")} />
            <FormikControl control="input" name="state" type="text" placeholder={t("STATE")} />
            <FormikControl control="input" name="street" type="text" placeholder={t("STREET")} />
            <Flex gap={8}>
              <FormikControl control="input" name="building_number" type="text" placeholder={t("BUILDING_NUMBER")} />
              <FormikControl control="input" name="apt_number" type="text" placeholder={t("APT_NUMBER")} />
            </Flex>
          </Flex>
          <PButton
            m="25px 0 0"
            w="100%"
            maxW="120px"
            type="submit"
            isDisabled={(Object.keys(touched).length === 0 && Object.keys(data).length === 0) || isSubmitting || (!isValid && dirty)}
            isLoading={isSubmitting}>
            {t("BUTTONS.SAVE")}
          </PButton>
        </Flex>
      </Flex>
    </>
  );
};
