export type SliderItemType = "video" | "image";

export type SlideSoureType = { src?: string; src_1920?: string }[];

export type HomeSliderItemType = {
  onClick?: (i: number) => void;
  soundState?: boolean;
  type: SliderItemType;
  withSound: boolean;
  lang?: string[];
  source: SlideSoureType;
};
