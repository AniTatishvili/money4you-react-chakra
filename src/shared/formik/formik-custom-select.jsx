import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { setUpdatedUserData } from "app/providers/store/slices/signup";

import { Box, InputGroup, Select } from "@chakra-ui/react";
import { Field } from "formik";

import { useGetLaravelUserDataMutation } from "app/providers/store/api/profile";
import genders from "shared/data/genders.json";
import prefixes from "shared/data/prefixes.json";

export const FormikCustomSelect = (props) => {
  const { t } = useTranslation("forms");
  const { name } = props;
  const dispatch = useDispatch();
  const { data, isSuccess } = useGetLaravelUserDataMutation();

  const setHandlerSelectTitle = (e) => {
    dispatch(setUpdatedUserData({ social_title: e.target.value }));
  };

  const setHandlerSelectGender = (e) => {
    dispatch(setUpdatedUserData({ gender: e.target.value }));
  };

  React.useEffect(() => {
    if (isSuccess) {
      dispatch(setUpdatedUserData({ gender: data.data.user.gender, social_title: data.data.user.social_title }));
    }
  }, [data]);

  if (name === "gender") {
    return (
      <Box>
        <InputGroup>
          <Select component="select" id="gender" name="gender" as={Field} onChange={setHandlerSelectGender}>
            <option hidden>{isSuccess ? genders.filter((gender) => gender.value === data.data.user.gender)[0].name : t("SELECT_YOUR_GENDER")}</option>
            {genders.map((gender) => (
              <option key={gender.id} value={gender.value}>
                {gender.name}
              </option>
            ))}
          </Select>
        </InputGroup>
      </Box>
    );
  } else if (name === "prefix") {
    return (
      <Box>
        <InputGroup>
          <Select component="select" id="prefix" name="prefix" as={Field} onChange={setHandlerSelectTitle}>
            <option hidden>{isSuccess ? prefixes.filter((prefix) => prefix.value === data.data.user.social_title)[0].name : t("SOCIAL_TITLE")}</option>
            {prefixes.map((prefix) => (
              <option key={prefix.id} value={prefix.value}>
                {prefix.name}
              </option>
            ))}
          </Select>
        </InputGroup>
      </Box>
    );
  }
};
