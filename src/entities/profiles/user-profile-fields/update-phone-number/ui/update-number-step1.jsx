import React from "react";

import { PButton } from "shared/ui/buttons";

import { Flex, FormLabel, Box } from "@chakra-ui/react";

import { FormikControl } from "shared/formik/FormikControl";

import { useCheckMobilePhoneMutation } from "app/providers/store/api";
import { useChakraToast } from "shared/hooks";

import { useDispatch } from "react-redux";
import { userUpdatePhoneNumber } from "app/providers/store/slices/profiles/user-update-number-slice";

export const UpdateNumberStep1 = ({ isSubmitting, isValid }) => {
  const dispatch = useDispatch();
  const [checkMobilePhone] = useCheckMobilePhoneMutation();
  const toast = useChakraToast();
  const [phoneNumber, setPhoneBumber] = React.useState(null);
  const [inputValue, setInputValue] = React.useState(null);

  const inputValueData = (e) => {
    setInputValue(e.target.value);
  };

  const checkNumber = async () => {
    const phoneLastNumbersRequestData = { phone: inputValue };

    try {
      await checkMobilePhone(phoneLastNumbersRequestData).unwrap();
      dispatch(userUpdatePhoneNumber({ checkNumber: phoneLastNumbersRequestData }));
      window.localStorage.setItem("checkNumber", phoneLastNumbersRequestData);
    } catch (error) {
      console.error(error);
      toast("error", error.data.error.message[0], "Error");
    }
  };

  const fetchDataFromApi = async () => {
    try {
      const response = await fetch("https://api.devhunters.ru/api/profile", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${JSON.parse(window.localStorage.getItem("token"))}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const data = await response.json();
      setPhoneBumber(data.data.user.phone.slice(0, -4) + "****");
      // console.log(phoneNumber.replace(/\d(?=(?:\D*\d){4})/g, "*"));

      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return {};
    }
  };

  React.useEffect(() => {
    fetchDataFromApi();
  }, []);

  return (
    <Box m="0 0 25px">
      <FormLabel>{phoneNumber}</FormLabel>
      <Flex gap={5}>
        <FormikControl control="input" name="check_number" placeholder="Last 4 number" onKeyUp={inputValueData} />
        <PButton type="submit" isDisabled={isSubmitting || isValid} onClick={checkNumber}>
          Accept
        </PButton>
      </Flex>
    </Box>
  );
};
