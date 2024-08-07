import { useAppDispatch, useAppSelector } from "app/providers/store";
import { setUpdatedUserData } from "app/providers/store/slices/signup";
import React from "react";
import { useTranslation } from "react-i18next";

import { Flex, Box, FormControl, FormLabel, Tooltip, Input, Select, Switch, Text } from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";
import countries from "shared/data/countries.json";

export const CountrySelect = () => {
  const { t } = useTranslation("forms");
  const dispatch = useAppDispatch();
  const { user_data } = useAppSelector((state) => state.auth);
  const { country, investor_signup_type } = useAppSelector((state) => state.signup.data);

  const [taxStatus, setTaxStatus] = React.useState("0");
  const [taxNumber, setTaxNumber] = React.useState("");

  React.useEffect(() => {
    const user_selects_datas = {
      country: user_data?.country,
      tax_status: user_data?.tax_status,
      tax_number: user_data?.tax_number,
    };
    dispatch(setUpdatedUserData({ ...user_selects_datas }));
    user_data?.tax_status ? setTaxStatus(user_data.tax_status) : setTaxStatus("0");
    user_data?.tax_number ? setTaxNumber(user_data.tax_number) : setTaxNumber("");
  }, [user_data]);

  React.useEffect(() => {
    dispatch(setUpdatedUserData({ tax_status: taxStatus }));
    if (taxStatus === "1") {
      dispatch(setUpdatedUserData({ tax_number: taxNumber }));
    } else {
      dispatch(setUpdatedUserData({ tax_number: "" }));
    }
  }, [taxStatus, taxNumber]);

  React.useEffect(() => {
    if (investor_signup_type === 0) {
      setTaxStatus("1");
      dispatch(setUpdatedUserData({ tax_status: "1" }));
    } else {
      setTaxStatus("0");
      dispatch(setUpdatedUserData({ tax_status: "0" }));
    }
  }, [investor_signup_type]);

  const changeCountry = (e) => {
    dispatch(setUpdatedUserData({ country: e.target.value }));
    const arr = ["Azerbaijan", "Georgia"];
    console.log(arr.includes(e.target.value));
    console.log(e.target.value);
    if (arr.includes(e.target.value) && investor_signup_type === 0) {
      setTaxStatus("1");
      dispatch(setUpdatedUserData({ tax_status: "1" }));
    } else null;
  };

  const changeTaxStatus = (e) => {
    if (e.target.checked) {
      setTaxStatus("1");
    } else {
      setTaxStatus("0");
    }
  };

  const changeTaxNumber = (e) => {
    setTaxNumber(e.target.value);
  };

  return (
    <>
      <Select placeholder={country ? country : t("SELECT_YOUR_COUNTRY")} onChange={changeCountry}>
        {countries.map((country) => {
          return (
            <option key={country.id} value={country.name}>
              {country.name}
            </option>
          );
        })}
      </Select>

      {country === "Azerbaijan" || country === "Georgia" ? (
        <div role="group" aria-labelledby="my-radio-group">
          <FormControl display="flex" alignItems="center">
            <FormLabel fontSize={"14"} htmlFor="tax-status" mb="0">
              <Text>{t("forms:DO_YOU_HAVE_TAX_NUMBER")}</Text>
            </FormLabel>
            <Switch
              id="tax-status"
              variant={"taxNumberSwitch"}
              onChange={changeTaxStatus}
              value={taxStatus}
              isChecked={Number(taxStatus) === 1 ? true : false}
              isDisabled={investor_signup_type === 0}
            />
          </FormControl>
          {/* taxStatus ||  */}
          <Box>
            {Number(taxStatus) ? (
              <Box mt={2}>
                <Box pos={"relative"}>
                  <Input
                    type="text"
                    name="tax_number"
                    placeholder="TAX Number"
                    value={taxNumber ? taxNumber : ""}
                    onChange={changeTaxNumber}
                    minLength={5}
                    maxLength={10}
                  />
                  <Box pos={"absolute"} top={"6px"} right={"16px"}>
                    <Tooltip label={t("forms:TAX_NUMBER_DESC")} fontSize="md">
                      <QuestionIcon />
                    </Tooltip>
                  </Box>
                </Box>
              </Box>
            ) : null}
          </Box>
        </div>
      ) : null}
    </>
  );
};
