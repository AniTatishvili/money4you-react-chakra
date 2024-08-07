import { useUsersByRoleMutation } from "app/providers/store/api/dashboard";
import React, { useEffect } from "react";

import { Flex } from "@chakra-ui/react";
import { ErrorField, PSpinner } from "shared/ui";
import { PressSpeakerDashboardJournalist } from "./press-speaker-dashboard-journalist";

import { TJournalist } from "shared/types";

export const PressSpeakerDashboardJournalistList = () => {
  const [getUsersByRole, { data, isLoading, isError }] = useUsersByRoleMutation();

  useEffect(() => {
    const fd = new FormData();
    fd.append("role", "8");

    getUsersByRole(fd);
  }, []);

  const journalists = data?.data;
  console.log("@@@journalists:", journalists);

  if (isLoading)
    return (
      <Flex justify={"center"} align={"center"} w={"100%"} h={"100%"}>
        <PSpinner />
      </Flex>
    );

  if (isError) return <ErrorField />;

  if (!journalists) return;

  if (journalists?.length < 1)
    return (
      <Flex flexDir={"column"} h={"100%"} w={"100%"}>
        Journalist list is empty
      </Flex>
    );

  return (
    <Flex flexDir={"column"}>
      {journalists.map((journalist: TJournalist) => (
        <Flex key={journalist.id}>
          <PressSpeakerDashboardJournalist jdata={journalist} />
        </Flex>
      ))}
    </Flex>
  );
};
