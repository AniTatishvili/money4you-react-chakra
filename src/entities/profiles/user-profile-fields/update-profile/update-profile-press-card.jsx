import React from "react";
import { useTranslation } from "react-i18next";
import { editProfileAPI } from "app/providers/store/api";
import { useUserEditProfileMutation } from "app/providers/store/api";
import { useChakraToast, useMakeBlob } from "shared/hooks";
import { useDisclosure, useColorMode } from "@chakra-ui/react";

import { Flex, Image, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody } from "@chakra-ui/react";
import { UploadInput } from "shared/ui";

export const UpdateProfilePressCard = () => {
  const { t } = useTranslation("forms");
  const [getUserData, { data }] = editProfileAPI.endpoints.userProfileData.useLazyQuery();
  const [userEditProfile, { isLoading }] = useUserEditProfileMutation();
  const toast = useChakraToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  const [pressCardImage, setPressCardImage] = React.useState("");
  const [roles, setRoles] = React.useState([]);
  const uid = JSON.parse(window.localStorage.getItem("UID"));

  React.useEffect(() => {
    getUserData();
    if (data?.data?.user) {
      const user = data.data.user;

      setRoles(user.roles);
      const image = `https://api.devhunters.ru/storage/users/${uid}/${data?.data?.user?.press_card}`;
      data?.data?.user?.press_card && setPressCardImage(image);
    }
  }, [data]);

  const uploadPressCard = async (e) => {
    const new_image = URL.createObjectURL(e.target.files[0]);
    const f = await useMakeBlob(new_image);
    const fd = new FormData();

    fd.append("press_card", f);
    await userEditProfile(fd)
      .then(() => setPressCardImage(new_image))
      .then(() => {
        const title = "Press card update.";
        const msg = "Your press card is update.";
        toast("success", msg, title);
      })
      .catch((err) => {
        // console.log(err);
        // FIXME: Add here error toast
      });
  };

  const openPressCardModal = () => {
    onOpen();
  };

  return roles.find((role) => role === "Journalist") ? (
    <>
      <Flex flexDir={"column"} justify={"space-between"} gap={"1rem"} maxW={"320px"} w={"100%"} h={"100%"}>
        <Image src={pressCardImage} w={"auto"} h={"140px"} objectFit={"cover"} onClick={openPressCardModal} cursor={"pointer"} />
        <UploadInput
          name={t("PROFILE_SETTINGS.BUTTONS.UPDATE_PRESS_CARD")}
          id="update-press-card"
          accept="image/png, image/jpeg, .png, .jpg, .jpeg"
          isLoading={isLoading}
          cb={uploadPressCard}
        />
      </Flex>

      <Modal onClose={onClose} size={"2xl"} isOpen={isOpen} variant="custom_modal">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Image src={pressCardImage} w={"auto"} h={"460px"} objectFit={"contain"} m={"20px auto"} py={"1rem"} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  ) : null;
};
