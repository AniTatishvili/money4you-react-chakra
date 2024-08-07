import React, { ForwardedRef, forwardRef } from "react";

import { Box } from "@chakra-ui/react";
import { HomeSliderItemType } from "shared/types/homepage";

export const HomeSliderItemElement = forwardRef((props: HomeSliderItemType, ref: ForwardedRef<HTMLVideoElement>) => {
  const { type, source, soundState } = props;

  return (
    <Box>
      {type === "image" && source ? (
        <picture>
          {source?.map((object) => (
            <React.Fragment key={object.src}>
              <source media="(max-width:1920px)" srcSet={object.src_1920} />
              <img src={object.src} alt="Slider image" />
            </React.Fragment>
          ))}
        </picture>
      ) : (
        <video autoPlay loop muted={soundState} style={{ width: "100%" }} ref={ref}>
          {source?.map((object) => (
            <source key={object.src} style={{ display: "block", width: "100%" }} src={object.src} />
          ))}
        </video>
      )}
    </Box>
  );
});
