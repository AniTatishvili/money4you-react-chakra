import { useAppDispatch } from "app/providers/store";
import React from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@chakra-ui/react";
import { PText } from "shared/ui";
import { changeCustomerDetailsStatus } from "../../../app/providers/store/slices/dashboards/seller/customer-details-slice";

export const ChiefSellerDashboardDetailsBtn = () => {
  const { t } = useTranslation("csd");
  const dispatch = useAppDispatch();
  const [btnState, setBtnState] = React.useState<boolean>(false);

  const handleClickToggle = () => {
    setBtnState((state) => !state);
    dispatch(changeCustomerDetailsStatus(!btnState));
  };

  return (
    <Button onClick={handleClickToggle} className={btnState ? "jm-button-light-gray" : "jm-button-green"} width={{ base: "100%", sm: "fit-content" }}>
      <PText fontSize={"12px"} fontWeight={"bold"} casing={"uppercase"}>
        {btnState ? `${t("HIDE_CUSTOMERS")}` : `${t("SHOW_CUSTOMERS")}`}
      </PText>
    </Button>
  );
};
