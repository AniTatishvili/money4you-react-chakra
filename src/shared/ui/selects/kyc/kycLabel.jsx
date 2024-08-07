import React from "react";
import { Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from "@chakra-ui/react";

import { FaQuestionCircle } from "react-icons/fa";
import registration from "../../../../app/assets/videos/registration.mp4";
import s from "./kycLabel.module.scss";

export const KYCLabel = ({ children, ...props }) => {
  const OverlayOne = () => <ModalOverlay backdropFilter="blur(10px)" />;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  return (
    <Flex pos={"relative"}>
      <label className={s.label} htmlFor={props.name} {...props}>
        <Flex align={"center"} justify={"space-between"}>
          <Flex align={"center"} gap={"10px"}>
            {children}
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
