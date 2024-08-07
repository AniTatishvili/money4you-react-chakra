import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Flex } from "@chakra-ui/react";
import { InvestorSignupPage } from "entities/auth/signup";
import { PContentLayout, PContentSection } from "entities/layouts";

export const Signup = () => {
  const { t } = useTranslation("common");

  return (
    <PContentLayout name={t("USER.AUTH.SIGNUP")}>
      <PContentSection>
        <Flex flexDir="column" alignItems="center">
          <InvestorSignupPage />

          <Flex align="center" mt={4} gap={1} color="#dd9933" fontSize=".875rem">
            <Link to="/forgot-password">{t("USER.AUTH.FORGOT_YOUR_PASSWORD")}</Link>
            {"/"} <Link to="/login">{t("USER.AUTH.SIGNIN")}</Link>
          </Flex>
        </Flex>
      </PContentSection>
    </PContentLayout>
  );
};
