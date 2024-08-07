import { setJournalistPressCard } from "app/providers/store/slices/auth/journalist-auth-slice";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { FaQuestionCircle } from "react-icons/fa";

import registration from "../../../app/assets/videos/registration.mp4";
import s from "./signup-ui.module.scss";

export const JournalistCardUploadInput = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const [pressCardFile, setPressCardFile] = React.useState(null);

  const saveState = (e) => {
    setPressCardFile(e.target.files[0]);
    const file = window.URL.createObjectURL(e.target.files[0]);

    dispatch(setJournalistPressCard(file));
  };

  const OverlayOne = () => <ModalOverlay backdropFilter="blur(10px)" />;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  return (
    <Flex flexDir={"column"}>
      <label htmlFor="filePressCard" className={s.label}>
        <Flex align={"center"} justify={"space-between"}>
          <Flex align={"center"} gap={"10px"}>
            {pressCardFile ? pressCardFile.name : t("forms:UPLOAD_PRESS_CARD")}
          </Flex>
          <Flex
            pos={"absolute"}
            right={"0"}
            top={"50%"}
            transform={"translateY(-50%)"}
            align={"center"}
            justify={"center"}
            h={"100%"}
            w={"40px"}
            borderRadius={"0 4px 4px 0"}
            borderLeft={"1px solid #767676"}
            zIndex={"1"}
            onClick={(event) => {
              event.preventDefault();
              setOverlay(<OverlayOne />);
              onOpen();
            }}>
            <FaQuestionCircle />
          </Flex>
        </Flex>
      </label>
      <Input type="file" accept="image/png, image/jpeg, .png, .jpg, .jpeg" id="filePressCard" display="none" name="presscard-input" onChange={saveState} />

      <Modal isCentered isOpen={isOpen} onClose={onClose} variant="custom_modal">
        {overlay}
        <ModalContent>
          <ModalHeader>Video tutorial</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={"0"}>
            <video width={"100%"} autoPlay muted loop controls>
              <source width="100%" height={"100%"} src={registration} type="video/mp4"></source>
            </video>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
