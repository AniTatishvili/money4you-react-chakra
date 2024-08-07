import { useAppSelector } from "app/providers/store";
import { useRegisterMutation } from "app/providers/store/api/auth/register";
import { Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";

import { Flex, Stack } from "@chakra-ui/react";

import { RegisterFields } from "widgets/auth/signup";

import { useChakraToast } from "shared/hooks";
import { journalist_signup_formik_values } from "./lib/signup-formik-values";
import { journalist_signup_validation_schema } from "./lib/signup-yup";

export const SignupWithoutKyc = () => {
  const toast = useChakraToast();
  const navigate = useNavigate();
  const { data } = useAppSelector((state) => state.signup);

  const [register] = useRegisterMutation();

  const onRegisterFormSubmit = async (values) => {
    const registerRequestData = {
      role_id: 9,
      ...data,
      ...values,
    };
    const form_data = new FormData();
    for (const k in registerRequestData) {
      form_data.append(k, registerRequestData[k]);
    }

    try {
      await register(form_data)
        .unwrap()
        .then((res) => window.localStorage.setItem("token", JSON.stringify(res.data.authorisation.token)))
        .then(() => {
          toast("success", "We've created your account for you.", "Account created.");
          navigate("/");
        });
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
    <Formik initialValues={journalist_signup_formik_values} validationSchema={journalist_signup_validation_schema} onSubmit={onRegisterFormSubmit}>
      {(formik) => {
        const { isSubmitting, isValid, dirty } = formik;

        return (
          <Form style={{ width: "100%" }}>
            <Flex flexDir="column" justifyContent="center">
              <Stack m="0 auto" spacing={4}>
                <Flex justifyContent="center" wrap={{ base: "wrap" }} gap={4}>
                  <RegisterFields isSubmitting={isSubmitting} isValid={isValid} dirty={dirty} />
                </Flex>
              </Stack>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
};
