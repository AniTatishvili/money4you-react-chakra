import { useAppSelector } from "app/providers/store";
import { useJournalistSignupMutation } from "app/providers/store/api";
import { Form, Formik } from "formik";
import React from "react";
import { useChakraToast, useMakeBlob } from "shared/hooks";
import { journalist_signup_formik_values } from "./lib/signup-formik-values";
import { journalist_signup_validation_schema } from "./lib/signup-yup";

import { Flex, Stack } from "@chakra-ui/react";
import { JournalistSignupFields } from "widgets/auth/signup/journalist-signup-fields";

export const JournalistSignupPage = () => {
  const toast = useChakraToast();
  const { data } = useAppSelector((state) => state.signup);
  const { press_card_image } = useAppSelector((state) => state.journalist_auth_slice.press_card);

  const [journalistSignup] = useJournalistSignupMutation();

  const onJournalistSignupFormSubmit = async (values) => {
    const card = await useMakeBlob(press_card_image);

    const journalistSignupRequestData = {
      press_card: card,
      role_id: 8,
      ...data,
      ...values,
    };
    const form_data = new FormData();
    for (const k in journalistSignupRequestData) {
      form_data.append(k, journalistSignupRequestData[k]);
    }

    try {
      await journalistSignup(form_data)
        .unwrap()
        .then((res) => window.localStorage.setItem("token", JSON.stringify(res.data.authorisation.token)));
    } catch (e) {
      if (e.originalStatus === Number(500)) {
        const msg = "Please, try again. Something went wrong... 🙁";
        toast("error", msg, "Error");
      } else {
        const errArr = e.data.error.message;
        const msg = errArr.map((x) => x + " ");
        toast("error", msg, "Error");
      }
    }
  };

  return (
    <Formik initialValues={journalist_signup_formik_values} validationSchema={journalist_signup_validation_schema} onSubmit={onJournalistSignupFormSubmit}>
      {(formik) => {
        const { isSubmitting, isValid, dirty } = formik;

        return (
          <Form style={{ width: "100%" }}>
            <Flex flexDir="column" justifyContent="center">
              <Stack m="0 auto" spacing={4}>
                <Flex justifyContent="center" wrap={{ base: "wrap" }} gap={4}>
                  <JournalistSignupFields isSubmitting={isSubmitting} isValid={isValid} dirty={dirty} />
                </Flex>
              </Stack>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
};
