import React, { ForwardedRef, forwardRef } from "react";

import { HomeSliderItemType } from "shared/types/homepage";
import { HomeSliderItemElement } from "./home-slider-item-element";

export const HomeSliderItem = forwardRef((props: HomeSliderItemType, ref: ForwardedRef<HTMLVideoElement>) => {
  const { type, source, withSound, lang, soundState } = props;
  return <HomeSliderItemElement type={type} source={source} withSound={withSound} lang={lang} soundState={soundState} ref={ref} />;
});
