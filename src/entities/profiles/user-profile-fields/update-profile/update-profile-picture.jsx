import React from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "app/providers/store";
import { saveUserDataInGlobalState } from "app/providers/store/slices/authSlice";
import { useUserEditProfileMutation } from "app/providers/store/api";
import { useChakraToast, useMakeBlob } from "shared/hooks";
import { UploadInput } from "shared/ui";

import { Flex, Avatar } from "@chakra-ui/react";

export const UserImage = () => {
  const { t } = useTranslation("forms");
  const dispatch = useAppDispatch();
  const { user_data } = useAppSelector((state) => state.auth);
  const [userEditProfile, { isLoading }] = useUserEditProfileMutation();
  const toast = useChakraToast();

  const [profileImage, setProfileImage] = React.useState("");
  const uid = JSON.parse(window.localStorage.getItem("UID"));

  React.useEffect(() => {
    if (user_data?.profile_image) {
      const image = `https://api.devhunters.ru/storage/users/${uid}/${user_data.profile_image}`;
      setProfileImage(image);
    }
  }, [user_data]);

  const updateProfileImage = async (e) => {
    const image = e.target.files[0];
    const imageBlobUrl = window.URL.createObjectURL(image);
    const file = await useMakeBlob(imageBlobUrl);

    const fd = new FormData();
    fd.append("profile_image", file);

    await userEditProfile(fd)
      .unwrap()
      .then((res) => {
        dispatch(saveUserDataInGlobalState({ profile_image: res.data.user.profile_image }));

        const title = "Avatar update.";
        const msg = "Your avatar is update.";
        toast("success", msg, title);
      })
      .catch((err) => {
        // console.log(err);
        // FIXME: Add here error toast
      });
  };

  return (
    <Flex flexDir={"column"} justify={"space-between"} gap={"1rem"} w={"100%"} maxW={"320px"}>
      <Avatar src={profileImage} name={`${user_data.name} ${user_data.surname}`} w={"140px"} h={"140px"} border={"none"} borderRadius={"100%"} />
      <UploadInput
        name={t("PROFILE_SETTINGS.BUTTONS.UPDATE_AVATAR")}
        id="update-avatar"
        accept="image/png, image/jpeg, .png, .jpg, .jpeg"
        isLoading={isLoading}
        cb={updateProfileImage}
        w={"180px"}
      />
    </Flex>
  );
};
