import React, { useState } from "react";

import { useAppSelector } from "app/providers/store";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { Flex } from "@chakra-ui/react";
import { setShowTooltip } from "app/providers/store/slices/tutorial/tutorial-slice";

import { TooltipBody } from ".";

import type { TooltipElementType, TooltipType } from "shared/types/tooltip-element-type";

export const TutorialTooltip = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [currentTooltipIndex, setCurrentTooltipIndex] = useState(0);

  const showTooltip = useAppSelector((state) => state.tooltipSlice.showTooltip);
  const tooltipData = useAppSelector((state) => state.tooltipSlice.tooltipComponentsData);
  const defaultTooltipData = useAppSelector((state) => state.tooltipSlice.defaultTooltip);
  const footerTooltipData = useAppSelector((state) => state.tooltipSlice.footerTooltipcomponentsData);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    setIsLoading(false);
  }, []);

  // close btn ref
  const changeStatus = () => {
    setCurrentTooltipIndex(0);
    dispatch(setShowTooltip(false));
    setHasScrolled(false);
  };

  const filteredTooltipData: TooltipType[] =
    location.pathname.includes("signup") || location.pathname === "/" ? tooltipData : [...defaultTooltipData, ...footerTooltipData];

  const tooltip: TooltipType = filteredTooltipData[currentTooltipIndex];
  if (!tooltip) return null;

  const { text }: TooltipType = tooltip;

  const getNextComponent = () => {
    if (currentTooltipIndex < filteredTooltipData.length - 1) {
      setCurrentTooltipIndex(currentTooltipIndex + 1);
      const nextTooltip: TooltipElementType = filteredTooltipData[currentTooltipIndex + 1];

      if (nextTooltip.page !== "") {
        setHasScrolled(true);
      }
    } else {
      setCurrentTooltipIndex(0);
    }
  };
  const getPreviousComponent = () => {
    if (currentTooltipIndex > 0) {
      setCurrentTooltipIndex(currentTooltipIndex - 1);
    } else {
      setCurrentTooltipIndex(filteredTooltipData.length - 1);
      setHasScrolled(true);
    }
  };

  if (!showTooltip && !isLoading) return;

  return (
    <Flex w={"100%"} h={"100%"} bg={"rgba(0,0,0,0.6)"} zIndex={"20000300"} pos={"absolute"} top={"0"} left={"0"}>
      <TooltipBody
        text={text}
        onClose={changeStatus}
        getNextComponent={getNextComponent}
        getPreviousComponent={getPreviousComponent}
        currentElement={filteredTooltipData[currentTooltipIndex]}
        currentIndex={currentTooltipIndex}
        hasScrolled={hasScrolled}
      />
    </Flex>
  );
};
