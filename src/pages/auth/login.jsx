import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Flex } from "@chakra-ui/react";
import { PContentLayout, PContentSection } from "entities/layouts";
import { LoginForm } from "widgets/auth/login";

export const Login = () => {
  const { t } = useTranslation("common");

  return (
    <PContentLayout name={t("USER.AUTH.SIGNIN")}>
      <PContentSection>
        <Flex flexDir="column" alignItems="center">
          <LoginForm />

          <Flex align="center" mt={4} gap={1} color="#dd9933" fontSize=".875rem">
            <Link to="/forgot-password">{t("USER.AUTH.FORGOT_YOUR_PASSWORD")}</Link>
            {"/"}
            <Link to="/signup">{t("USER.AUTH.SIGNUP")}</Link>
          </Flex>
        </Flex>
      </PContentSection>
    </PContentLayout>
  );
};
