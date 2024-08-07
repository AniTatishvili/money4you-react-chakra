import { Flex } from "@chakra-ui/react";
import React, { ForwardedRef, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { render } from "react-dom";
import { TooltipCloseBtn } from ".";
import { TooltipBtn } from "./ui/tooltip-btn";

export type TooltipOptions = {
  top: number;
  left: number;
  width?: string;
};

interface TooltipBodyProps {
  ref: ForwardedRef<HTMLDivElement>;
  text: string;
  currentElement: any;
  currentIndex: number;
  hasScrolled: boolean;
  onClose: () => void;
  getPreviousComponent: () => void;
  getNextComponent: () => void;
}

export const TooltipBody = React.forwardRef((props: TooltipBodyProps, ref) => {
  const { t } = useTranslation();

  const { text, currentIndex, hasScrolled, currentElement, onClose, getPreviousComponent, getNextComponent } = props;

  const tooltipRef = useRef<HTMLDivElement>(null);
  const [topPos, setTopPos] = useState<number>(0);
  const [leftPos, setLeftPos] = useState<number>(0);
  const [scrollPos, setScrollPos] = useState<number>(0);
  const [position, setPosition] = useState<boolean>(false);

  const tooltipHeight = Number(tooltipRef.current?.getBoundingClientRect().height);
  const tooltipWidth = Number(tooltipRef.current?.getBoundingClientRect().width);
  const scrollHandler = () => {
    if (currentElement.ref) {
      const { top, left, right, width, height } = currentElement.ref.getBoundingClientRect();

      let totalScrollDistance = 0;

      const refTop = top + window.scrollY;
      const refHeight = height;
      const refLeft = left;
      const refRight = window.innerWidth - right;

      const distanceToShowTooltip = refTop + refHeight;

      const additionalSpacing = 8;

      totalScrollDistance += distanceToShowTooltip + additionalSpacing;

      const isTablet = window.innerWidth < 1400;

      let tooltipLeftPos;

      if (isTablet) {
        if (refLeft > window.innerWidth / 2) {
          tooltipLeftPos = refRight;
          setPosition(true);
        } else if (refLeft === refRight) {
          tooltipLeftPos = left + (width - 260) / 2;
        } else {
          tooltipLeftPos = refLeft;
          setPosition(false);
        }
      } else {
        tooltipLeftPos = left + (width - 260) / 2;
      }

      setLeftPos(tooltipLeftPos);
      setTopPos(totalScrollDistance);

      const scrollHeight = totalScrollDistance + tooltipHeight + 20 - window.innerHeight;
      setScrollPos(scrollHeight);
    } else {
      setLeftPos(currentElement.position.left + (currentElement.size.width - 260) / 2);

      const pos = window.innerHeight - currentElement.position.bottom - tooltipHeight;

      if (currentElement.name === "liveChatGroupRef") {
        setTopPos(window.innerHeight / 2);
      }

      setTopPos(pos);
      setPosition(false);

      if (currentElement.name === "liveChatRef") {
        setScrollPos(0);
        // setPosition(true);
        // const liveChatLeftPos = document.documentElement.clientWidth - (document.documentElement.clientWidth - 92);
        const liveChatLeftPos = document.documentElement.clientWidth - 92 - 260;
        setLeftPos(liveChatLeftPos);
        // #ffb924 - 35 - 57
      }
    }
  };

  useEffect(() => {
    scrollHandler();
    window.addEventListener("scroll", scrollHandler, true);
    window.addEventListener("resize", scrollHandler, true);
    return () => {
      window.removeEventListener("scroll", scrollHandler, true);
      window.removeEventListener("resize", scrollHandler, true);
    };
  }, [currentIndex]);

  useEffect(() => {
    if (hasScrolled) {
      window.scrollTo({
        top: scrollPos,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [topPos, hasScrolled]);

  return (
    <>
      {topPos !== 0 && leftPos !== 0 && (
        <Flex
          ref={tooltipRef}
          bg={"brand.gold"}
          justifyContent={"center"}
          borderRadius={"10px"}
          p={2}
          position={"absolute"}
          zIndex={"999999999"}
          top={`${topPos}px`}
          style={position ? { right: `${leftPos}px` } : { left: `${leftPos}px` }}
          width={`${260}px`}>
          <TooltipCloseBtn onClick={onClose} />
          <Flex
            w={"calc(100% - 8px)"}
            border={1}
            borderColor={"brand.darkA"}
            borderStyle={"solid"}
            borderRadius={"10px"}
            flexDirection={"column"}
            alignItems={"center"}
            gap={4}
            p={4}>
            <Flex color={"brand.darkA"} textAlign={"center"}>
              {text}
            </Flex>

            <Flex gap={4} justifyContent={"space-between"}>
              <TooltipBtn onClick={getPreviousComponent}>{t("tutorial:BUTTONS.PREVIOUS")}</TooltipBtn>
              <TooltipBtn onClick={getNextComponent}>{t("tutorial:BUTTONS.NEXT")}</TooltipBtn>
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  );
});
