import { Button, Text } from "@chakra-ui/react";
import { useAppDispatch } from "app/providers/store";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { changeCustomerDetailsStatus } from "../../../app/providers/store/slices/dashboards/seller/customer-details-slice";

type ButtonProps = React.ComponentPropsWithoutRef<"button">;

export const SellerDashboardDetailsBtn = ({ onClick }: ButtonProps) => {
  const { t } = useTranslation("psd");
  const dispatch = useAppDispatch();
  const [btnState, setBtnState] = React.useState<boolean>(false);

  const handleClickToggle = () => {
    setBtnState((state) => !state);
    dispatch(changeCustomerDetailsStatus(!btnState));
  };

  return (
    <Button
      onClick={handleClickToggle}
      className={btnState ? "jm-button-gray" : "jm-button-dark"}
      width={{ base: "100%", sm: "fit-content" }}
      rightIcon={btnState ? <FaChevronUp /> : <FaChevronDown />}>
      <Text fontSize={"12px"} fontWeight={"bold"} casing={"uppercase"}>
        {btnState ? `${t("HIDE_DETAILS")}` : `${t("SHOW_DETAILS")}`}
      </Text>
    </Button>
  );
};
