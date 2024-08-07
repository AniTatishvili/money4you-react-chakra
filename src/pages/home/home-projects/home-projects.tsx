// import { useGetProjectsMutation } from "app/providers/store/api";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Box, Button, Center, Flex, Skeleton, Text, useColorMode } from "@chakra-ui/react";
import { TextLogotype } from "shared/ui";
import { HomeProjectsItem } from "./home-porjects-item";

// swiper
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";

// import bg from "app/assets/images/home/diagram.jpg";
import bg from "app/assets/images/home/home-products/product_bg.jpg";

import { useChakraToast } from "shared/hooks";
import { TProject } from "shared/types";

interface ISort {
  featured: string;
  limit: string;
  offset: string;
  orderby: string;
  order: string;
}

export const HomeProjects = () => {
  const toast = useChakraToast();
  const { t } = useTranslation("home");
  const { colorMode } = useColorMode();
  // const [getProjects, { isLoading }] = useGetProjectsMutation();

  const [projects, setProjects] = useState<object>({});

  // useEffect(() => {
  //   const sort: ISort = {
  //     featured: "0",
  //     limit: "0",
  //     offset: "0",
  //     orderby: "end_date",
  //     order: "ASC",
  //   };

  //   getProjects(sort)
  //     .unwrap()
  //     .then((res) => {
  //       return setProjects(res?.data?.projects);
  //     })
  //     .catch(() => {
  //       toast("error", "Something went wrong", "Error");
  //     });
  // }, []);

  return (
    <div className="container">
      <div className="card">
        <Link to={"https://money4you.financial/projects"}>
          <Box
            h={"278px"}
            backgroundImage={bg}
            backgroundRepeat={"no-repeat"}
            backgroundPosition={"center center"}
            backgroundAttachment={"fixed"}
            backgroundSize={"cover"}
            border={"none"}
            borderRadius={"sm"}
            overflow={"hidden"}
            _after={{
              content: `""`,
              pos: "absolute",
              top: 0,
              left: 0,
              w: "100%",
              h: "100%",
              backgroundColor: "#24242460",
            }}>
            <Box
              pos={"relative"}
              w={"100%"}
              px={"4"}
              py={"3"}
              fontFamily={"RalewayVariable"}
              fontWeight={"bold"}
              fontSize={{ base: "3xl", md: "4xl" }}
              textAlign={"center"}
              bg={colorMode === "dark" ? "brand.darkA" : "brand.lightA"}
              color={colorMode === "dark" ? "brand.lightA" : "brand.darkA"}
              zIndex={"1"}>
              {t("TITLES.OUR_ACTUAL_PROJECTS")}
            </Box>
            <Box pos={"relative"} p={{ base: "4", md: "8" }} w={"100%"} maxW={"1440px"} m={"0 auto"} zIndex={"1"}>
              <Flex flexDir={"column"} mb={{ base: "20px", md: "25px" }} gap={"1"}>
                <Box pos={"relative"} left={"0"} fontFamily={"RalewayVariable"} fontSize={"2xl"} fontWeight={"bold"} color={"brand.light"}>
                  {t("PROJECTS.INFO.TITLE_PART")} <TextLogotype bg={"brand.gold"} color={"brand.dark"} />
                </Box>
                {/* <Text pos={"relative"} left={"0"} fontSize={"md"} fontWeight={"bold"} color={"brand.light"}>
                {t("PROJECTS.INFO.DESC")}
              </Text> */}
              </Flex>
              <Flex w={"100%"} h={"200px"} pos={"absolute"} top={"0"} left={"0"}>
                <h2 className="mp_heading">Go to our projects</h2>
                <i className="fas fa-arrow-right"></i>
                <p className="mp_slogan">start crowdfounding</p>
                <div className="social">
                  <i className="mp_social-slogan fab fa-github">Get involved in projects </i>
                  <i className="mp_social-slogan fab fa-instagram">with a social purpose. </i>
                  <i className="mp_social-slogan fab fa-twitter">One of our main goal is to realise projects with</i>
                  <i className="mp_social-slogan fab fa-facebook-f">a social responsibility background.</i>
                </div>
                <Center width={"100%"}>
                  <Link to={"https://money4you.financial/projects"}>
                    <Button className="mp_get_started_button">GET STARTED</Button>
                  </Link>
                </Center>
                <Link to={"https://money4you.financial/projects"}>
                  <button className="mp_yellow_button"></button>
                </Link>
              </Flex>
              {/* <Swiper
          grabCursor={false}
          effect={"creative"}
          spaceBetween={30}
          slidesPerView={3}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            835: {
              slidesPerView: 2,
            },
            1280: {
              slidesPerView: 3,
            },
          }}
          // onSlideChange={() => console.log("slide change")}
          // onSwiper={(swiper) => console.log(swiper)}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          loop={true}
          modules={[Autoplay]}>
          {projects instanceof Array &&
            projects?.map((project: TProject) => {
              return (
                <SwiperSlide key={project.id}>
                  <Skeleton isLoaded={!isLoading}>
                    <HomeProjectsItem
                      images={project.image.media}
                      name={project.title}
                      goal_amount={project.goal_amount}
                      amount_received={project.amount_received}
                      donor_count={project.donor_count}
                      risk={project.risk_per}
                      start_date={project.start_date}
                      end_date={project.end_date}
                      success_status={project.success_status}
                      max_donors={project.max_donors}
                      extra={project.extraData}
                      alias={project.alias}
                    />
                  </Skeleton>
                </SwiperSlide>
              );
            })}
        </Swiper> */}
            </Box>
          </Box>
        </Link>
      </div>
    </div>
  );
};
