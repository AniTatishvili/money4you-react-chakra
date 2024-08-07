import { setFooterTooltip } from "app/providers/store/slices/tutorial/tutorial-slice";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { SocialIconsLine } from "entities/icon-lines";
import { PContentSection } from "entities/layouts";
import { FooterMenu } from "entities/menu";
import { PButton } from "shared/ui/buttons";
import { Logotype } from "shared/ui/logotype";
import { FormMautic } from "./form-mautic";

import Security from "app/assets/images/achievements/1.png";
import Truste from "app/assets/images/achievements/2.png";
import Ssl from "app/assets/images/achievements/3.png";
import Satisfaction from "app/assets/images/achievements/4.png";
import FooterBg from "app/assets/images/footer/footer-bg.jpg";
import Apple from "app/assets/images/logotypes/apple.png";
import Play from "app/assets/images/logotypes/play.png";

import s from "./footer.module.scss";

import { TermsAndConditions } from "./law/terms-and-conditions";

export const Footer = () => {
  const { t, i18n } = useTranslation("common");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalContent, setModalContent] = React.useState();

  const openFooterModal = (content) => {
    onOpen();
    setModalContent(content);
  };

  const year = "2024";

  const dispatch = useDispatch();

  const refs = {};

  const setRef = (name, ref, text) => {
    if (!ref) return;
    refs[name] = { ref, text, name };
  };

  const handleResize = () => {
    const tooltipComponents = Object.keys(refs).map((componentName) => {
      const { ref, text, name } = refs[componentName];
      if (!ref) return null;

      return {
        ref,
        text,
        name,
      };
    });

    const tooltipComponentsData = [...tooltipComponents];
    dispatch(setFooterTooltip(tooltipComponentsData));
  };

  React.useEffect(() => {
    handleResize();
  }, [dispatch, i18n.language]);

  return (
    <>
      <PContentSection className={s.wrapper} bg="#242424" bgImg={FooterBg} backgroundRepeat="no-repeat" backgroundSize="cover" backgroundPosition="0 0">
        <Flex flexDir="column" justifyContent="center" pos="relative">
          <Flex
            flexWrap={{ base: "wrap", xl: "nowrap" }}
            justifyContent={{ base: "flex-start", md: "space-between" }}
            gap="1.5rem"
            m="0 auto"
            w="100%"
            maxW={{ base: "840px", lg: "1200px" }}
            color="#999999"
            fontSize="15px">
            <Box w={{ base: "100%", md: "48%" }}>
              <Flex flexDir="column" maxW={{ base: "288px", sm: "100%", md: "288px" }} m="0 auto">
                <Box w="100%" mb="1rem">
                  <Logotype style={{ maxWidth: "260px" }} />
                </Box>
                <Text minW="280px" m="0" p="0" lineHeight="1.6">
                  {t("FOOTER.TEXTS.ANNOTATION")}
                </Text>
              </Flex>
            </Box>

            <Box w={{ base: "100%", sm: "48%" }}>
              <Flex flexDir="column" minW="140px" maxW="288px" m="0 auto">
                <Text mb=".5rem" fontSize="1.5rem" fontWeight="500" color="#dd9933">
                  {t("FOOTER.HEADINGS.USEFUL_LINKS")}
                </Text>
                <FooterMenu />
              </Flex>
            </Box>

            <Box w={{ base: "100%", sm: "48%" }}>
              <Flex className={s.download} flexDir="column" w="300px" m="0 auto">
                <Text mb=".5rem" fontSize="1.5rem" fontWeight="500" color="#dd9933">
                  {t("FOOTER.HEADINGS.DOWNLOAD_MONEY4YOU_APP")}
                </Text>
                <Flex gap=".5rem">
                  <a className="color-to-dd9933" href="https://itunes.apple.com/us/app/cyclos-4-mobile/id829007510?mt=8">
                    <Image src={Apple} maxW="100%" />
                  </a>
                  <a className="color-to-dd9933" href="https://play.google.com/store/apps/details?id=org.cyclos.mobile">
                    <Image src={Play} maxW="100%" />
                  </a>
                </Flex>
                <List mt="1rem" spacing={0.5}>
                  <ListItem
                    className="jm-menu-link-footer"
                    onClick={() => openFooterModal("...")}
                    ref={(ref) => setRef("dataProtectionRef", ref, t("FOOTER.LINKS.DATA_PROTECTION"))}>
                    {t("FOOTER.LINKS.DATA_PROTECTION")}
                  </ListItem>
                  <ListItem
                    className="jm-menu-link-footer"
                    onClick={() => openFooterModal("...")}
                    ref={(ref) => setRef("imprintRef", ref, t("FOOTER.LINKS.IMPRINT"))}>
                    {t("FOOTER.LINKS.IMPRINT")}
                  </ListItem>
                  <ListItem className="jm-menu-link-footer" onClick={() => openFooterModal(<TermsAndConditions />)}>
                    {t("FOOTER.LINKS.GENERAL_TERMS_AND_CONDITIONS")}
                  </ListItem>
                  <ListItem className="jm-menu-link-footer" onClick={() => openFooterModal("...")}>
                    {t("FOOTER.LINKS.RISK_AND_IMPORTANT_INFORMATION")}
                  </ListItem>
                  <ListItem className="jm-menu-link-footer" onClick={() => openFooterModal("...")}>
                    {t("FOOTER.LINKS.LIST_OF_PRICES_AND_SERVICES")}
                  </ListItem>
                </List>
              </Flex>
            </Box>

            <Box w={{ base: "100%", sm: "48%" }}>
              <Flex flexDir="column" minW="288px" maxW="288px" m="0 auto">
                <Text mb=".5rem" fontSize="1.5rem" fontWeight="500" color="#dd9933">
                  {t("FOOTER.HEADINGS.SUBSCRIBE_NEWSLETTER")}
                </Text>
                <Flex flexDir="column">
                  <FormMautic />
                </Flex>
              </Flex>
            </Box>
          </Flex>

          <Grid templateColumns={{ base: "repeat(2, 1fr)", sm: "repeat(4, 1fr)" }} gap={4} w="fit-content" m="2rem auto 0">
            <GridItem>
              <Image maxH="120px" w="auto" src={Security} />
            </GridItem>
            <GridItem>
              <Image maxH="120px" w="auto" src={Truste} />
            </GridItem>
            <GridItem>
              <Image maxH="120px" w="auto" src={Ssl} />
            </GridItem>
            <GridItem>
              <Image maxH="120px" w="auto" src={Satisfaction} />
            </GridItem>
          </Grid>
        </Flex>
      </PContentSection>
      <Flex w="100%" bg="#000000" color="#ffffff" fontSize="15px" gap={4}>
        <Flex
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent={{ base: "center", sm: "space-between" }}
          w="100%"
          maxW="1200px"
          m="0 auto"
          p="5px 1rem">
          <Text fontStyle="oblique" fontSize=".875rem">
            {t("FOOTER.COPYRIGHT", { year: year })}
          </Text>
          <SocialIconsLine />
        </Flex>
      </Flex>

      <Modal isOpen={isOpen} size={"2xl"} onClose={onClose} variant="custom_modal" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalBody p={6}>{modalContent}</ModalBody>
          <ModalFooter mb={2}>
            <PButton colorScheme="blue" m={"auto"} onClick={onClose}>
              Close
            </PButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
