import { useGetUserByUsernameMutation } from "app/providers/store/api/dashboard";
import React, { useEffect, useState } from "react";

import { Avatar, Flex, Image } from "@chakra-ui/react";
import { PSpinner, PText } from "shared/ui";

import { SellerDashboardDetailsBtn, TotalAmountBadge } from "../ui";
import { ChiefSellerDashboardSellerCustomerDetails } from "./chief-seller-dashboard-seller-customer-details";

import countryList from "app/assets/countries/country-list.json";
import { TCustomer } from "shared/types";

interface ChiefSellerDashboardSellerCustomerProps {
  username: string;
}

export const ChiefSellerDashboardSellerCustomer = ({ username }: ChiefSellerDashboardSellerCustomerProps) => {
  const [getUserByUsername, { isError, isLoading }] = useGetUserByUsernameMutation();

  const [showCustomerDetails, setShowCustomerDetails] = useState<boolean>(false);
  const [customerData, setCustomerData] = useState<TCustomer>();

  useEffect(() => {
    const fd = new FormData();
    fd.append("username", username);

    getUserByUsername(fd).then((res: any) => {
      const customer_data = res?.data?.data;

      if (!customer_data) return null;

      const { username, name, surname, id, profile_image, phone, email, country, city, state, street, building_number, apt_number }: TCustomer = customer_data;

      if (isError || !res.data) {
        return null;
      } else {
        setCustomerData({ username, name, surname, id, profile_image, phone, email, country, city, state, street, building_number, apt_number });
      }
      console.log(`@@@customer data (${name})`, res);

      return;
    });
  }, []);

  const [countryAlpha, setCountryAlpha] = useState<string>("");
  useEffect(() => {
    for (const country of countryList) {
      if (country.name === customerData?.country) {
        setCountryAlpha(country.alpha2.toLowerCase());
      }
    }
  }, [customerData]);

  const handleShowCustomerDetails: () => void = async () => {
    setShowCustomerDetails((prev) => !prev);
  };

  if (isLoading)
    return (
      <Flex justify={"center"} align={"center"} w={"100%"} h={"40px"} py={"40px"}>
        <PSpinner />
      </Flex>
    );

  if (isError || !customerData) return null;

  return (
    <Flex flexDirection={"column"} w={"95%"} ml={"auto"} my={"10"}>
      <Flex align={{ base: "flex-start", xl: "center" }} justify={"space-between"} flexWrap={"wrap"} gap={4}>
        <Flex align={"center"} gap={"15px"}>
          <Avatar
            src={`https://api.devhunters.ru/storage/users/${customerData?.id}/${customerData?.profile_image}`}
            name={`${customerData?.name} ${customerData?.surname}`}
            size={"md"}
            border={"none"}
            borderRadius={"100%"}
          />
          <PText fontSize={"16px"} fontWeight={"bold"}>
            {customerData?.name} {customerData?.surname}
          </PText>
          {countryAlpha && (
            <Image
              src={require(`/src/app/assets/countries/images/flags/${countryAlpha}.svg`)}
              boxSize={"25px"}
              h={"25px"}
              w={"25px"}
              overflow={"hidden"}
              // borderRadius={"full"}
              alt={"Country flag"}
            />
          )}
        </Flex>
        <Flex
          width={{ base: "100%", xl: "fit-content" }}
          justifyContent={"space-between"}
          flexWrap={"wrap"}
          align={{ base: "flex-start", md: "center" }}
          gap={{ base: "16px", lg: "35px" }}>
          <TotalAmountBadge />
          {/* FIXME: ONCLICK ???? */}
          <Flex width={{ base: "100%", sm: "auto" }} onClick={handleShowCustomerDetails}>
            <SellerDashboardDetailsBtn onClick={handleShowCustomerDetails} />
          </Flex>
        </Flex>
      </Flex>
      {showCustomerDetails && customerData ? <ChiefSellerDashboardSellerCustomerDetails cdata={customerData} /> : null}
    </Flex>
  );
};
