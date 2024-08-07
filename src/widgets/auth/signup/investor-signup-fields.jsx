import { clearTooltipData, setTooltipData } from "app/providers/store/slices/tutorial/tutorial-slice";
import React from "react";
import { useTranslation } from "react-i18next";
import { isValidPhoneNumber } from "react-phone-number-input/mobile";
import { useDispatch, useSelector } from "react-redux";

import { Box, Flex } from "@chakra-ui/react";

import { Kyc } from "./kyc-images";

import { CountrySelect } from "shared/formik/CountrySelect";
import { FormikControl } from "shared/formik/FormikControl";
import { PButton } from "shared/ui/buttons";
import { SignupCompanyConfidantCheckbox } from "./signup-company-confidant-checkbox/signup-company-confidant-checkbox";
import { SignupTypeSwitcher } from "./signup-type-switcher/signup-type-switcher";

import { AtSignIcon, LockIcon } from "@chakra-ui/icons";

export const InvestorSignupFields = ({ isSubmitting, isValid, dirty, name, surname }) => {
  const { t, i18n } = useTranslation(["common"]);
  const { phone, terms_status, social_title, gender, country } = useSelector((state) => state.signup.data);
  const { front, back, selfie } = useSelector((state) => state.kyc_images.datas);

  const defaultTooltipData = useSelector((state) => state.tooltipSlice.defaultTooltip);
  const kycTooltipData = useSelector((state) => state.tooltipSlice.kycTooltipComponentsData);
  const footerTooltipData = useSelector((state) => state.tooltipSlice.footerTooltipcomponentsData);

  {
    t("forms:");
  }

  const dispatch = useDispatch();

  const refs = {};

  const setRef = (name, ref, text) => {
    if (!ref) return;
    refs[name] = { ref, text, name };
  };

  const handleResize = () => {
    const tooltipComponents = Object.keys(refs).map((componentName) => {
      const { ref, text, name } = refs[componentName];
      if (!ref) return null;

      return {
        ref,
        text,
        name,
      };
    });

    const tooltipComponentsData = [...defaultTooltipData, ...kycTooltipData, ...tooltipComponents, ...footerTooltipData];
    dispatch(clearTooltipData());
    dispatch(setTooltipData(tooltipComponentsData));
  };

  React.useEffect(() => {
    if (defaultTooltipData && kycTooltipData) {
      handleResize();
    }
  }, [defaultTooltipData, kycTooltipData]);

  React.useEffect(() => {
    handleResize();
  }, [dispatch, i18n.language]);

  return (
    <>
      <Kyc />
      <Flex justifyContent="center" wrap={{ base: "wrap", md: "nowrap" }} gap={4}>
        <Flex flexDir="column" gap={4} w="100%" maxW="280px">
          <Box ref={(ref) => setRef("mobileNumberRef", ref, t("forms:ENTER_MOBILE_NUMBER"))}>
            <FormikControl control="phone" name="phone" placeholder={t("forms:ENTER_MOBILE_NUMBER")} />
          </Box>
          <Box ref={(ref) => setRef("userNameRef", ref, t("forms:USERNAME"))}>
            <FormikControl control="input" name="username" type="text" placeholder={t("forms:USERNAME")} />
          </Box>
          <Box ref={(ref) => setRef("socialTitleRef", ref, t("forms:SOCIAL_TITLE"))}>
            <FormikControl control="custom_select" name="prefix" />
          </Box>
          <Box ref={(ref) => setRef("firstNameRef", ref, t("forms:FIRST_NAME"))}>
            <FormikControl control="input" name="name" type="text" placeholder={t("forms:FIRST_NAME")} />
          </Box>
          <Box ref={(ref) => setRef("lastNameRef", ref, t("forms:LAST_NAME"))}>
            <FormikControl control="input" name="surname" type="text" placeholder={t("forms:LAST_NAME")} />
          </Box>
          <Box ref={(ref) => setRef("selectGenderRef", ref, t("forms:SELECT_YOUR_GENDER"))}>
            <FormikControl control="custom_select" name="gender" />
          </Box>
          <Box ref={(ref) => setRef("passportIDRef", ref, t("forms:PASSPORT_ID"))}>
            <FormikControl control="input" name="passport_id" type="text" placeholder={t("forms:PASSPORT_ID")} />
          </Box>
          <Box ref={(ref) => setRef("emailRef", ref, t("forms:EMAIL"))}>
            <FormikControl control="input" name="email" type="email" placeholder={t("forms:EMAIL")} icon={AtSignIcon} />
          </Box>
          <Box ref={(ref) => setRef("passwordRef", ref, t("forms:PASSWORD"))}>
            <FormikControl control="input" name="password" type="password" placeholder={t("forms:PASSWORD")} icon={LockIcon} />
          </Box>
          <Box ref={(ref) => setRef("confirmPasswordRef", ref, t("forms:PASSWORD"))}>
            <FormikControl control="input" name="password_confirm" type="password" placeholder={t("forms:PASSWORD")} icon={LockIcon} />
          </Box>
        </Flex>
        <Flex flexDir="column" gap={4} w="100%" maxW="280px">
          <Box ref={(ref) => setRef("selectCountryRef", ref, t("forms:SELECT_YOUR_COUNTRY"))}>
            <SignupTypeSwitcher />
          </Box>
          <Box ref={(ref) => setRef("selectCountryRef", ref, t("forms:SELECT_YOUR_COUNTRY"))}>
            <CountrySelect />
          </Box>
          <Box ref={(ref) => setRef("cityRef", ref, t("forms:CITY"))}>
            <FormikControl control="input" name="city" type="text" placeholder={t("forms:CITY")} />
          </Box>
          <Box ref={(ref) => setRef("postCodeRef", ref, t("forms:POST_CODE"))}>
            <FormikControl control="input" name="post_code" type="text" placeholder={t("forms:POST_CODE")} />
          </Box>
          <Box ref={(ref) => setRef("stateRef", ref, t("forms:STATE"))}>
            <FormikControl control="input" name="state" type="text" placeholder={t("forms:STATE")} />
          </Box>
          <Box ref={(ref) => setRef("streetRef", ref, t("forms:STREET"))}>
            <FormikControl control="input" name="street" type="text" placeholder={t("forms:STREET")} />
          </Box>
          <Box ref={(ref) => setRef("buildingNumberRef", ref, t("forms:BUILDING_NUMBER"))}>
            <FormikControl control="input" name="building_number" type="text" placeholder={t("forms:BUILDING_NUMBER")} />
          </Box>
          <Box ref={(ref) => setRef("aptNumberRef", ref, t("forms:APT_NUMBER"))}>
            <FormikControl control="input" name="apt_number" type="text" placeholder={t("forms:APT_NUMBER")} />
          </Box>
          <Box ref={(ref) => setRef("acceptTermsRef", ref, t("tutorial:ACCEPT_TERMS"))}>
            <FormikControl control="checkbox" name="accept" type="checkbox" />
          </Box>
          <Box ref={(ref) => setRef("acceptTermsRef", ref, t("tutorial:ACCEPT_TERMS"))}>
            <SignupCompanyConfidantCheckbox name={name} surname={surname} />
          </Box>
          <Box ref={(ref) => setRef("signupRef", ref, t("common:USER.AUTH.SIGNUP"))}>
            <PButton
              type="submit"
              m="0 auto"
              w="100%"
              maxW="280px"
              isDisabled={
                isSubmitting ||
                !(front && back && selfie && terms_status && phone && social_title && gender && country && isValidPhoneNumber(phone) && isValid && dirty)
              }
              isLoading={isSubmitting}>
              {t("common:USER.AUTH.SIGNUP")}
            </PButton>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};
