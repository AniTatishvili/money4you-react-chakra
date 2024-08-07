import { motion } from "framer-motion";
import React from "react";

import { Box, Image } from "@chakra-ui/react";

import Logo from "app/assets/images/logo.png";
import s from "./logotype.module.scss";

export const Logotype = React.forwardRef((props, ref) => {
  return (
    <a href="https://money4you.financial" {...props} ref={ref}>
      <Box as={motion.div} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35 }}>
        <Image
          src={Logo}
          // maxW="240px"
          w="240px"
          h="50px"
          objectFit="contain"
          className={s.logo}
          alt="Logotype"
        />
      </Box>
    </a>
  );
});
