import { useAppSelector } from "app/providers/store";
// import { useInvestorSignupMutation } from "app/providers/store/api";
import { useSignupWithKycMutation } from "app/providers/store/api/auth";
import { Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";

import { initialValues } from "shared/formik/formikValues";
import { validationSchema } from "shared/formik/yup";

import { Flex, Stack } from "@chakra-ui/react";
import { InvestorSignupFields } from "widgets/auth/signup";

import { useChakraToast, useMakeBlob } from "shared/hooks";
import { Loader } from "shared/ui/loader";

export const InvestorSignupPage = () => {
  const { data: userData } = useAppSelector((state) => state.signup);
  const { front, back, selfie } = useAppSelector((state) => state.kyc_images.datas);

  const toast = useChakraToast();

  const [investorSignup, { isLoading }] = useSignupWithKycMutation();

  const navigate = useNavigate();

  const onFormSubmit = async (values) => {
    // console.log("front", front);

    const investorSignupRequestData = {
      doc_front_image: await useMakeBlob(front),
      doc_back_image: await useMakeBlob(back),
      selfie_image: await useMakeBlob(selfie),
      role_id: 9,
      ...userData,
      ...values,
    };

    const form_data = new FormData();
    for (let k in investorSignupRequestData) {
      form_data.append(k, investorSignupRequestData[k]);
    }

    try {
      await investorSignup(form_data)
        .unwrap()
        .then(() => {
          toast("success", "We've created your account for you.", "Account created.");
          navigate("/");
        });
      // navigate("/email-verification");
    } catch (error) {
      // console.log(error);
      const errMsg = "original" in error.data.error.message ? JSON.stringify(error.data.error.message.original.error.message) : error.data.error.message;

      if (error.originalStatus === Number(500)) {
        const msg = "Please, try again. Something went wrong... 🙁";
        toast("error", msg, "Error");
      } else if (error.data.error.status === 422 && error.data.error.code === "") {
        let specificErrorMsg;

        if ("result" in error.data.error.message) {
          specificErrorMsg =
            error.data.error.message.result.face === false ? "Uploaded photos and the selfie image don't match." : "Taken photos and selfie image don't match";
        } else {
          specificErrorMsg = error.data.error.message;
        }

        toast("error", specificErrorMsg, "Error");
      } else {
        if (typeof errMsg === "string") {
          toast("error", errMsg, "Error");
        } else {
          const msg = errMsg.map((x) => x + " ");
          toast("error", msg, "Error");
        }
      }
    }
  };

  if (isLoading) return <Loader />;

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} validateOnMount onSubmit={onFormSubmit}>
      {(formik) => {
        const { isSubmitting, isValid, dirty } = formik;
        return (
          <Form style={{ width: "100%" }}>
            <Flex flexDir="column" justifyContent="center">
              <Stack m="0 auto" spacing={4}>
                <Flex justifyContent="center" wrap={{ base: "wrap" }} gap={4}>
                  <InvestorSignupFields isSubmitting={isSubmitting} isValid={isValid} dirty={dirty} name={formik.values.name} surname={formik.values.surname} />
                </Flex>
              </Stack>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
};
