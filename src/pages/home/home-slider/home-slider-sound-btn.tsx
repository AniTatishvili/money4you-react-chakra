import React, { ForwardedRef, forwardRef } from "react";

import { Button, useColorMode } from "@chakra-ui/react";

import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

interface HomeSliderSoundBtnProps {
  onClick: (num: number) => void;
  soundState?: boolean;
  num: number;
}

export const HomeSliderSoundBtn = forwardRef((props: HomeSliderSoundBtnProps, ref: ForwardedRef<HTMLButtonElement>) => {
  const { colorMode } = useColorMode();
  const { soundState, onClick, num } = props;

  return (
    <Button
      ref={ref}
      onClick={() => onClick(num)}
      pos={"absolute"}
      bottom={"40%"}
      left={"50%"}
      transform={"translateX(-50%)"}
      w={"90px"}
      h={"90px"}
      border={"none"}
      borderRadius={"50%"}
      // bg={"linear-gradient(to left, #FFD03F90, #D4881590)"}
      bg={colorMode === "dark" ? "#12121290" : "#FFFFFF90"}
      p={"0"}
      shadow={"1px 1px 10px #0002"}
      zIndex={"9999"}
      _hover={{
        bg: "rgba(201, 134, 0, 0.8);",
      }}>
      {soundState ? <FaVolumeMute size={20} color={colorMode === "dark" ? "#fff" : "#000"} /> : <FaVolumeUp size={30} />}
    </Button>
  );
});
