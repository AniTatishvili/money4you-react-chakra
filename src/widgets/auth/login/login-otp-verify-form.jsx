import React from "react";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

import { useUserEmailOTPVerificationMutation } from "app/providers/store/api";
import { saveUserDataInGlobalState } from "app/providers/store/slices/authSlice";

import { Form, Formik } from "formik";
import { otpValues } from "shared/formik/formikValues";
import { authorizationOtpVerifySchema } from "shared/formik/yup";

import { Flex, Stack } from "@chakra-ui/react";
import { useChakraToast } from "shared/hooks";
import { Loader } from "shared/ui/loader";
import { LoginOtpVerifyField } from "./login-otp-verify-field";

export const LoginOtpVerifyForm = () => {
  const [userEmailOTPVerification, { isLoading }] = useUserEmailOTPVerificationMutation();
  const toast = useChakraToast();
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const ref = React.useRef(null);
  const [userToken, setUserToken] = React.useState(false);
  React.useEffect(() => {
    // return token to joomla page
    userToken && ref.current.submit();
    console.log("token:", userToken);
    // userToken ? navigate("/profile") : navigate("/login");
  }, [userToken]);

  const sendOtpCode = async (values) => {
    const uid = JSON.parse(window.localStorage.getItem("UID"));

    userEmailOTPVerification({ user_id: uid, ...values })
      .unwrap()
      .then((res) => {
        toast("success", "Login success.");
        dispatch(saveUserDataInGlobalState(res));
        const { token } = res;
        window.localStorage.setItem("USER_AUTH", JSON.stringify({ token }));
        window.localStorage.setItem("LOGGED_IN", JSON.stringify(true));

        // NOTE: turn on for resend to money4you.financial
        setUserToken(token);
        // token && setUserToken(true);
      })
      .catch(() => {
        const msg = "You have entered an invalid OTP code.";
        toast("error", msg, "Error");
      });
  };

  if (isLoading) return <Loader />;

  return (
    <Flex flexDir="column">
      <Stack>
        <form ref={ref} method="POST" action="https://money4you.financial/projects" id="tokenform">
          <input type="hidden" name="token" defaultValue={userToken} />
        </form>

        <Formik initialValues={otpValues} validationSchema={authorizationOtpVerifySchema} validateOnMount onSubmit={sendOtpCode}>
          {(formik) => {
            return (
              <Form>
                <Stack spacing={4} mt={4} px={10}>
                  <LoginOtpVerifyField loading={isLoading} {...formik} />
                </Stack>
              </Form>
            );
          }}
        </Formik>
      </Stack>
    </Flex>
  );
};
