import React from "react";

import { PButton } from "shared/ui/buttons";

import { FormLabel, Box } from "@chakra-ui/react";

import { FormikControl } from "shared/formik/FormikControl";

import { useUpdateMobilePhoneMutation } from "app/providers/store/api";
import { userUpdatePhoneNumber } from "app/providers/store/slices/profiles/user-update-number-slice";
import { useDispatch } from "react-redux";
import { useChakraToast } from "shared/hooks";

export const UpdateNumberStep2 = ({ isSubmitting, isValid }) => {
  const [updatePhoneNumber] = useUpdateMobilePhoneMutation();
  const dispatch = useDispatch();
  const toast = useChakraToast();
  const [inputValue, setInputValue] = React.useState(null);

  const inputValueData = (e) => {
    setInputValue(e.target.value);
  };

  const newPhoneNumber = async () => {
    const phoneNumberRequestData = { phone: inputValue };

    try {
      await updatePhoneNumber(phoneNumberRequestData).unwrap();
      dispatch(userUpdatePhoneNumber({ updateNumber: phoneNumberRequestData }));
      // const title = "Notification";
      // const msg = "Phone number updated.";
      // toast("success", msg, title);
    } catch (error) {
      console.error(error);
      toast("error", error.data.error.message[0], "Error");
    }
  };

  return (
    <Box>
      <FormLabel>Enter new number</FormLabel>
      <FormikControl control="phone" name="phone" placeholder="Your mobile number" onKeyUp={inputValueData} />
      <PButton w="100%" m="20px 0 0" type="submit" isDisabled={isSubmitting || isValid} isLoading={isSubmitting} onClick={newPhoneNumber}>
        Confirm New number
      </PButton>
    </Box>
  );
};
