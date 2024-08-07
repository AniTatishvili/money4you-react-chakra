import { useGetProjectsMutation } from "app/providers/store/api";
import React from "react";
import { useTranslation } from "react-i18next";

import { Center, Show, TabPanel, TabPanels, VStack, useColorMode } from "@chakra-ui/react";
import { SidebarMenuTab } from "entities/sidebar-menu/ui";
import { SideBarMobileMenu } from "entities/sidebar-mobile-menu/sidebar-mobile-menu";
import { ErrorField, PSpinner } from "shared/ui";

import { DashboardsTitle } from "entities/dashboards/ui/dashboards-title";
import { FaLink, FaUsers } from "react-icons/fa";
import { SellerDashboardCustomersList } from "./seller-dashboard-customers-list";
import { SellerDashboardReferralLinkDetails } from "./seller-dashboard-referral-link-details";

interface IProject {
  alias: string;
  amount_received: number;
  end_date: string;
  goal_amount: string;
  id: string;
  start_date: string;
  title: string;
  image: {
    media: string;
  };
}

export const SellerDashboardsTabs = () => {
  const { t } = useTranslation("sd");
  const { colorMode } = useColorMode();
  const [getProjects, { data, isLoading, isError }] = useGetProjectsMutation();

  React.useEffect(() => {
    const sort = {
      limit: "0",
      offset: "0",
    };

    getProjects(sort);
  }, []);

  if (isLoading)
    return (
      <TabPanels bg={colorMode === "dark" ? "brand.darkB" : "brand.lightB"} w={"100%"} p={{ base: "0", lg: "40px" }} h={"100%"}>
        <Center w={"100%"} h={"100%"}>
          <PSpinner />
        </Center>
      </TabPanels>
    );

  if (isError)
    return (
      <TabPanels bg={colorMode === "dark" ? "brand.darkB" : "brand.lightB"} w={"100%"} p={{ base: "0", lg: "40px" }} h={"100%"}>
        <Center w={"100%"} h={"100%"}>
          <ErrorField />
        </Center>
      </TabPanels>
    );

  if (!data)
    return (
      <TabPanels bg={colorMode === "dark" ? "brand.darkB" : "brand.lightB"} w={"100%"} p={{ base: "0", lg: "40px" }} h={"100%"}>
        <Center w={"100%"} h={"100%"}>
          <div>You do not have access to the data...</div>
        </Center>
      </TabPanels>
    );

  const projects = data.data.projects;

  return (
    <TabPanels
      h={"780px"}
      overflowY={"auto"}
      overflowX={"hidden"}
      bg={colorMode === "dark" ? "brand.darkB" : "brand.lightB"}
      w={"100%"}
      p={{ base: "0", lg: "40px" }}>
      <TabPanel>
        <Show below="lg">
          <SideBarMobileMenu>
            <SidebarMenuTab icon={<FaUsers />}>{t("YOUR_CUSTOMERS")}</SidebarMenuTab>
            <SidebarMenuTab icon={<FaLink />}>{t("CREATE_REFERRAL_LINK")}</SidebarMenuTab>
          </SideBarMobileMenu>
        </Show>
        <DashboardsTitle page_title={t("YOUR_CUSTOMERS")} />
        <SellerDashboardCustomersList />
      </TabPanel>
      <TabPanel>
        <Show below="lg">
          <SideBarMobileMenu>
            <SidebarMenuTab icon={<FaUsers />}>{t("YOUR_CUSTOMERS")}</SidebarMenuTab>
            <SidebarMenuTab icon={<FaLink />}>{t("CREATE_REFERRAL_LINK")}</SidebarMenuTab>
          </SideBarMobileMenu>
        </Show>
        <DashboardsTitle page_title={t("CREATE_REFERRAL_LINK")} />
        {projects.map((project: IProject) => (
          <VStack key={project.id}>
            <SellerDashboardReferralLinkDetails
              alias={project.alias}
              c_amount_received={project.amount_received}
              amount_received={project.amount_received}
              end_date={project.end_date}
              image={project.image.media}
              start_date={project.start_date}
              title={project.title}
              goal_amount={Number(project.goal_amount)}
            />
          </VStack>
        ))}
      </TabPanel>
    </TabPanels>
  );
};
