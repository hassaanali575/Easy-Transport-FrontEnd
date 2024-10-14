import {createStandaloneToast} from "@chakra-ui/react";

const toast = createStandaloneToast();

export const errorNotification = (
  title,
  description,
  position = "top",
  duration = 3000
) =>
  toast({
    title: title,
    description: description,
    status: "error",
    duration,
    isClosable: true,
    position,
  });

export const successNotification = (
  title,
  description,
  position = "top",
  duration = 3000
) =>
  toast({
    title: title,
    description: description,
    status: "success",
    duration,
    position,
    isClosable: true,
  });
export const warningNotification = (
  title,
  description,
  position = "top",
  duration = 3000
) =>
  toast({
    title: title,
    description: description,
    status: "warning",
    duration,
    position,
    isClosable: true,
  });

export const infoNotification = (
  title,
  description,
  position = "top",
  duration = 3000
) =>
  toast({
    title: title,
    description: description,
    status: "info",
    duration,
    position,
    isClosable: true,
  });
