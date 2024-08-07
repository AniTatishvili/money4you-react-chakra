import React from "react";
import { useTranslation } from "react-i18next";

import { Box, Center, HStack, Text, VStack } from "@chakra-ui/react";

// icons
import shape from "app/assets/images/home/shape.svg";
import { BsFillClipboard2DataFill, BsPhoneVibrate, BsSpeedometer } from "react-icons/bs";

export const HomeChooseData = () => {
  const { t } = useTranslation("home");

  return (
    <VStack align={"flex-start"} w={"100%"} gap={"6"}>
      <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight={"bold"}>
        {t("TITLES.WHY_PEOPLE_CHOOSE_US")}
      </Text>
      <VStack align={"flex-start"} gap={{ base: "6", md: "16" }} w={"100%"}>
        <HStack align={"flex-start"} w={"100%"} gap={"6"}>
          <Box pos={"relative"} w={"100%"} maxW={"72px"} h={"78px"} backgroundImage={shape} backgroundRepeat={"no-repeat"} backgroundSize={"contain"}>
            <Center pos={"absolute"} w={"100%"} h={"100%"} fontSize={"4xl"} color={"brand.light"}>
              <BsSpeedometer />
            </Center>
          </Box>
          <VStack align={"flex-start"}>
            <Text fontSize={"xl"} fontWeight={"bold"}>
              {t("CHOOSE.LABELS.TITLES.TRACKABLE_PROJECTS")}
            </Text>
            <Text>{t("CHOOSE.LABELS.DESC.1")}</Text>
          </VStack>
        </HStack>

        <HStack align={"flex-start"} w={"100%"} gap={"6"}>
          <Box pos={"relative"} w={"100%"} maxW={"72px"} h={"78px"} backgroundImage={shape} backgroundRepeat={"no-repeat"} backgroundSize={"contain"}>
            <Center pos={"absolute"} w={"100%"} h={"100%"} fontSize={"4xl"} color={"brand.light"}>
              <BsPhoneVibrate />
            </Center>
          </Box>
          <VStack align={"flex-start"}>
            <Text fontSize={"xl"} fontWeight={"bold"}>
              {t("CHOOSE.LABELS.TITLES.CUSTOMER_FOCUSED_CALL_CENTER")}
            </Text>
            <Text>{t("CHOOSE.LABELS.DESC.2")}</Text>
          </VStack>
        </HStack>

        <HStack align={"flex-start"} w={"100%"} gap={"6"}>
          <Box pos={"relative"} w={"100%"} maxW={"72px"} h={"78px"} backgroundImage={shape} backgroundRepeat={"no-repeat"} backgroundSize={"contain"}>
            <Center pos={"absolute"} w={"100%"} h={"100%"} fontSize={"4xl"} color={"brand.light"}>
              <BsFillClipboard2DataFill />
            </Center>
          </Box>
          <VStack align={"flex-start"}>
            <Text fontSize={"xl"} fontWeight={"bold"}>
              {t("CHOOSE.LABELS.TITLES.FAST_DOCUMENTATION")}
            </Text>
            <Text>{t("CHOOSE.LABELS.DESC.3")}</Text>
          </VStack>
        </HStack>
      </VStack>
    </VStack>
  );
};
