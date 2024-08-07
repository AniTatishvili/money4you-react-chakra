import React from "react";
import { useTranslation } from "react-i18next";
import { useUpdateKYCMutation } from "app/providers/store/api";
import { useSelector } from "react-redux";
import { useChakraToast, useMakeBlob } from "shared/hooks";

import { Flex } from "@chakra-ui/react";
import { Kyc } from "widgets/auth/signup";
import { PButton } from "shared/ui/buttons";

export const UpdateKYC = () => {
  const { t } = useTranslation("forms");
  const [updateKyc] = useUpdateKYCMutation();
  const toast = useChakraToast();
  const { front, back, selfie } = useSelector((state) => state.kyc_images.datas);

  const saveChangedKycValues = async () => {
    const updateKycRequestData = {
      doc_front_image: await useMakeBlob(front),
      doc_back_image: await useMakeBlob(back),
      selfie_image: await useMakeBlob(selfie),
    };

    const form_data = new FormData();
    for (let k in updateKycRequestData) {
      form_data.append(k, updateKycRequestData[k]);
    }

    try {
      await updateKyc(form_data).unwrap();
      const title = "Notification";
      const msg = "KYC updated successfully.";
      toast("success", msg, title);
    } catch (error) {
      console.error(error);
      toast("error", error.data.error.message[0], "Error");
    }
  };

  return (
    <>
      <Flex flexDir="column" maxW="280px">
        <Kyc />
        <PButton type="submit" isDisabled={!(front && back && selfie)} onClick={saveChangedKycValues}>
          {t("BUTTONS.UPDATE")}
        </PButton>
      </Flex>
    </>
  );
};
