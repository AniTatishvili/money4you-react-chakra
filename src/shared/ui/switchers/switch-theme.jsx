import { switchAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(switchAnatomy.keys);

const boxy = definePartsStyle({
  track: {
    borderRadius: "sm",
    p: 1,
  },
});

const signupTypeSwitch = definePartsStyle({
  track: {
    bg: "#ecc94b",
    _checked: {
      bg: "#ecc94b",
    },
  },
});

const taxNumberSwitch = definePartsStyle({
  track: {
    bg: "rgb(75 75 75)",
    _checked: {
      bg: "#ecc94b",
    },
  },
});

export const switchTheme = defineMultiStyleConfig({ variants: { boxy, signupTypeSwitch, taxNumberSwitch } });
