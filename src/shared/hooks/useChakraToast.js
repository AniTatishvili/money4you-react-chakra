import { useToast } from "@chakra-ui/react";

export const useChakraToast = () => {
  const toast = useToast();
  const message = (status, msg, title) =>
    toast({
      position: "top",
      title: title || "Notification",
      description: msg,
      status: status,
      duration: 3500,
      isClosable: true,
    });
  return message;
};
