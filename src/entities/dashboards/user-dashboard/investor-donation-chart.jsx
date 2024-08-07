import React from "react";
import { useTranslation } from "react-i18next";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import { Box, useColorMode } from "@chakra-ui/react";

ChartJS.register(ArcElement, Tooltip, Legend);

export const InvestorDonationChart = ({ orders }) => {
  const { t } = useTranslation("dashboard");
  const { colorMode } = useColorMode();

  const [chartData, setChartData] = React.useState({
    labels: orders?.length > 0 && orders?.map((item) => item.title),
    datasets: [
      {
        label: t("LAST_DONATION.DONATION_AMOUNT"),
        data: orders?.length > 0 && orders?.map((item) => item.amount),
        backgroundColor: ["#29BC64", "#58CB8D", "#0EAE61", "#f3ba2f", "#2a71d0"],
        color: [colorMode === "dark" ? "brand.light" : "brand.dark"],
        hoverOffset: 30,
      },
    ],
  });

  const lang = window !== "undefined" ? window.localStorage.getItem("i18nextLng") : "";

  React.useEffect(() => {
    setChartData({
      labels: orders?.length > 0 && orders?.map((item) => item.title),
      datasets: [
        {
          label: t("LAST_DONATION.DONATION_AMOUNT"),
          data: orders?.length > 0 && orders?.map((item) => item.amount),
          backgroundColor: ["#29BC64", "#58CB8D", "#0EAE61", "#f3ba2f", "#2a71d0"],
          color: [colorMode === "dark" ? "brand.light" : "brand.dark"],
          hoverOffset: 30,
        },
      ],
    });
  }, [lang, orders]);

  return (
    <Box w={"100%"} maxW={"400px"}>
      <Pie
        data={chartData}
        options={{
          responsive: true,
          layout: {
            padding: 10,
          },
          plugins: {
            legend: {
              display: true,
              position: "bottom",
            },
            title: {
              display: true,
              text: "Donations information",
            },
          },
        }}></Pie>
    </Box>
  );
};
