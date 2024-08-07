import React from "react";
import { useTranslation } from "react-i18next";

import { Flex, VStack } from "@chakra-ui/react";
import { PText } from "shared/ui";
import { PressSpeakerDashboardPressCardModal } from "../ui";

import { TJournalist } from "shared/types";
import { TJournalistProps } from "./press-speaker-dashboard-journalist";

export const PressSpeakerDashboardJournalistDetails = ({ jdata }: TJournalistProps<TJournalist>) => {
  const { t } = useTranslation("psd");

  const { id, name, surname, phone, email, country, state, press_card } = jdata;

  return (
    <Flex justify={"space-between"} flexWrap={"wrap"} pl={"5%"} gap={"6"}>
      <Flex gap={"6"}>
        <VStack align={"start"}>
          <Flex gap={"2"} flexWrap={"wrap"}>
            <PText>{t("NAME")}:</PText>
            <PText fontWeight={"bold"}>
              {name} {surname}
            </PText>
          </Flex>
          <Flex gap={"2"} flexWrap={"wrap"}>
            <PText>{t("PHONE")}:</PText>
            <PText fontWeight={"bold"}>{phone}</PText>
          </Flex>
          <Flex gap={"2"} flexWrap={"wrap"}>
            <PText>{t("EMAIL")}:</PText>
            <PText fontWeight={"bold"}>{email}</PText>
          </Flex>
          <Flex gap={"2"} flexWrap={"wrap"}>
            <PText>{t("LOCATION")}:</PText>
            <PText fontWeight={"bold"}>
              {country}, {state}
            </PText>
          </Flex>
        </VStack>
      </Flex>
      <PressSpeakerDashboardPressCardModal press_card={press_card} id={id} />
    </Flex>
  );
};
