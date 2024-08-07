import React from "react";

import { useAppSelector } from "app/providers/store";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Avatar, VStack, useColorMode } from "@chakra-ui/react";
import { PButton, PText } from "shared/ui";

export const UserDetails = () => {
  const { t } = useTranslation("dashboard");
  const { colorMode } = useColorMode();
  const { user_data } = useAppSelector((state) => state.auth);
  const uid = JSON.parse(window.localStorage.getItem("UID")) || "";

  const [userAvatar, setUserAvatar] = React.useState("");
  React.useEffect(() => {
    if (user_data?.profile_image) {
      const image = `https://api.devhunters.ru/storage/users/${uid}/${user_data.profile_image}`;
      setUserAvatar(image);
    }
  }, [user_data]);

  return (
    <>
      <VStack
        justify={"center"}
        gap={"4"}
        h={"400"}
        w={"100%"}
        maxW={{ base: "100%", md: "240px" }}
        py={"4"}
        px={"6"}
        border={"none"}
        borderRadius={"4"}
        bg={colorMode === "dark" ? "brand.darkC" : "brand.lightC"}>
        {userAvatar ? <Avatar src={userAvatar} size={"2xl"} /> : null}
        {user_data?.username ? (
          <VStack flexDir={"column"} gap={"1"}>
            <PText>
              {user_data.name} {user_data.surname}
            </PText>
            <PText fontWeight={"bold"}>
              {"("}
              {user_data.username}
              {")"}
            </PText>
          </VStack>
        ) : null}
        <Link to={`/settings/profile`}>
          <PButton>{t("SETTINGS")}</PButton>
        </Link>
      </VStack>
    </>
  );
};
