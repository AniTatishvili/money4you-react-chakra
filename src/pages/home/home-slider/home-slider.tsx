import React, { RefObject, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Box, Button, Flex } from "@chakra-ui/react";
import { PButton } from "shared/ui";
import { HomeSliderItem } from "./home-slider-item";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

// swiper
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";

// assets
import bellaitalia_1920 from "app/assets/images/home-slider/bellaitalia-hd-1920.jpg";
import bellaitalia from "app/assets/images/home-slider/bellaitalia-hd.jpg";

import home_slider_video from "app/assets/videos/home-slider/home-slider-video.mp4";

import tv_intro from "app/assets/videos/home-slider/tv_intro.mp4";
import tv_intro_webm from "app/assets/videos/home-slider/tv_intro.webm";

import hello_az_en from "app/assets/videos/home-slider/home-slider-video-hello-az-en.webm";
import hello_az_az from "app/assets/videos/home-slider/home-slider-video-hello-az.webm";
import hello_ge_en from "app/assets/videos/home-slider/home-slider-video-hello-ge-en.webm";
import hello_ge_ge from "app/assets/videos/home-slider/home-slider-video-hello-ge.webm";

import { SlideSoureType, SliderItemType } from "shared/types/homepage";
import { HomeSliderButton } from "./home-slider-button";
import { HomeSliderSoundBtn } from "./home-slider-sound-btn";

