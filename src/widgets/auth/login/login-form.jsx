import { useUserSigninMutation } from "app/providers/store/api";
import { Form, Formik } from "formik";
import React from "react";
import { authorizationValues } from "shared/formik/formikValues";
import { authorizationValidationSchema } from "shared/formik/yup";

import { LoginFields } from "./login-fields";
// import { PinWidget } from "widgets/pin";
import { useChakraToast } from "shared/hooks/useChakraToast";
import { Loader } from "shared/ui/loader";
import { LoginOtpVerifyForm } from "./login-otp-verify-form";

export const LoginForm = () => {
  const [userSignin, { isLoading, isSuccess }] = useUserSigninMutation();
  const toast = useChakraToast();

  const signinFormSubmit = async (values) => {
    try {
      await userSignin(values)
        .unwrap()
        .then((res) => {
          const title = "One time password sending";
          const msg = "Please check your phone.";
          toast("success", msg, title);
          const { user_id } = res;
          window.localStorage.setItem("UID", JSON.stringify(user_id));
        });
    } catch (err) {
      if (JSON.parse(window.localStorage.getItem("UID"))) {
        window.localStorage.removeItem("UID");
      }

      const msg = "You have entered an invalid username or password.";
      toast("error", msg, "Error");
    }
  };

  if (isLoading) return <Loader />;

  return (
    <>
      {isSuccess ? (
        <LoginOtpVerifyForm />
      ) : (
        <Formik initialValues={authorizationValues} validationSchema={authorizationValidationSchema} validateOnMount onSubmit={signinFormSubmit}>
          {(formik) => {
            return (
              <Form style={{ width: "100%" }}>
                <LoginFields loading={isLoading} {...formik} />
              </Form>
            );
          }}
        </Formik>
      )}
    </>
  );
};
