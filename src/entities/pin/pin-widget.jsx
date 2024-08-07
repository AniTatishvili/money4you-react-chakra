import { useAppDispatch } from "app/providers/store";
import { useOTPVerifyMutation } from "app/providers/store/api/auth";
import React from "react";
import { useNavigate } from "react-router-dom";

import { Flex, HStack, PinInput, PinInputField, VStack } from "@chakra-ui/react";
import { ErrorMessage, Form, Formik } from "formik";
import { ErrorBox } from "shared/formik/ErrorBox";
import { useChakraToast } from "shared/hooks";
import { PButton } from "shared/ui/buttons";
import { pin_formik_values, pin_yup } from "./lib";

export const PinWidget = (props) => {
  const { relocate } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const toast = useChakraToast();
  const uid = window !== undefined ? JSON.parse(window.localStorage.getItem("UID")) : null;

  const [OTPverify, { isLoading }] = useOTPVerifyMutation();

  const onPinCodeSubmit = async (values) => {
    const fd = new FormData();
    fd.append("otp", values.pin);
    fd.append("user_id", uid);

    try {
      const res = await OTPverify(fd).unwrap();
      // console.log(res);
      if (res?.success && relocate) {
        navigate(`/${relocate}`);
      }
    } catch (error) {
      toast("error", error.data.error.message, "Error");
    }
  };

  const onChangeCode = (value, setFieldValue) => {
    setFieldValue("pin", value);
  };

  return (
    <Formik initialValues={pin_formik_values} validationSchema={pin_yup} onSubmit={onPinCodeSubmit}>
      {({ isSubmitting, isValid, dirty, values, setFieldValue }) => {
        return (
          <Form>
            <Flex flexDir={"column"} align={"center"} gap={"35px"}>
              <VStack align={"flex-start"} maxW={"280px"}>
                <HStack>
                  <PinInput
                    otp
                    autoFocus
                    name="pin"
                    type={"number"}
                    colorScheme="yellow"
                    onChange={(value) => onChangeCode(value, setFieldValue)}
                    value={values["pin"]}>
                    <PinInputField required />
                    <PinInputField required />
                    <PinInputField required />
                    <PinInputField required />
                    <PinInputField required />
                    <PinInputField required />
                  </PinInput>
                </HStack>
                <ErrorMessage name="pin" component={ErrorBox} />
              </VStack>

              <PButton isDisabled={isLoading || isSubmitting || (!isValid && !dirty)} isLoading={isSubmitting} type="submit">
                Send
              </PButton>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
};
