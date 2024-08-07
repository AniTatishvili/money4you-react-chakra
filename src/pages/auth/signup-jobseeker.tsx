import React from "react";
import { Link } from "react-router-dom";

import { Flex } from "@chakra-ui/react";
import { PContentLayout, PContentSection } from "entities/layouts";
import { JobseekerSignupPage } from "entities/auth/signup";

export const SignupJobseeker = () => {
  return (
    <PContentLayout name="Sign up">
      <PContentSection>
        <Flex flexDir="column" alignItems="center">
          <JobseekerSignupPage />

          <Flex align="center" mt={4} gap={1} color="#dd9933" fontSize=".875rem">
            <Link to="/forgot-password">Forgot your password?</Link>
            {"/"} <Link to="/login">Sign in</Link>
          </Flex>
        </Flex>
      </PContentSection>
    </PContentLayout>
  );
};
