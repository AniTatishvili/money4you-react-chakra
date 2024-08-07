import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const custom_modal = definePartsStyle({
  dialog: {
    bg: "brand.white",
    color: "brand.dark",
    _dark: {
      bg: "brand.darkA",
      color: "brand.white",
    },
  },
});

export const modalTheme = defineMultiStyleConfig({
  variants: { custom_modal },
});
