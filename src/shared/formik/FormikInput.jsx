import React from "react";
import { Field, ErrorMessage } from "formik";

import { Stack, InputGroup, InputLeftElement, InputRightElement, Input, Button } from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ErrorBox } from "./ErrorBox";
import { FormikIcon } from "./FormikIcon";

export const FormikInput = (props, { ...rest }) => {
  const { type, placeholder, name, icon } = props;
  const [show, setShow] = React.useState(false);

  return (
    <Stack spacing={1}>
      {type !== ("password" || "new_password") ? (
        <>
          {icon ? (
            <InputGroup>
              {/* eslint-disable-next-line */}
              <InputLeftElement pointerEvents="none" children={<FormikIcon icon={icon} />} />
              <Field type={type} name={name} placeholder={placeholder} {...rest} pl="2rem" as={Input} />
            </InputGroup>
          ) : (
            <InputGroup>
              <Field type={type} name={name} placeholder={placeholder} {...rest} {...props} as={Input} />
            </InputGroup>
          )}
          <ErrorMessage name={name} component={ErrorBox} />
        </>
      ) : (
        <>
          <InputGroup size="md">
            {/* eslint-disable-next-line */}
            <InputLeftElement pointerEvents="none" children={<FormikIcon icon={icon} />} />
            <Field as={Input} name={name} pr="4.5rem" type={show ? "text" : "password"} placeholder={placeholder} pl="2rem" />
            <InputRightElement width="4.5rem">
              <Button variant={"ghost"} h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                {show ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <ErrorMessage name={name} component={ErrorBox} />
        </>
      )}
    </Stack>
  );
};
