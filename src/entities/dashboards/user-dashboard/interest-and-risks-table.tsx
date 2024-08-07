import React from "react";

import { useGetProjectsMutation } from "app/providers/store/api";
import { useTranslation } from "react-i18next";

import { Box, Flex, Table, TableContainer, Tbody, Th, Thead, Tr, useColorMode } from "@chakra-ui/react";
import { PSpinner, PText } from "shared/ui";

import { TProject } from "shared/types";
import { InterestAndRisksTableItem } from "./interest-and-risks-table-item";

interface ISort {
  featured: string;
  limit: string;
  offset: string;
  orderby: string;
  order: string;
}

export const InterestAndRisksTable = () => {
  const { t } = useTranslation("dashboard");
  const { colorMode } = useColorMode();

  const [getProjects, { isLoading }] = useGetProjectsMutation();
  const [projects, setProjects] = React.useState<TProject[]>();

  React.useEffect(() => {
    const sort: ISort = {
      featured: "0",
      limit: "0",
      offset: "0",
      orderby: "goal_amount",
      order: "DESC",
    };

    getProjects(sort)
      .unwrap()
      .then((res) => {
        setProjects(res?.data?.projects);
      });
  }, []);

  return (
    <Box pos={"relative"} h={"400"} w={"100%"} py={"4"} px={"6"} border={"none"} borderRadius={"4"} bg={colorMode === "dark" ? "brand.darkC" : "brand.lightC"}>
      {isLoading ? (
        <Flex justify={"center"} align={"center"} w={"100%"} h={"100%"}>
          <PSpinner />
        </Flex>
      ) : (
        <>
          <PText
            as="h2"
            fontSize={"16px"}
            mb={"4"}
            pos={"sticky"}
            top={"0"}
            textTransform={"uppercase"}
            bg={colorMode === "dark" ? "brand.darkC" : "brand.lightC"}>
            {t("TITLES.INTEREST_AND_RISKS")}
          </PText>
          <Box>
            <TableContainer h={"320px"} overflowY={"scroll"}>
              <Table variant="unstyled" size={"sm"}>
                <Thead>
                  <Tr borderBottom={"1px solid #999"}>
                    <Th>
                      <PText fontSize={"12px"}>{t("TABLES.PROJECT_NAME")}</PText>
                    </Th>
                    <Th isNumeric>
                      <PText fontSize={"12px"}>{t("TABLES.AMOUNT")}</PText>
                    </Th>
                    <Th isNumeric>
                      <PText fontSize={"12px"}>{t("TABLES.INTEREST")}</PText>
                    </Th>
                    <Th isNumeric>
                      <PText fontSize={"12px"}>{t("TABLES.RISK")}</PText>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {projects instanceof Array &&
                    projects.map((project: TProject) => {
                      return <InterestAndRisksTableItem key={project.id} item={project} />;
                    })}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </>
      )}
    </Box>
  );
};
