import React from "react";
import { useTranslation } from "react-i18next";

import { Box, HStack, Image, Text, VStack, useColorMode } from "@chakra-ui/react";

// swiper
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";

// datas
import testmonials from "shared/data/testimonials.json";

export const HomeChooseTestimonials = () => {
  const { t } = useTranslation("home");
  const { colorMode } = useColorMode();

  return (
    <VStack align={"flex-start"} w={"100%"} gap={{ base: "4", md: "6" }}>
      <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight={"bold"} px={"10px"}>
        {t("TITLES.CUSTOMER_TESTIMONIALS")}
      </Text>
      <Box w={"100%"}>
        <Swiper
          grabCursor={false}
          effect={"creative"}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
          modules={[Autoplay]}
          // onSlideChange={() => console.log("slide change")}
          // onSwiper={(swiper) => console.log(swiper)}
        >
          {testmonials.map((el) => (
            <SwiperSlide key={el.id} style={{ height: "100%", padding: "10px" }}>
              <VStack
                align={"flex-start"}
                justify={"space-between"}
                gap={"6"}
                bg={colorMode === "dark" ? "brand.dark" : "brand.light"}
                p={"8"}
                border={"none"}
                borderRadius={"md"}
                shadow={"md"}
                cursor={"grab"}
                h={"100%"}
                minH={"340px"}>
                <Text>{el.desc}</Text>
                <HStack gap={"5"}>
                  <Image w={"90px"} h={"90px"} border={"none"} borderRadius={"full"} src={require(`/src/app/assets/images/home/avatars/${el.avatar}`)} />
                  <VStack gap={"4"} align={"flex-start"}>
                    <Image w={"140px"} h={"auto"} src={require(`/src/app/assets/images/home/signatures/${el.signature}`)} />
                    <Text>{el.name}</Text>
                  </VStack>
                </HStack>
              </VStack>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </VStack>
  );
};
