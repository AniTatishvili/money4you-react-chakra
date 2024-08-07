import { Box, Flex, Input, InputGroup, InputLeftElement, Select } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaEnvelope, FaPaperPlane } from "react-icons/fa";
import { PButton } from "shared/ui";

import countries from "shared/data/countries.json";

import s from "../footer.module.scss";

export const FormMautic = () => {
  const { t } = useTranslation();

  const [countryName, setCountryName] = React.useState("");
  const [requstComplete, setRequestComplete] = React.useState(false);

  React.useEffect(() => {
    const detectCountry = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        if (!response.ok) {
          throw new Error("Failed to fetch country");
        }
        const data = await response.json();
        setCountryName(data.country_name);
        setRequestComplete(true);
      } catch (error) {
        console.error("Error fetching country:", error);
      }
    };
    detectCountry();
  });

  return (
    <Flex id="mauticform_wrapper_subscribeform" className="mauticform_wrapper">
      <form
        autoComplete="off"
        role="form"
        method="post"
        action="https://sales.money4you.financial/form/submit?formId=5"
        id="mauticform_subscribeform"
        data-mautic-form="subscribeform"
        encType="multipart/form-data">
        <Box className="mauticform-error" id="mauticform_subscribeform_error"></Box>
        <Box className="mauticform-message" id="mauticform_subscribeform_message"></Box>
        <Flex className="mauticform-innerform">
          <Flex className="mauticform-page-wrapper mauticform-page-1" data-mautic-form-page="1" flexDir={"column"} gap={"4px"}>
            <Flex
              id="mauticform_subscribeform_email"
              className="mauticform-row mauticform-email mauticform-field-3 mauticform-required"
              data-validate="email"
              data-validation-type="email">
              <InputGroup>
                {/* eslint-disable-next-line */}
                <InputLeftElement pointerEvents="none" children={<FaEnvelope color="#d93" fontSize="1rem" />} />
                <Input
                  className="jm-input-dark mauticform-input"
                  type="email"
                  name="mauticform[email]"
                  defaultValue=""
                  placeholder={t("forms:EMAIL")}
                  minW="224px"
                  id="mauticform_input_subscribeform_email"
                  required
                />
              </InputGroup>
            </Flex>

            <Flex
              id="mauticform_subscribeform_first_name"
              className="mauticform-row mauticform-text mauticform-field-1 mauticform-required"
              data-validate="first_name"
              data-validation-type="text">
              <Input
                type="text"
                name="mauticform[first_name]"
                defaultValue=""
                placeholder="First name"
                id="mauticform_input_subscribeform_first_name"
                className="mauticform-input jm-input-dark"
                required
              />
            </Flex>

            <Flex
              id="mauticform_subscribeform_last_name"
              className="mauticform-row mauticform-text mauticform-field-2 mauticform-required"
              data-validate="last_name"
              data-validation-type="text">
              <Input
                type="text"
                name="mauticform[last_name]"
                defaultValue=""
                placeholder="Last name"
                id="mauticform_input_subscribeform_last_name"
                className="mauticform-input jm-input-dark"
                required
              />
            </Flex>

            <Flex
              id="mauticform_subscribeform_country"
              className="mauticform-row mauticform-select mauticform-field-3 mauticform-required"
              data-validate="country"
              data-validation-type="country"
              flexDir="row"
              gap={"4px"}>
              <Flex>
                {requstComplete ? (
                  <Select
                    defaultValue={countryName ? countryName : "Select your country"}
                    name="mauticform[country]"
                    id="mauticform_input_subscribeform_country"
                    className="mauticform-selectbox jm-input-dark">
                    {countries.map((country) => {
                      return (
                        <option
                          key={country.id}
                          value={country.name}
                          // selected={country.name === countryName ? true : false}
                          style={{ background: "#fff", fontSize: "1rem" }}>
                          {country.name}
                        </option>
                      );
                    })}
                  </Select>
                ) : null}
                <Box as="span" className="mauticform-errormsg" style={{ display: "none" }}>
                  Select country
                </Box>
              </Flex>
              <Flex id="mauticform_subscribeform_submit" className="mauticform-row mauticform-button-wrapper mauticform-field-4">
                <PButton
                  className="btn btn-default mauticform-button"
                  name="mauticform[submit]"
                  value="1"
                  id="mauticform_input_subscribeform_submit"
                  bg="#1e1e1e !important"
                  color="#d93 !important"
                  type="submit">
                  <FaPaperPlane className={s.subscribe_icon} />
                </PButton>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Input type="hidden" name="mauticform[formId]" id="mauticform_subscribeform_id" value="5" />
        <Input type="hidden" name="mauticform[return]" id="mauticform_subscribeform_return" value="" />
        <Input type="hidden" name="mauticform[formName]" id="mauticform_subscribeform_name" value="subscribeform" />
      </form>
    </Flex>
  );
};
