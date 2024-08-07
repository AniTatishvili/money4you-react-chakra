import React, { createRef } from "react";
import { useTranslation } from "react-i18next";

import { useDispatch } from "react-redux";

import { Box, Flex } from "@chakra-ui/react";
import { PContentLayout, PContentSection } from "entities/layouts";
import { HomeChoose, HomeInfo, HomeProjects, HomeRole, HomeSlider } from "pages/home";

// assets
import person from "app/assets/images/home/home-bg2.jpg";
import { setTooltipData } from "app/providers/store/slices/tutorial/tutorial-slice";

import { useAppSelector } from "app/providers/store";

interface Refs {
  [name: string]: { ref: any; name: string; text: string; page: string };
}
export const Home = () => {
  const { t, i18n } = useTranslation();

  const defaultTooltipData = useAppSelector((state) => state.tooltipSlice.defaultTooltip);
  const footerTooltipData = useAppSelector((state) => state.tooltipSlice.footerTooltipcomponentsData);
  const dispatch = useDispatch();

  const refs: Refs = {};

  const setRef = (name: string, ref: any, text: string, page: string) => {
    if (!ref) return;

    refs[name] = { ref, name, text, page: "/" };
  };

  const handleResize = () => {
    const tooltipComponents = Object.keys(refs).map((componentName) => {
      const { ref, name, text, page } = refs[componentName];
      if (!ref) return null;

      return {
        ref,
        name,
        text,
        page,
      };
    });

    const tooltipComponentsData = [...defaultTooltipData, ...tooltipComponents, ...footerTooltipData];

    dispatch(setTooltipData(tooltipComponentsData));
  };

  React.useEffect(() => {
    if (defaultTooltipData) {
      handleResize();
    }
  }, [defaultTooltipData]);

  React.useEffect(() => {
    handleResize();
  }, [dispatch, i18n.language]);

  return (
    <>
      <Flex w={"100%"} pos={"relative"} ref={(ref) => setRef("mainSliderRef", ref, t("tutorial:MAIN_SLIDER"), "/")}>
        <HomeSlider />
      </Flex>

      <PContentLayout>
        <Box w={"100%"} ref={(ref) => setRef("projectsRef", ref, t("tutorial:OUR_PROJECTS"), "/")}>
          <HomeProjects />
        </Box>
      </PContentLayout>

      <PContentLayout>
        <PContentSection>
          <HomeRole />
        </PContentSection>
      </PContentLayout>

      <PContentLayout>
        <Box
          backgroundImage={person}
          backgroundAttachment={"fixed"}
          backgroundRepeat={"no-repeat"}
          backgroundPosition={"center"}
          backgroundSize={"cover"}
          backgroundColor={"brand.darkA"}
          color={"brand.light"}
          _after={{
            content: `""`,
            pos: "absolute",
            top: 0,
            left: 0,
            w: "100%",
            h: "100%",
            backgroundColor: "#24242490",
          }}>
          <PContentSection zIndex={"1"} pos={"relative"}>
            <HomeInfo />
          </PContentSection>
        </Box>
      </PContentLayout>

      <PContentLayout>
        <PContentSection>
          <HomeChoose />
        </PContentSection>
      </PContentLayout>
    </>
  );
};