const itemsArr: { type: SliderItemType; source: SlideSoureType; withSound: boolean; lang?: string[] }[] = [
  {
    type: "video",
    source: [{ src: hello_az_az }],
    withSound: true,
    lang: ["az"],
  },
  {
    type: "video",
    source: [{ src: hello_az_en }],
    withSound: true,
    lang: ["ru", "en", "ge", "ar"],
  },
  {
    type: "video",
    source: [{ src: tv_intro_webm }],
    withSound: true,
    lang: ["ru", "en", "ge", "az", "ar"],
  },
  {
    type: "video",
    source: [{ src: hello_ge_en }],
    withSound: true,
    lang: ["en", "ru", "ar"],
  },
  {
    type: "video",
    source: [{ src: hello_ge_ge }],
    withSound: true,
    lang: ["ge"],
  },
  {
    type: "video",
    source: [{ src: home_slider_video }],
    withSound: false,
    lang: ["ru", "en", "ge", "az", "ar"],
  },
  {
    type: "image",
    source: [{ src: bellaitalia, src_1920: bellaitalia_1920 }],
    withSound: false,
    lang: ["ru", "en", "ge", "az", "ar"],
  },
];
export const HomeSlider = () => {
  const { t, i18n } = useTranslation("home");

  const [videoSoundState, setVideoSoundState] = useState<boolean>(true);

  const [swiperKey, setSwiperKey] = useState(0);

  const createSwiperInstance = () => {
    setSwiperKey((prevKey) => prevKey + 1);
  };

  React.useEffect(() => {
    createSwiperInstance();
  }, [i18n.language]);

  const videoItemsArr = itemsArr.filter((langs) => langs.lang?.includes(i18n.language));

  const refVideos = useRef<RefObject<HTMLVideoElement>[]>(videoItemsArr.map(() => React.createRef()));

  const refSlide = useRef<SwiperRef>(null);
  const refBtn = useRef<HTMLButtonElement>(null);

  const handleClickTurnOnVideoSound = (i: number, isButtonClick?: boolean) => {
    if (refBtn.current) {
      // setVideoSoundState((prev) => !prev);
      setVideoSoundState((prev) => {
        return isButtonClick ? !prev : prev;
      });

      const n = refVideos.current.filter((e, index) => index !== i);
      n.map((i) => {
        const v = i.current;
        v ? (v.volume = 0) : null;
      });
    }
    const v = refVideos.current[i].current;
    v ? (v.volume = 1) : null;
    refVideos.current[i].current?.play();
  };

  const handleSwiperTurnOffSlide = React.useCallback(
    async (swiper: any) => {
      // setVideoSoundState(true);
      if (refSlide.current) {
        // const n: number = refSlide?.current?.swiper?.activeIndex;

        handleClickTurnOnVideoSound(swiper.realIndex);
        // refVideos.current[swiper.realIndex].current?.play();
        // const v = refVideos.current[swiper.realIndex].current;
        // v ? (v.volume = 1) : null;
      } else return;
    },
    [refSlide?.current?.swiper?.activeIndex]
  );

  const handleClickChangeSlide = (pos: string) => {
    pos === "left" ? refSlide.current?.swiper.slidePrev() : refSlide.current?.swiper.slideNext();
  };

  return (
    <Flex w={"100%"} pos={"relative"}>
      <Flex
        pos={"absolute"}
        top={{ base: "30%", md: "25%" }}
        left={"50%"}
        transform={"translate(-50%, -50%)"}
        flexDir={"column"}
        gap={{ base: "2", md: "5" }}
        letterSpacing={"2px"}
        fontFamily={"RalewayVariable"}
        fontSize={"3xl"}
        fontWeight={"extrabold"}
        textAlign={"center"}
        color={"brand.light"}
        zIndex={"2"}>
        <Box as="span" fontSize={{ base: "xl", md: "4xl", lg: "6xl" }} textShadow={"md"}>
          {t("HOME_SLIDER.GREETINGS.TITLE")} money
          <Box as="span" color={"brand.red"}>
            4
          </Box>
          you.financial
        </Box>
        <Box fontSize={{ base: "xs", md: "lg", lg: "2xl" }} fontWeight={"black"} textTransform={"uppercase"}>
          {t("HOME_SLIDER.GREETINGS.DESC")}
        </Box>
      </Flex>
      <Swiper
        key={swiperKey}
        ref={refSlide}
        style={{
          height: "auto",
          maxHeight: "calc(100vh - 100px)",
          overflow: "hidden",
        }}
        onSlideChange={(swiper) => handleSwiperTurnOffSlide(swiper)}
        autoplay={{ delay: 42000, disableOnInteraction: false }}
        effect={"creative"}
        grabCursor={false}
        loop={true}
        modules={[Autoplay, Navigation]}
        navigation={false}
        // onSwiper={() => setVideoSoundState(true)}
        slidesPerView={1}
        spaceBetween={0}>
        {videoItemsArr.map((item, i) => (
          <SwiperSlide key={i}>
            <Box>
              <HomeSliderItem
                type={item.type}
                source={item.source}
                withSound={item.withSound}
                lang={item.lang}
                soundState={videoSoundState}
                ref={refVideos.current[i]}
              />
            </Box>
            {item.withSound ? (
              <HomeSliderSoundBtn ref={refBtn} onClick={() => handleClickTurnOnVideoSound(i, true)} soundState={videoSoundState} num={i} />
            ) : null}
          </SwiperSlide>
        ))}
      </Swiper>

      <Button
        onClick={() => handleClickChangeSlide("left")}
        pos={"absolute"}
        top={"50%"}
        left={"0"}
        w={"60px"}
        // height={"100%"}
        // px={"5px"}
        zIndex={"99"}
        bg={"transparent"}
        _hover={{
          background: "transparent",
        }}
        // bg={"#ffffff60"}
        // borderRadius={"0px"}
      >
        <HomeSliderButton icon={MdOutlineKeyboardDoubleArrowLeft} direct={"left"} size={9} />
      </Button>
      <Button
        onClick={() => handleClickChangeSlide("right")}
        pos={"absolute"}
        top={"50%"}
        right={"0"}
        w={"60px"}
        // height={"100%"}
        // px={"5px"}
        zIndex={"99"}
        bg={"transparent"}
        _hover={{
          background: "transparent",
        }}
        // bg={"#ffffff60"}
        // borderRadius={"0px"}
      >
        <HomeSliderButton icon={MdOutlineKeyboardDoubleArrowRight} direct={"right"} size={9} />
      </Button>

      <Link to="https://money4you.financial/projects">
        <PButton
          pos={"absolute"}
          bottom={"5%"}
          left={"50%"}
          transform={"translate(-50%, -50%)"}
          overflow={"hidden"}
          fontSize={"sm"}
          fontWeight={"black"}
          textDecoration={"none"}
          cursor={"pointer"}
          userSelect={"none"}
          zIndex={"2"}
          textTransform={"uppercase"}>
          {t("HOME_SLIDER.BUTTONS.GET_STARTED")}
        </PButton>
      </Link>
    </Flex>
  );
};
