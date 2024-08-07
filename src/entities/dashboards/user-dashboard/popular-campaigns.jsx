import React from "react";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { Autoplay, Navigation, Pagination, Scrollbar, A11y, Virtual } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { Box, Flex, VStack, useColorMode } from "@chakra-ui/react";
import { PSpinner, PText, PButton } from "shared/ui";

import { useGetProjectsMutation } from "app/providers/store/api";

import { ReactComponent as UserGraphic } from "app/assets/images/user-graphic.svg";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

// import s from "./user-dashboard.module.scss";

export const PopularCampaigns = () => {
  const { t } = useTranslation("dashboard");
  const { colorMode } = useColorMode();

  const [getProjects, { isLoading }] = useGetProjectsMutation();
  const [projects, setProjects] = React.useState({});

  React.useEffect(() => {
    const sort = {
      featured: "0",
      limit: "0",
      offset: "0",
      // orderby: "amount_received",
      // order: "DESC",
    };

    getProjects(sort)
      .unwrap()
      .then((res) => {
        const projects = res?.data?.projects;
        if (projects instanceof Array) {
          const sortedProjects = projects
            .filter((project) => project.amount_received > 0)
            .sort((a, b) => (b.amount_received / b.goal_amount) * 100 - (a.amount_received / a.goal_amount) * 100)
            .slice(0, 6);

          setProjects(sortedProjects);
        }
      });
  }, []);

  return (
    <Flex
      justify={"center"}
      h={"400px"}
      w={"100%"}
      maxW={{ base: "100%", xl: "460px" }}
      py={"4"}
      px={"6"}
      border={"none"}
      borderRadius={"4"}
      bg={colorMode === "dark" ? "brand.darkC" : "brand.lightC"}>
      {isLoading ? (
        <Flex justify={"center"} align={"center"} w={"100%"} h={"100%"}>
          <PSpinner />
        </Flex>
      ) : (
        <Flex flexDir={"column"} gap={"4"} w={"100%"}>
          <PText
            as="h2"
            fontSize={"16px"}
            mb={"4"}
            pos={"sticky"}
            top={"0"}
            textTransform={"uppercase"}
            bg={colorMode === "dark" ? "brand.darkC" : "brand.lightC"}>
            {t("TITLES.POPULAR_CAMPAIGNS")}
          </PText>
          {projects.length !== 0 ? (
            <Flex cursor={"grab"}>
              <Swiper
                style={{ width: "100%" }}
                modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y, Virtual]}
                spaceBetween={16}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                virtual
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },
                  468: {
                    slidesPerView: 2,
                  },
                  684: {
                    slidesPerView: projects.length > 2 ? 3 : 2,
                  },
                  820: {
                    slidesPerView: projects.length > 2 ? 3 : 2,
                  },
                  1280: {
                    slidesPerView: 2,
                  },
                }}>
                {projects instanceof Array &&
                  projects?.map((i) => (
                    <SwiperSlide
                      key={i}
                      virtualIndex={i}
                      style={{
                        display: "flex",
                        "justify-content": "center",
                        "align-items": "center",
                        margin: "0 auto",
                      }}>
                      <VStack
                        align={"center"}
                        justify={"center"}
                        gap={"5"}
                        maxW={"200px"}
                        m={"0 auto"}
                        py={"5"}
                        px={"10"}
                        border={"none"}
                        borderRadius={"4"}
                        bg={colorMode === "dark" ? "brand.darkB" : "brand.lightB"}>
                        <Box position={"relative"}>
                          <UserGraphic />
                          <Box color={"#0EAEA5"} position={"absolute"} top={"50%"} left={"50%"} transform={"translate(-50%,-50%)"} fontSize={14}>
                            {((i.amount_received / i.goal_amount) * 100).toFixed(1)}%
                          </Box>
                        </Box>
                        <PText textAlign={"center"} w={"160px"} overflow={"hidden"} whiteSpace={"nowrap"} textOverflow={"ellipsis"}>
                          {i.title}
                        </PText>
                        <Link to={`${i.link}`}>
                          <PButton>{t("BUTTONS.SEE_MORE")}</PButton>
                        </Link>
                      </VStack>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </Flex>
          ) : (
            <PText>{`Sorry, we don't have any popular project 😒`}</PText>
          )}
        </Flex>
      )}
    </Flex>
  );
};
