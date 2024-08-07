import React from "react";

import { Flex } from "@chakra-ui/react";
import { SocialIcon } from "shared/ui/social-icon";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";

export const SocialIconsLine = React.forwardRef((props, ref) => {
  return (
    <Flex display={{ base: "none", md: "flex" }} flexDir="row" justifyContent="space-between" w="fit-content" gap={2} {...props} ref={ref}>
      <a href="https://www.facebook.com/money4you.finance">
        <SocialIcon>
          <FaFacebook />
        </SocialIcon>
      </a>
      <a href="https://twitter.com/money4you_ag">
        <SocialIcon>
          <FaTwitter />
        </SocialIcon>
      </a>
      <a href="https://www.linkedin.com/company/money4you-financial-ag">
        <SocialIcon>
          <FaLinkedin />
        </SocialIcon>
      </a>
      <a href="https://www.instagram.com/money4you.financial/">
        <SocialIcon>
          <FaInstagram />
        </SocialIcon>
      </a>
      <a href="https://www.youtube.com/channel/UCZZcwYeRUZLr6CYA-wfiDMg">
        <SocialIcon>
          <FaYoutube />
        </SocialIcon>
      </a>
    </Flex>
  );
});
