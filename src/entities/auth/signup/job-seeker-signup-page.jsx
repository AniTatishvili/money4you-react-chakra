import React from "react";
import { useNavigate } from "react-router-dom";
import { useJobseekerSignupMutation } from "app/providers/store/api";
import { useAppSelector } from "app/providers/store";
import { Formik, Form } from "formik";
import { jobseeker_signup_formik_values } from "./lib/signup-formik-values";
import { jobseeker_signup_validation_schema } from "./lib/signup-yup";
import { useMakeBlob } from "shared/hooks";
import { useChakraToast } from "shared/hooks";

import { Flex, Stack } from "@chakra-ui/react";
import { JobseekerSignupFields } from "widgets/auth/signup/jobseeker-signup-fields";

export const JobseekerSignupPage = () => {
  const navigate = useNavigate();
  const toast = useChakraToast();
  const { data } = useAppSelector((state) => state.signup);
  const { resume_file } = useAppSelector((state) => state.jobseeker_auth_slice.resume);

  const [jobseekerSignup] = useJobseekerSignupMutation();

  const onJobseekerSignupFormSubmit = async (values) => {
    const resume = await useMakeBlob(resume_file);

    const jobseekerSignupRequestData = {
      cv: resume,
      ...data,
      ...values,
    };

    const form_data = new FormData();
    for (const k in jobseekerSignupRequestData) {
      form_data.append(k, jobseekerSignupRequestData[k]);
    }

    try {
      await jobseekerSignup(form_data).unwrap();
      // navigate("/signup/pin");
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
    <Formik initialValues={jobseeker_signup_formik_values} validationSchema={jobseeker_signup_validation_schema} onSubmit={onJobseekerSignupFormSubmit}>
      {(formik) => {
        const { isSubmitting, isValid, dirty } = formik;

        return (
          <Form style={{ width: "100%" }}>
            <Flex flexDir="column" justifyContent="center">
              <Stack m="0 auto" spacing={4}>
                <Flex justifyContent="center" wrap={{ base: "wrap" }} gap={4}>
                  <JobseekerSignupFields isSubmitting={isSubmitting} isValid={isValid} dirty={dirty} />
                </Flex>
              </Stack>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
};
