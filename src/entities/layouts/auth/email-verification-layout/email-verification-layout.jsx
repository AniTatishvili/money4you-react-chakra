import React from "react";
import { useNavigate } from "react-router-dom";
import { emailVerificationReq } from "./api/email-verification-api";

import { PContentLayout, PContentSection } from "entities/layouts";
import { useChakraToast } from "shared/hooks";

import s from "./email-verification-layout.module.scss";

export const EmailVerificationLayout = () => {
  const navigate = useNavigate();
  const toast = useChakraToast();

  React.useEffect(() => {
    (async () => {
      const url = new URL(window.location.href);
      const searchParams = url.searchParams;
      const requestUrl = searchParams.get("queryURL").replace(/\+/g, "");

      // console.log(requestUrl);
      // console.log(searchParams);

      await emailVerificationReq(requestUrl).then((res) => {
        if (res.data && res.data.success) {
          toast("success", res.data.data.message);
          navigate("/email-confirmation");
        } else {
          toast("error", res.error.message, "Error");
          navigate("/not-found");
        }
      });
    })();

    // eslint-disable-next-line
  }, []);

  return (
    <PContentLayout>
      <PContentSection>
        <div className={s.notfound}>
          <div className={s.emoji}>📬</div>
          <div className={s.error}>Email verification</div>
          <div className={s.title}>We have sent you an email confirming your registration.</div>
          <div className={s.desc}>You need to confirm the registration process in order to complete it. Please, check your email.</div>
        </div>
      </PContentSection>
    </PContentLayout>
  );
};
