import React from "react";
import { useTranslation } from "react-i18next";
import { useChakraToast } from "shared/hooks";

import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { PButton } from "shared/ui/buttons";

interface SellerDashboardReferralLinkModalProps {
  alias: string;
  uid: string;
}

export const SellerDashboardReferralLinkModal = ({ alias, uid }: SellerDashboardReferralLinkModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation("sd");

  const toast = useChakraToast();

  const referralLinkRef = React.useRef<HTMLInputElement>(null);
  const handleCopyReferralLink = () => {
    const linkText = referralLinkRef.current?.value;
    if (navigator !== undefined && linkText) navigator.clipboard.writeText(linkText).then(() => toast("success", `Success, you copied the link: ${linkText}`));
  };

  return (
    <>
      <Button className="jm-button-green" width={{ base: "100%", sm: "fit-content" }} size="md" fontFamily="NunitoVariable" onClick={onOpen}>
        {t("CREATE_LINK")}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} variant="custom_modal">
        <ModalOverlay />
        <ModalContent display={"flex"} alignItems={"center"}>
          <ModalHeader fontWeight={"bold"}>Balaton Luxury Houses</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input ref={referralLinkRef} w={"280px"} defaultValue={`https://money4you.financial/projects/all-projects/${alias}?ref_id=${uid}`} readOnly />
          </ModalBody>
          <ModalFooter display={"flex"} justifyContent={"center"}>
            <PButton onClick={handleCopyReferralLink}>{t("COPY")}</PButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
