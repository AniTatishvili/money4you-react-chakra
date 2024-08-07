import { getUserOrdersAPI } from "app/providers/store/api/dashboard";
import React from "react";
import { useTranslation } from "react-i18next";

import { Heading, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { TCampaign } from "shared/types";
import { ErrorField, PButton, PSpinner } from "shared/ui";

export const SellerDashboardDetailsTable = ({ id }: { id: number }) => {
  const { t } = useTranslation("sd");
  const [getUserOrders, { data, isError, isLoading }] = getUserOrdersAPI.endpoints.getUserOrders.useLazyQuery();

  React.useEffect(() => {
    const getUserOrdersRequestData = {
      id: id,
    };
    getUserOrders(getUserOrdersRequestData);
  }, []);

  if (isLoading) return <PSpinner />;

  if (!data || isError) return <ErrorField />;

  const campaigns = data.data.orders;
  console.log(campaigns);

  const TOTAL_AMOUNT = campaigns.reduce((total: number, campaign: TCampaign) => (total += Number(campaign.amount)), 0);

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>
            <Heading>{t("TABLES.CAMPAIGN")}</Heading>
          </Th>
          <Th>
            <Heading>{t("TABLES.START_DATE")}</Heading>
          </Th>
          <Th>
            <Heading>{t("TABLES.END_DATE")}</Heading>
          </Th>
          <Th>
            <Heading>{t("TABLES.INTEREST")}</Heading>
          </Th>
          <Th>
            <Heading>{t("TABLES.AMOUNT")}</Heading>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {campaigns.map((campaign: TCampaign, i: number) => (
          <Tr key={i}>
            <Td>{campaign.title}</Td>
            <Td>{new Date(campaign.start_date).toLocaleDateString()}</Td>
            <Td>{new Date(campaign.end_date).toLocaleDateString()}</Td>
            <Td>15%</Td>
            <Td fontWeight="bold">{campaign.amount}</Td>
            <Td fontWeight="bold">
              <PButton
                onClick={() => {
                  window.open(`https://money4you.financial/media/com_jgive/files/contracts/${campaign.donor_id}/${campaign.contract}`, "_blank");
                }}>
                {t("dashboard:BUTTONS.SEE_CONTRACT")}
              </PButton>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
