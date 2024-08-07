import { useUsersByRoleMutation } from "app/providers/store/api/dashboard";
import React, { useEffect } from "react";

import { Flex } from "@chakra-ui/react";
import { ErrorField, PSpinner } from "shared/ui";
import { ChiefSellerDashboardSeller } from "./chief-seller-dashboard-seller";

interface Seller {
  id: number;
  name: string;
  surname: string;
  profile_image: string;
}

export const ChiefSellerDashboard = () => {
  const [getUsersByRole, { data, isLoading, isError }] = useUsersByRoleMutation();

  useEffect(() => {
    const fd = new FormData();
    fd.append("role", "4");

    getUsersByRole(fd);
  }, []);

  const sellers = data?.data;

  if (isLoading)
    return (
      <Flex justify={"center"} align={"center"} w={"100%"} h={"100%"}>
        <PSpinner />
      </Flex>
    );

  if (isError || !sellers) return <ErrorField />;

  if (sellers.length < 1)
    return (
      <Flex flexDir={"column"} h={"100%"} w={"100%"}>
        Sellers list is empty
      </Flex>
    );

  console.log("@@@sellers:", sellers);

  return (
    <Flex flexDir={"column"} h={"100%"} w={"100%"}>
      {sellers.map((seller: Seller) => (
        <div key={seller.id}>
          <ChiefSellerDashboardSeller id={seller.id} name={seller.name} surname={seller.surname} profileImage={seller.profile_image} />
        </div>
      ))}
    </Flex>
  );
};
