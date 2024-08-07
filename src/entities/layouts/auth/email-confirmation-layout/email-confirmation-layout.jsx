import React from "react";
import { Link } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

import { PContentLayout, PContentSection } from "entities/layouts";

import s from "./email-confirmation-layout.module.scss";

export const EmailConfirmationLayout = () => {
  return (
    <PContentLayout>
      <PContentSection>
        <div className={s.notfound}>
          <div className={s.emoji}>🎊</div>
          <div className={s.error}>Congratilations!</div>
          <div className={s.title}>You have completed the registration process.</div>
          <div className={s.desc}>
            You will be automatically redirected to the login page. If not, please use{" "}
            <ChakraLink as={Link} color='#dd9933' to='/login'>
              this link
            </ChakraLink>
            .
          </div>
        </div>
      </PContentSection>
    </PContentLayout>
  );
};
