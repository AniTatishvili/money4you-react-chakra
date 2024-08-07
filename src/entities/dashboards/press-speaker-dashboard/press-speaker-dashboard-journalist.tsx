import { useActivateJournalistMutation } from "app/providers/store/api/dashboard";
import React from "react";
import { useTranslation } from "react-i18next";

import { Avatar, Box, Flex } from "@chakra-ui/react";
import { PSpinner, PText } from "shared/ui";
import { PressSpeakerDashboardAcceptBtn, PressSpeakerDashboardDeclineBtn, SellerDashboardDetailsBtn } from "../ui";
import { PressSpeakerDashboardJournalistDetails } from "./press-speaker-dashboard-journalist-details";

import { TJournalist } from "shared/types";

export type TJournalistProps<T> = {
  jdata: T;
};

export const PressSpeakerDashboardJournalist = ({ jdata }: TJournalistProps<TJournalist>) => {
  const { t } = useTranslation("psd");
  const [changeJournalistActivatedStatus, { isLoading }] = useActivateJournalistMutation();

  const { id, name, surname, profile_image, confirm } = jdata;
  const img = `https://api.devhunters.ru/storage/users/${id}/${profile_image}`;

  const [state, setState] = React.useState<boolean>(false);

  const openDetails: () => void = () => {
    setState((state) => !state);
  };

  const [decline, setDecline] = React.useState<boolean>(Boolean(confirm));
  const handleClickChangeJournalistActivatedStatus = (status: number) => {
    const fd = new FormData();
    fd.append("id", String(id));
    fd.append("confirm", String(status));

    changeJournalistActivatedStatus(fd).then((res: any) => {
      const msg = res.data.data.message;
      if (msg === "user::messages.user.declined") {
        setDecline(false);
      } else {
        setDecline(true);
      }
    });
  };

  return (
    <Box w={"100%"}>
      <Flex
        align={{ base: "flex-start", xl: "center" }}
        justify={"space-between"}
        flexWrap={"wrap"}
        py={"20px"}
        p={{ base: "10px", md: "20px 0" }}
        mt={{ base: "15px", md: "0" }}
        borderRadius={state ? { base: "4px 4px 0 0", md: "0" } : { base: "4px", md: "0" }}
        gap={4}>
        <Flex align={"center"} gap={"15px"}>
          <Avatar src={img} size={"md"} bg={"brand.gold"} />
          <PText fontSize={"16px"} fontWeight={"bold"}>
            {name} {surname}
          </PText>
        </Flex>
        <Flex
          width={{ base: "100%", lg: "fit-content" }}
          justifyContent={"space-between"}
          flexDir={{ base: "column", md: "row" }}
          align={{ base: "flex-start", md: "center" }}
          gap={{ base: "16px", lg: "35px" }}>
          <PressSpeakerDashboardAcceptBtn className="jm-button-green" onClick={() => handleClickChangeJournalistActivatedStatus(1)} confirm={decline}>
            {isLoading ? <PSpinner /> : t("ACCEPT")}
          </PressSpeakerDashboardAcceptBtn>
          <PressSpeakerDashboardDeclineBtn className="jm-button-red" onClick={() => handleClickChangeJournalistActivatedStatus(0)} confirm={decline}>
            {t("DECLINE")}
          </PressSpeakerDashboardDeclineBtn>
          <Box width={{ base: "100%", lg: "auto" }} onClick={openDetails}>
            <SellerDashboardDetailsBtn onClick={openDetails} />
          </Box>
        </Flex>
      </Flex>
      {state ? <PressSpeakerDashboardJournalistDetails jdata={jdata} /> : null}
    </Box>
  );
};
