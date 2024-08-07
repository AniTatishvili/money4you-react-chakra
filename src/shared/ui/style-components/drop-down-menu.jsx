import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(menuAnatomy.keys);

const variants = {
  darkMode: {
    link: {
      color: "brand.white",
    },
    list: {
      borderRadius: "md",
      border: "none",
      bg: "brand.dark",
      color: "brand.white",
    },
    item: {
      bg: "brand.dark",
      color: "brand.white",
      _hover: {
        bg: "brand.darkC",
      },
    },
  },
  lightMode: {
    list: {
      borderRadius: "md",
      border: "none",
      bg: "brand.white",
      color: "brand.dark",
      boxShadow: "rgba(28, 32, 93, 0.24) 0px 2px 6px 0px;",
    },
    item: {
      bg: "brand.white",
      color: "brand.dark",
      _hover: {
        bg: "brand.greyA",
      },
    },
  },
};
// export the custom variants in the component theme
export const menuTheme = defineMultiStyleConfig({ variants });
