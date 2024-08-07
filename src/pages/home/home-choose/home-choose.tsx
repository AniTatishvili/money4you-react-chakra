import React from "react";
import { useTranslation } from "react-i18next";

import { Box, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { TextLogotype } from "shared/ui";
import { HomeChooseCounters } from "./home-choose-counters";
import { HomeChooseData } from "./home-choose-data";
import { HomeChooseTestimonials } from "./home-choose-testimonials";

import video from "app/assets/videos/home/m4uf_720.mp4";

export const HomeChoose = () => {
  const { t } = useTranslation("home");

  return (
    <HStack
      align={"flex-start"}
      justify={"space-between"}
      flexWrap={{ base: "wrap", lg: "nowrap" }}
      gap={{ base: "6", md: "14" }}
      w={"100%"}
      mt={{ base: "1rem", lg: "3rem" }}>
      <VStack
        pos={{ base: "static", lg: "sticky" }}
        top={"calc(50% - 260px)"}
        align={{ base: "center", lg: "flex-start" }}
        gap={{ base: "4", md: "3rem" }}
        w={{ base: "100%", lg: "45%" }}>
        <Box w={"100%"} maxW={"420px"} border={"none"} borderRadius={"12"} overflow={"hidden"} shadow={"md"}>
          <video controls autoPlay muted loop src={video}></video>
        </Box>

        <Box w={"100%"} maxW={{ base: "100%", lg: "420px" }} fontWeight={"medium"}>
          <TextLogotype display={"flex"} />
          {t("CHOOSE.DESC_TITLE")}
          <Text>{t("CHOOSE.DESC")}</Text>
        </Box>
      </VStack>

      <VStack w={{ base: "100%", lg: "45%" }} gap={{ base: "6", md: "12" }}>
        <HomeChooseTestimonials />
        <Divider />
        <HomeChooseData />
        <Divider />
        <HomeChooseCounters />
      </VStack>
    </HStack>
  );
};
