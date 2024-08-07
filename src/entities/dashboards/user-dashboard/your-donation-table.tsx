import React from "react";

import { useGetOrdersQuery } from "app/providers/store/api";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Box, Flex, Progress, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useColorMode } from "@chakra-ui/react";
import { PButton, PSpinner, PText } from "shared/ui";

interface IProject {
  id: number;
  title: string;
  amount: number;
  cdate: Date;
  status: string;
  start_date: Date;
  end_date: Date;
  risk_per: number;
  goal_amount: number;
  contract: string;
  donor_id: string;
  clink: string;
  c_amount_received: number;
}

export const YourDonationTable = () => {
  const { t, i18n } = useTranslation("dashboard");
  const { colorMode } = useColorMode();

  const { data, isLoading } = useGetOrdersQuery({ limit: 0, offset: 0 });

  const exp = new RegExp("[^/]+$", "g");

  type StatusTranslations = {
    [key: string]: string;
  };

  const statusTranslations: StatusTranslations = {
    P: t("STATUS.PENDING"),
    E: t("STATUS.CLOSED"),
    UP: t("STATUS.UNPAID"),
    C: t("STATUS.CONFIRMED"),
    RF: t("STATUS.REFUND"),
  };

  function getStatusText(status: string) {
    return statusTranslations[status] || t("STATUS.DENIED");
  }

  return (
    <Flex flexDir={"column"} justify={"space-between"} gap={"8"} w={"100%"} maxW={{ base: "100%" }}>
      <Box
        pos={"relative"}
        h={"550px"}
        w={"100%"}
        py={"4"}
        px={"6"}
        border={"none"}
        borderRadius={"4"}
        bg={colorMode === "dark" ? "brand.darkC" : "brand.lightC"}
        overflow={"hidden"}>
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
              {t("TITLES.YOUR_DONATIONS")}
            </PText>

            <Box>
              <TableContainer h={"460px"} pos={"relative"} overflowY={"scroll"} overflowX={"scroll"}>
                <Table pos={"absolute"} variant="unstyled" size={"sm"} w={"100%"}>
                  <Thead>
                    <Tr borderBottom={"1px solid #999"}>
                      <Th>
                        <PText fontSize={"12px"}>{t("TABLES.PROJECT_NAME")}</PText>
                      </Th>
                      <Th isNumeric>
                        <PText fontSize={"12px"}>{t("TABLES.AMOUNT")}</PText>
                      </Th>
                      <Th isNumeric>
                        <PText fontSize={"12px"}>{t("TABLES.PROGRESS")}</PText>
                      </Th>
                      <Th isNumeric>
                        <PText fontSize={"12px"}>{t("TABLES.STATUS")}</PText>
                      </Th>
                      <Th isNumeric>
                        <PText fontSize={"12px"}>{t("TABLES.DONATION_DATE")}</PText>
                      </Th>
                      <Th isNumeric>
                        <PText fontSize={"12px"}>{t("TABLES.INTEREST")}</PText>
                      </Th>
                      <Th isNumeric>
                        <PText fontSize={"12px"}>{t("TABLES.RISK")}</PText>
                      </Th>
                      <Th isNumeric>
                        <PText fontSize={"12px"}>{t("TABLES.START_DATE")}</PText>
                      </Th>
                      <Th isNumeric>
                        <PText fontSize={"12px"}>{t("TABLES.END_DATE")}</PText>
                      </Th>
                      <Th isNumeric>
                        <PText fontSize={"12px"}>{t("TABLES.CONTRACT")}</PText>
                      </Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {data?.data?.orders &&
                      data?.data?.orders.map((project: IProject) => (
                        <Tr key={project.id}>
                          <Td>
                            <Link to={`https://money4you.financial/${i18n.language}/projects/${exp.exec(project.clink)}`}>{project.title}</Link>
                          </Td>
                          <Td>{project.amount}</Td>
                          <Td>
                            <Progress
                              value={(project.c_amount_received / project.goal_amount) * 100}
                              hasStripe
                              isAnimated
                              colorScheme={"green"}
                              bg={"brand.lightB"}
                              h={"5px"}
                              border={"none"}
                              borderRadius={"4"}
                            />
                          </Td>
                          <Td>{getStatusText(project.status)}</Td>
                          <Td>{new Date(project.cdate).toLocaleDateString()}</Td>
                          <Td>{((project.c_amount_received / project.goal_amount) * 100).toFixed(2)}%</Td>
                          <Td>{project.risk_per}%</Td>
                          <Td>{new Date(project.start_date).toLocaleDateString()}</Td>
                          <Td>{new Date(project.end_date).toLocaleDateString()}</Td>
                          <Td>
                            <PButton
                              onClick={() => {
                                window.open(`https://money4you.financial/media/com_jgive/files/contracts/${project.donor_id}/${project.contract}`, "_blank");
                              }}>
                              {project.contract ? t("BUTTONS.SEE_CONTRACT") : t("BUTTONS.AWAITS_CONFIRMATION")}
                            </PButton>
                          </Td>
                        </Tr>
                        // regex extentions
                        // project.donor_id
                      ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </>
        )}
      </Box>
    </Flex>
  );
};
