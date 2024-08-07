import React from "react";
import { Link } from "react-router-dom";
import { useForgotPasswordTokenValidationMutation } from "app/providers/store/api";
import { useAppDispatch } from "app/providers/store";
import { chekingValidationStatus } from "app/providers/store/slices/auth/validateTokenSlice";
import { Formik, Form } from "formik";
import { confirmValidationTokenValues, confirmValidationTokenSchema } from "shared/formik";
import { useChakraToast } from "shared/hooks";

import { Flex, Stack } from "@chakra-ui/react";
import { PContentLayout, PContentSection } from "entities/layouts";
import { FormikControl } from "shared/formik/FormikControl";
import { PButton } from "shared/ui/buttons";

export const ConfirmForgotPasswordValidationToken = () => {
  const [forgotPasswordTokenValidation] = useForgotPasswordTokenValidationMutation();
  const dispatch = useAppDispatch();
  const toast = useChakraToast();

  const [responseLoading, setResponseLoading] = React.useState(false);

  const sendForgotPasswordValidationToken = async (values) => {
    setResponseLoading(true);
    await forgotPasswordTokenValidation(values)
      .unwrap()
      .then((response) => {
        const msg = "Enter your new password.";
        toast("success", msg);
        dispatch(chekingValidationStatus(response));
      })
      .catch((err) => {
        dispatch(chekingValidationStatus(err.success));
        // const msg = err?.response.data.error.message.message;
        const msg = "Invalid code.";
        toast("error", msg, "Error");
      })
      .finally(() => {
        setResponseLoading(false);
      });
  };

  return (
    <PContentLayout name="Confirm validation code">
      <PContentSection>
        <Flex flexDir="column" alignItems="center">
          <Formik initialValues={confirmValidationTokenValues} validationSchema={confirmValidationTokenSchema} onSubmit={sendForgotPasswordValidationToken}>
            {(formik) => {
              const { isValid, dirty } = formik;

              return (
                <Form style={{ width: "100%" }}>
                  <Stack m="0 auto" spacing={4} maxW="280px">
                    <FormikControl control="input" type="text" name="token" placeholder="Code" />

                    <PButton type="submit" disabled={!isValid || !dirty} isLoading={responseLoading}>
                      Send
                    </PButton>
                  </Stack>
                </Form>
              );
            }}
          </Formik>

          <Flex align="center" mt={4} gap={1} color="#dd9933" fontSize=".875rem">
            <Link to="/login">Sign in</Link>
            {"/"}
            <Link to="/signup">Sign up</Link>
          </Flex>
        </Flex>
      </PContentSection>
    </PContentLayout>
  );
};
