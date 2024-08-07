import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForgotPasswordResetMutation } from "app/providers/store/api";
import { useAppSelector } from "app/providers/store";
import { Formik, Form } from "formik";
import { confirmNewPasswordValues, confirmNewPasswordSchema } from "shared/formik";

import { Flex, Stack } from "@chakra-ui/react";
import { LockIcon } from "@chakra-ui/icons";
import { useChakraToast } from "shared/hooks";
import { FormikControl } from "shared/formik/FormikControl";
import { PContentLayout, PContentSection } from "entities/layouts";
import { PButton } from "shared/ui/buttons";

export const ConfirmNewPassword = () => {
  const [forgotPasswordReset] = useForgotPasswordResetMutation();
  const { token } = useAppSelector((state) => state.tokenStatus);
  const navigate = useNavigate();
  const toast = useChakraToast();

  const [responseLoading, setResponseLoading] = React.useState(false);

  const sendNewPasswordConfirmation = async (value) => {
    setResponseLoading(true);

    await forgotPasswordReset({ token, ...value })
      .unwrap()
      .then(() => {
        const title = "Your password has been reset.";
        const msg = "You can try logging in with a new password.";
        toast("success", msg, title);
        navigate("/login");
      })
      .catch((err) => {
        const error = err.message;
        toast("error", error, "Error");
      })
      .finally(() => setResponseLoading(false));
  };

  return (
    <PContentLayout name="Reset password">
      <PContentSection>
        <Flex flexDir="column" align="center">
          <Formik initialValues={confirmNewPasswordValues} validationSchema={confirmNewPasswordSchema} onSubmit={sendNewPasswordConfirmation}>
            {(formik) => {
              return (
                <Form style={{ width: "100%" }}>
                  <Stack m="0 auto" spacing={4} maxW="280px">
                    <FormikControl control="input" type="password" name="password" placeholder="New password" icon={LockIcon} />
                    <FormikControl control="input" type="password" name="password_confirmation" placeholder="Confirm password" icon={LockIcon} />

                    <PButton type="submit" disabled={!(formik.isValid && formik.dirty)} isLoading={responseLoading}>
                      Save
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
