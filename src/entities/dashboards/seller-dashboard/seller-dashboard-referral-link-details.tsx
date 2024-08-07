import React from "react";

import { Flex, Image, Link, List, Progress } from "@chakra-ui/react";
import { SellerDashboardReferralLinkBadge } from "./seller-dashboard-referral-link-badge";
import { SellerDashboardReferralLinkModal } from "./seller-dashboard-referral-link-modal";

import { FaChartPie, FaDollarSign, FaHourglassEnd, FaHourglassStart } from "react-icons/fa";
import { TfiNewWindow } from "react-icons/tfi";

interface SellerDashboardReferralLinkDetailsProps {
  alias: string;
  amount_received: number;
  c_amount_received: number;
  end_date: string;
  goal_amount: number;
  image: string;
  start_date: string;
  title: string;
}

export const SellerDashboardReferralLinkDetails = ({
  alias,
  c_amount_received,
  goal_amount,
  title,
  amount_received,
  start_date,
  end_date,
  image,
}: SellerDashboardReferralLinkDetailsProps) => {
  const uid = window !== undefined && window.localStorage.getItem("UID");
  const uid_item: string = uid && JSON.parse(uid);

  return (
    <Flex width={"100%"} flexDirection={{ base: "column", md: "row" }} py={"20px"} gap={4}>
      <Image src={`https://money4you.financial/${image}`} width={"85px"} height={"85px"} borderRadius={"full"} objectFit={"cover"} />
      <Flex width={"100%"} flexDir={"column"}>
        <Flex justifyContent={"space-between"} flexDirection={{ base: "column", sm: "row", md: "column", lg: "row" }} gap={2}>
          <Link display={"flex"} alignItems={"center"} gap={3} fontWeight={"bold"}>
            {title}
            <TfiNewWindow />
          </Link>
          <SellerDashboardReferralLinkModal alias={alias} uid={uid_item} />
        </Flex>
        <List display={"flex"} flexWrap={{ base: "wrap", sm: "nowrap" }} gap={"5"} mt={"4"}>
          <Flex flexWrap={"wrap"} gap={"5"} w={"100%"}>
            <SellerDashboardReferralLinkBadge text={new Date(start_date).toLocaleDateString()} icon={FaHourglassStart} />
            <SellerDashboardReferralLinkBadge text={new Date(end_date).toLocaleDateString()} icon={FaHourglassEnd} />
          </Flex>
          <Flex flexWrap={"wrap"} gap={"5"} w={"100%"}>
            <SellerDashboardReferralLinkBadge text={`${Number(((c_amount_received / goal_amount) * 100).toFixed(2))}%`} icon={FaChartPie}>
              <Progress value={Number(((c_amount_received / goal_amount) * 100).toFixed(2))} w={"100%"} height="5px" colorScheme="green" borderRadius="4px" />
            </SellerDashboardReferralLinkBadge>
            <SellerDashboardReferralLinkBadge text={amount_received} icon={FaDollarSign} />
          </Flex>
        </List>
      </Flex>
    </Flex>
  );
};
