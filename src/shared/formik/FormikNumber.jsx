import React from "react";
import { useDispatch } from "react-redux";
import { setUpdatedUserData } from "app/providers/store/slices/signup";
import NumberInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input/mobile";
import "react-phone-number-input/style.css";

import { InputGroup, Box } from "@chakra-ui/react";
import { ErrorBox } from "./ErrorBox";
import s from "./Formik.module.scss";

export const FormikNumber = (props) => {
  const [number, setNumber] = React.useState();
  const { name, type } = props;

  const dispatch = useDispatch();

  const handleChangePhoneNumber = (value) => {
    setNumber(value);
    dispatch(setUpdatedUserData({ phone: value }));
  };

  return (
    <>
      <InputGroup dir="flex" flexDir="column" gap="5px">
        <NumberInput
          className={s.number}
          name={name}
          countrySelectProps={{ unicodeFlags: true }}
          type={type}
          value={number}
          onChange={(value) => handleChangePhoneNumber(value)}
          {...props}
        />
        {number && !isValidPhoneNumber(number) ? (
          <Box>
            <ErrorBox>Incorrect mobile number format</ErrorBox>
          </Box>
        ) : null}
      </InputGroup>
    </>
  );
};
