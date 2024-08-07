import { useGetOrdersQuery } from "app/providers/store/api";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Center, Flex, useColorMode } from "@chakra-ui/react";
import { PSpinner, PText } from "shared/ui";
import { DonationProgress } from "shared/ui/progress-bars/donation-progress";
import { InvestorDonationChart } from "./investor-donation-chart";

import { TExtra, TProject } from "shared/types";

interface ISort {
  limit: number;
  offset: number;
}

type TProjectExtends = TProject & {
  c_extraData: TExtra[];
};

export const UserLastDonation = () => {
  const { t } = useTranslation("dashboard");
  const { colorMode } = useColorMode();

  const sort: ISort = {
    limit: 5,
    offset: 0,
  };

  const { data, isLoading } = useGetOrdersQuery(sort);

  const [lastProject, setLastProject] = useState<TProjectExtends>();

  useEffect(() => {
    setLastProject(data?.data?.orders[0]);
  }, [data]);

  const e = lastProject?.c_extraData;
  const risk = e ? Number(e.find((item) => item.field_id === "3")?.value) : 0;
  const riskRate: number = isNaN(risk) ? 0 : risk;

  return (
    <Flex
      flexDir={"column"}
      align={"center"}
      justify={"center"}
      w={"100%"}
      maxW={{ base: "100%", lg: "380px" }}
      minH={"550px"}
      py={"4"}
      px={"6"}
      border={"none"}
      borderRadius={"4"}
      bg={colorMode === "dark" ? "brand.darkC" : "brand.lightC"}>
      {isLoading ? (
        <PSpinner />
      ) : (
        <Flex flexDir={{ base: "column", md: "row", lg: "column" }} align={"center"} justify={"space-around"} gap={"4"} w={"100%"}>
          <PText
            as="h2"
            fontSize={"16px"}
            mb={"4"}
            pos={"sticky"}
            top={"0"}
            textTransform={"uppercase"}
            bg={colorMode === "dark" ? "brand.darkC" : "brand.lightC"}>
            {t("TITLES.YOUR_LAST_DONATIONS")}
          </PText>
          {data?.data?.orders[0] ? (
            <>
              <InvestorDonationChart orders={data?.data?.orders} />
              <Flex flexDir={"column"} gap={"4"} w={"100%"} maxW={"280px"}>
                <Center>{t("LAST_DONATION.NAME", { last_donation_name: data?.data?.orders[0].title })}</Center>
                <DonationProgress name={t("LAST_DONATION.RISK")} value={riskRate ?? 0} />
                <DonationProgress
                  name={t("LAST_DONATION.DONATION_PROGRESS")}
                  value={Math.round((data?.data?.orders[0].c_amount_received / data?.data?.orders[0].goal_amount) * 100)}
                />
              </Flex>
            </>
          ) : (
            <PText>{`You don't have any donation 😒`}</PText>
          )}
        </Flex>
      )}
    </Flex>
  );
};
