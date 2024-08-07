import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

import { Box, HStack, Image, Text, useColorMode } from "@chakra-ui/react";
import { FaFlagCheckered, FaHistory, FaPowerOff, FaUsers } from "react-icons/fa";
import { HomeProjectsLevel } from "./assets/home-projects-level";
import { HomeProjectsTime } from "./assets/home-projects-time";
import { HomeProjectsUsers } from "./assets/home-projects-users";
import { HomeProjectsItemBadge } from "./home-projects-item-badge";

import { useGetRate } from "shared/hooks";
import { TExtra } from "shared/types";
import s from "./home-projects-item.module.scss";

interface HomeProjectsItemProps {
  images: string;
  name: string;
  goal_amount: string;
  amount_received: number;
  donor_count: string;
  max_donors: string;
  risk: string;
  start_date: string;
  end_date: string;
  success_status: string;
  alias: string;
  extra: TExtra[];
}

export const HomeProjectsItem = ({
  images,
  name,
  goal_amount,
  amount_received,
  donor_count,
  max_donors,
  start_date,
  end_date,
  success_status,
  alias,
  extra,
}: HomeProjectsItemProps) => {
  const { t } = useTranslation("home");
  const { colorMode } = useColorMode();
  const { ref, inView } = useInView({
    threshold: 0.95,
    delay: 100,
  });

  const start = new Date(start_date).getTime() / 1000.0;
  const end = new Date(end_date).getTime() / 1000.0;
  const now = new Date().getTime() / 1000.0;
  const days = Math.floor((end - now) / 60 / 60 / 24);
  const years = new Date(end_date).getFullYear() - new Date().getFullYear();

  // speedometer: goal line
  const goal_amount_line = (177 / 100) * (100 / (Number(goal_amount) / amount_received));
  // speedometer: donor line
  const max_donors_value = Number(max_donors) < 1 || isFinite(Number(max_donors)) || isNaN(Number(max_donors)) ? 100 : Number(max_donors);
  const donor_count_line = Math.floor((177 / 100) * (100 / max_donors_value / Number(donor_count)));
  // speedometer: years line
  const days_passed = Math.floor((now - start) / 60 / 60 / 24);
  const years_line = (177 / 100) * (100 / (days / (days <= days_passed ? days : days_passed)));

  const interestRate = useGetRate(extra, "5");
  const interestRatePercent = Math.floor((12 * 100) / 14);
  const riskRate = useGetRate(extra, "3");

  return (
    <Box className={s.card} backgroundColor={colorMode === "dark" ? "brand.dark" : "brand.light"} color={colorMode === "dark" ? "brand.light" : "brand.dark"}>
      <Link to={`https://money4you.financial/projects/${alias}`}>
        <HomeProjectsItemBadge days={days} success_status={success_status} />
        <Box className={s.header}>
          <Box className={s.img_wrap}>
            <Image className={s.img_src} src={`https://money4you.financial/${images}`} />
          </Box>
          <Box className={s.img_desc}>
            <Text className={s.img_desc_interest}>
              {interestRate}%
              <Box as={"span"} className={s.interestLabel}>
                p.a
              </Box>
            </Text>
            <Text className={s.img_desc_label}>{t("PROJECTS.ITEM.INTEREST")}</Text>
            <Text className={s.img_desc_title}>{name}</Text>
          </Box>
        </Box>

        <Box className={s.panel} backgroundColor={colorMode === "dark" ? "brand.dark" : "brand.light"}>
          <HStack pos={"absolute"} w={{ base: "100%", sm: "90%" }} h={"100%"} align={"flex-end"} justify={"space-between"} zIndex={"2"}>
            <Box
              ref={ref}
              pos={"relative"}
              background={"linear-gradient(180deg, #ff8310 0%, #dae839 30%, #3a8538 100%)"}
              w={{ base: "20px", sm: "30px" }}
              h={"80%"}
              border={"none"}
              borderRadius={"md"}
              _after={{
                content: '""',
                pos: "absolute",
                left: "50%",
                bottom: `${inView ? riskRate : 0}%`,
                transform: "translateX(-50%)",
                w: "120%",
                h: "2px",
                backgroundColor: colorMode === "dark" ? "brand.light" : "brand.dark",
                transition: "all 750ms ease-in-out",
              }}>
              <Text
                pos={"absolute"}
                top={"50%"}
                left={"50%"}
                transform={"translate(-50%,-50%) rotate(-90deg)"}
                whiteSpace={"nowrap"}
                textTransform={"uppercase"}
                fontSize={"small"}
                fontWeight={"extrabold"}
                color={"brand.dark"}>
                {t("PROJECTS.ITEM.RISKS")}
              </Text>
              <Text
                pos={"absolute"}
                top={"2%"}
                left={"50%"}
                transform={"translateX(-50%)"}
                whiteSpace={"nowrap"}
                textTransform={"uppercase"}
                fontSize={"small"}
                fontWeight={"extrabold"}>
                {riskRate}
              </Text>
            </Box>
            <Box
              ref={ref}
              pos={"relative"}
              background={"linear-gradient(180deg, #3a8538 46.88%, #b8e8b6 100%)"}
              w={{ base: "20px", sm: "30px" }}
              h={"80%"}
              border={"none"}
              borderRadius={"md"}
              _after={{
                content: '""',
                pos: "absolute",
                left: "50%",
                bottom: `${inView ? interestRatePercent : 0}%`,
                transform: "translateX(-50%)",
                w: "120%",
                h: "2px",
                backgroundColor: colorMode === "dark" ? "brand.light" : "brand.dark",
                transition: "all 650ms ease-in-out",
              }}>
              <Text
                pos={"absolute"}
                top={"50%"}
                left={"50%"}
                transform={"translate(-50%,-50%) rotate(-90deg)"}
                whiteSpace={"nowrap"}
                textTransform={"uppercase"}
                fontSize={"small"}
                fontWeight={"extrabold"}
                color={"brand.dark"}>
                {t("PROJECTS.ITEM.INTEREST")}
              </Text>
              <Text
                pos={"absolute"}
                top={"2%"}
                left={"50%"}
                transform={"translateX(-50%)"}
                whiteSpace={"nowrap"}
                textTransform={"uppercase"}
                fontSize={"small"}
                fontWeight={"extrabold"}>
                {interestRate}%
              </Text>
            </Box>
          </HStack>

          <Box width={"fit-content"} pos={"relative"} m={"0 auto"}>
            <HStack justify={"space-between"} pos={"absolute"} top={"-5px"} width={"100%"}>
              <FaPowerOff style={{ backgroundColor: "#81AF80", color: "#f2f2f2", padding: "5px", fontSize: "28px", border: "none", borderRadius: "100%" }} />
              <FaFlagCheckered
                style={{ backgroundColor: "#3A8538", color: "#f2f2f2", padding: "5px", fontSize: "28px", border: "none", borderRadius: "100%" }}
              />
            </HStack>
            <Box
              ref={ref}
              _after={{
                content: "''",
                pos: "absolute",
                bottom: "0",
                left: "0",
                transform: `${inView ? `rotate(${goal_amount_line}deg)` : "rotate(0deg)"}`,
                transition: "all 750ms ease-in-out",
                w: "100%",
                h: "2px",
                bg:
                  colorMode === "dark"
                    ? "linear-gradient(90deg, #f2f2f2 10%, #242424 30%, #242424 100%)"
                    : "linear-gradient(90deg, #242424 10%, #f2f2f2 30%, #f2f2f2 100%)",
              }}>
              <HomeProjectsLevel />
            </Box>
            <Text pos={"absolute"} bottom={"-20px"} left={"50%"} transform={"translateX(-50%)"} whiteSpace={"nowrap"}>
              {amount_received} Mio.
            </Text>
          </Box>

          <HStack align={"center"} justify={"center"} width={{ base: "80%", sm: "auto" }}>
            <Box width={"fit-content"} pos={"relative"}>
              <HStack justify={"space-between"} pos={"absolute"} top={"-5px"} left={"-15px"} width={"100%"}>
                <FaUsers style={{ backgroundColor: "#088FD7", color: "#f2f2f2", padding: "5px", fontSize: "28px", border: "none", borderRadius: "100%" }} />
              </HStack>
              <Box
                ref={ref}
                _after={{
                  content: "''",
                  pos: "absolute",
                  bottom: "0",
                  left: "0",
                  transform: `${inView ? `rotate(${donor_count_line}deg)` : "rotate(0deg)"}`,
                  transition: "all 750ms ease-in-out",
                  w: "100%",
                  h: "2px",
                  bg:
                    colorMode === "dark"
                      ? "linear-gradient(90deg, #f2f2f2 20%, #242424 40%, #242424 100%)"
                      : "linear-gradient(90deg, #242424 20%, #f2f2f2 40%, #f2f2f2 100%)",
                }}>
                <HomeProjectsUsers />
              </Box>
              <Text pos={"absolute"} bottom={"-20px"} left={"50%"} transform={"translateX(-50%)"} whiteSpace={"nowrap"}>
                {donor_count}
              </Text>
            </Box>
            <Box width={"fit-content"} pos={"relative"}>
              <HStack justify={"flex-end"} pos={"absolute"} top={"-5px"} right={"-15px"} width={"100%"}>
                <FaHistory style={{ backgroundColor: "#BA3D5D", color: "#f2f2f2", padding: "5px", fontSize: "28px", border: "none", borderRadius: "100%" }} />
              </HStack>
              <Box
                ref={ref}
                _after={{
                  content: "''",
                  pos: "absolute",
                  bottom: "0",
                  left: "0",
                  transform: `${inView ? `rotate(${years_line}deg)` : "rotate(0deg)"}`,
                  transition: "all 750ms ease-in-out",
                  w: "100%",
                  h: "2px",
                  bg:
                    colorMode === "dark"
                      ? "linear-gradient(90deg, #f2f2f2 20%, #242424 40%, #242424 100%)"
                      : "linear-gradient(90deg, #242424 20%, #f2f2f2 40%, #f2f2f2 100%)",
                }}>
                <HomeProjectsTime />
              </Box>
              <Text pos={"absolute"} bottom={"-20px"} left={"50%"} transform={"translateX(-50%)"} whiteSpace={"nowrap"}>
                {years > 1 ? t("PROJECTS.ITEM.YEARS", { years: years }) : days > 0 ? t("PROJECTS.ITEM.DAYS", { days: days }) : "0"}
              </Text>
            </Box>
          </HStack>
        </Box>
      </Link>
    </Box>
  );
};
