import React from "react";

import { Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, useDisclosure } from "@chakra-ui/react";

interface PressSpeakerDashboardPressCardModalProps {
  press_card: string;
  id: number;
}

export const PressSpeakerDashboardPressCardModal = ({ press_card, id }: PressSpeakerDashboardPressCardModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const img = `https://api.devhunters.ru/storage/users/${id}/${press_card}`;

  return (
    <>
      <Image src={img} width={"220px"} height={"140px"} borderRadius={"4px"} objectFit={"cover"} cursor={"pointer"} onClick={onOpen} />
      <Modal isOpen={isOpen} size={"2xl"} onClose={onClose} variant="custom_modal">
        <ModalOverlay />
        <ModalContent display={"flex"} alignItems={"center"}>
          <ModalCloseButton />
          <ModalBody>
            <Image src={img} w={"auto"} h={"460px"} objectFit={"contain"} m={"20px auto"} py={"1rem"} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
