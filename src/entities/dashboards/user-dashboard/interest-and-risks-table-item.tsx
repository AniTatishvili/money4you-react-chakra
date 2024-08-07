import i18n from "i18n";
import React from "react";
import { Link } from "react-router-dom";

import { Td, Tr } from "@chakra-ui/react";

import { useGetRate } from "shared/hooks";
import { TProject } from "shared/types";

export const InterestAndRisksTableItem = (props: { item: TProject }) => {
  const { id, amount_received, alias, title, extraData } = props.item;
  const interestRate = useGetRate(extraData, "5");
  const riskRate = useGetRate(extraData, "3");

  return (
    <Tr key={id}>
      <Td>
        <Link to={`https://money4you.financial/${i18n.language}/projects/${alias}`}>{title}</Link>
      </Td>
      <Td>{amount_received}</Td>
      <Td>{interestRate}%</Td>
      <Td>{riskRate}</Td>
    </Tr>
  );
};
