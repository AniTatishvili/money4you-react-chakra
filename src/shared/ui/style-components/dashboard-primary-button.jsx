import { defineStyleConfig } from "@chakra-ui/react";

export const DashboardPrimaryButton = defineStyleConfig({
  // The styles all button have in common
  baseStyle: {},
  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: "sm",
      px: 4, // <-- px is short for paddingLeft and paddingRight
      py: 3, // <-- py is short for paddingTop and paddingBottom
    },
    md: {
      fontSize: "md",
      px: 6, // <-- these values are tokens from the design system
      py: 4, // <-- these values are tokens from the design system
    },
  },
  variants: {
    ani: () => ({
      bg: "brand.dark",
      color: "brand.light",
      _hover: {
        bg: "brand.light",
        color: "brand.dark",
      },
      "& svg": {
        color: "brand.light",
      },
    }),
  },
  // The default size and variant values
  defaultProps: {
    size: "md",
    variant: "ani",
  },
});
