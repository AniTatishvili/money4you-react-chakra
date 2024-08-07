import React, { createRef } from "react";
import { useTranslation } from "react-i18next";

import { Avatar, Box, Divider, Flex, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Text, useColorMode } from "@chakra-ui/react";
import { useAppSelector } from "app/providers/store";
import { setShowTooltip } from "app/providers/store/slices/tutorial/tutorial-slice";
import { MdDarkMode, MdLightMode, MdTranslate } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { SocialIconsLine } from "entities/icon-lines";
import { HeaderMenu } from "entities/menu/header-menu";
import { SideMenu } from "entities/menu/side-menu";
import { PButton, SText } from "shared/ui";
import { Logotype } from "shared/ui/logotype";

import { TutoriaTooltipInfo } from "entities/tutorial-tooltip";

import { SHeaderTooltip } from "./s-header-tooltip";
import s from "./SHeader.module.scss";

//translate
const LNGS = {
  ar: { nativeName: "عربي" },
  az: { nativeName: "Azərbaycan dili" },
  en: { nativeName: "English" },
  ge: { nativeName: "ქართული" },
  ru: { nativeName: "Русский" },
};

export const SHeader = () => {
  const { t, i18n } = useTranslation();

  const handleOption = (lng) => {
    i18n.changeLanguage(lng);
  };

  // color scheme toggler
  let scheme = window.localStorage.getItem("chakra-ui-color-mode") || "light";
  const { toggleColorMode, colorMode } = useColorMode();

  const { user_data } = useAppSelector((state) => state.auth);
  const { token } = JSON.parse(window.localStorage.getItem("USER_AUTH")) || {};
  const uid = JSON.parse(window.localStorage.getItem("UID")) || "";
  const logged_in = JSON.parse(window.localStorage.getItem("LOGGED_IN"));

  const signout = () => {
    window.localStorage.removeItem("USER_AUTH");
    window.localStorage.removeItem("UID");
    window.localStorage.setItem("LOGGED_IN", JSON.stringify(false));
    window.location.reload();
  };

  const [userAvatar, setUserAvatar] = React.useState("");
  const [showTutorialTooltip, setShowTutorialTooltip] = React.useState(false);

  // tooltip start
  const dispatch = useDispatch();
  const openTooltips = () => {
    dispatch(setShowTooltip(true));
    setShowTutorialTooltip(true);
  };

  const r = createRef();
  r.current = false;
  // console.log("r.current", r.current);
  const refs = {};

  // const [datas, setDatas] = React.useState();

  const setRef = (name, ref, text) => {
    if (!ref) return;
    refs[name] = { ref, text, name, page: "" };
  };

  // React.useEffect(() => {
  //   setDatas(refs);
  // }, [loc]);

  React.useEffect(() => {
    if (user_data?.profile_image) {
      const image = `https://api.devhunters.ru/storage/users/${uid}/${user_data.profile_image}`;
      setUserAvatar(image);
    }
  }, [user_data]);

  return (
    <>
      <Flex className={s.fullbar} bg={colorMode === "dark" ? "brand.darkA" : "brand.lightA"}>
        <Flex align={"center"} justify={{ base: "flex-end", md: "space-between" }} flexWrap={"wrap"} gap={4} w="100%" maxW="1320px" m="0 auto" px={"20px"}>
          <SocialIconsLine ref={(ref) => setRef("socialIconsLine", ref, t("tutorial:SOCIAL_ICONS"))} />
          <Flex align={"center"} gap={"1rem"}>
            <Flex gap={{ base: 2, sm: 4 }} align={"center"} justify={"center"}>
              {!user_data.username || !token || !uid || !logged_in ? (
                <Flex ref={(ref) => setRef("signupText", ref, t("tutorial:SIGNUP_SINGNIN"))} flexDir={{ base: "column", sm: "row" }} gap={{ base: 1, sm: 4 }}>
                  <Link to={"/login"}>
                    <SText>{t("common:USER.AUTH.SIGNIN")}</SText>
                  </Link>
                  <Link to={"/signup"}>
                    <SText>{t("common:USER.AUTH.SIGNUP")}</SText>
                  </Link>
                </Flex>
              ) : (
                <Box ref={(ref) => setRef("user", ref, t("tutorial:USER_PROFILE"))}>
                  <Menu variant={colorMode === "dark" ? "darkMode" : "lightMode"}>
                    <MenuButton>
                      <Flex align={"center"} justify={"center"} gap={"2"}>
                        <SText fontSize={"12px"} fontWeight={"bold"} textTransform={"uppercase"}>
                          {user_data.name} {user_data.surname}
                        </SText>
                        <Avatar src={userAvatar} size={"sm"} name={`${user_data.name} ${user_data.surname}`} border={"2px solid #acacac"} />
                      </Flex>
                    </MenuButton>
                    <MenuList>
                      <MenuGroup>
                        {/* <Link to={"/dashboard"}> */}
                        <Link to={"https://money4you.financial/component/users/?view=profile"}>
                          <MenuItem>{t("common:MENU.DASHBOARD")}</MenuItem>
                        </Link>
                        {/* FIXME: add get user role to user data requset and after this can show this dashboards */}
                        {/* <Link to={"/dashboard/chief-seller"}>
                          <MenuItem>{t("common:MENU.DASHBOARD_CHIEF_SELLER")}</MenuItem>
                        </Link>
                        <Link to={"/dashboard/seller"}>
                          <MenuItem>{t("common:MENU.DASHBOARD_SELLER")}</MenuItem>
                        </Link>
                        <Link to={"/dashboard/press"}>
                          <MenuItem>{t("common:MENU.DASHBOARD_PRESS_SPEAKER")}</MenuItem>
                        </Link> */}
                      </MenuGroup>
                      <MenuDivider />

                      {/* <Link to={"/settings/profile"}>
                        <MenuItem>{t("common:MENU.PROFILE_SETTINGS")}</MenuItem>
                      </Link> */}
                      <MenuItem onClick={signout}>{t("common:MENU.SIGN_OUT")}</MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
              )}

              <Divider orientation="vertical" h={"20px"} />

              <div>
                <Box ref={(ref) => setRef("lngsMenuRect", ref, t("tutorial:LANGUAGE_MENU"))}>
                  <Menu variant={colorMode === "dark" ? "darkMode" : "lightMode"}>
                    <MenuButton
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      h={"35px"}
                      px={"4"}
                      border={"1px solid transparent"}
                      borderRadius={"0.25rem"}
                      fontSize={"1rem"}
                      bgColor={"#242424"}
                      color={"#ffffff"}
                      transition={"all 350ms, border 100ms"}
                      _hover={{
                        borderColor: "#dd9933",
                        background: "#dd9933",
                        color: "#242424",
                        boxShadow: "none",
                      }}>
                      <Flex align={"center"} justify={"center"} gap={"2"}>
                        <MdTranslate />
                        <Text fontSize={"12px"} fontWeight={"500"}>
                          {LNGS[i18n.resolvedLanguage].nativeName}
                        </Text>
                      </Flex>
                    </MenuButton>
                    <MenuList>
                      {Object.keys(LNGS).map((lng) => (
                        <MenuItem
                          key={lng}
                          onClick={() => handleOption(lng)}
                          color={i18n.resolvedLanguage === lng ? "#dd9933" : ""}
                          textTransform={"capitalize"}
                          fontSize={"14px"}>
                          {LNGS[lng].nativeName}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Menu>
                </Box>
              </div>

              <Box ref={(ref) => setRef("colorModeRect", ref, t("tutorial:COLOR_MODE"))}>
                <PButton onClick={toggleColorMode} p={"8px"} h={"35px"}>
                  {scheme === "light" ? <MdDarkMode /> : <MdLightMode />}
                </PButton>
              </Box>

              <Flex className={s.tutoral_tooltip}>
                <SHeaderTooltip refs={refs} onClick={openTooltips} />
                {!showTutorialTooltip && <TutoriaTooltipInfo />}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Box className={s.navbar} bg={colorMode === "dark" ? "brand.darkA" : "brand.lightA"}>
        <Flex alignItems="center" justifyContent="space-between" gap={4} w="100%" maxW="1200px" m="0 auto" px={5}>
          <Logotype ref={(ref) => setRef("logotype", ref, t("tutorial:THIS_IS_US"))} />
          <Box className={s.desktop} ref={window.innerWidth > 840 ? (ref) => setRef("headerMenu", ref, t("tutorial:HEADER_MENU")) : null}>
            <HeaderMenu />
          </Box>
          <Box className={s.mobile} ref={window.innerWidth <= 840 ? (ref) => setRef("mobileMenu", ref, t("tutorial:HEADER_MENU")) : null}>
            <SideMenu />
          </Box>
        </Flex>
      </Box>
    </>
  );
};
