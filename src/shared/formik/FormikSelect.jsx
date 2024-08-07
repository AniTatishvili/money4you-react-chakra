import React from "react";
import { useDispatch } from "react-redux";
import { setUpdatedUserData } from "app/providers/store/slices/signup";
import { useGetPublicRolesQuery } from "app/providers/store/api";

import { Box, InputGroup, Select } from "@chakra-ui/react";
import { Field } from "formik";

export const FormikSelect = () => {
  const { data, isLoading, isError } = useGetPublicRolesQuery();
  const dispatch = useDispatch();

  const setHandlerSelectRole = (e) => {
    dispatch(setUpdatedUserData({ role_id: e.target.value }));
  };

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box>
      <InputGroup>
        {!isError ? (
          <Select component="select" id="role" name="role" as={Field} onChange={setHandlerSelectRole}>
            <option hidden>Select your role</option>
            {data.data.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </Select>
        ) : (
          <div>Try connect to server...</div>
        )}
      </InputGroup>
    </Box>
  );
};
