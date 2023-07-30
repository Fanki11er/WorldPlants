import { AxiosError } from "axios";
import { ErrorData } from "../Interfaces/ErrorData";

export const getErrorMessages = (e: unknown) => {
  const errorMessages: string[] = [];
  const error: AxiosError = e as AxiosError;
  const data = error.response?.data;
  if (!data) {
    errorMessages.push(error.message);
    return errorMessages;
  }

  if (typeof data === "string") {
    errorMessages.push(data);
    return errorMessages;
  }

  const errorData = data as ErrorData;
  const errorValues = Object.values(errorData.errors).flat();
  errorValues.forEach((value) => {
    errorMessages.push(value);
  });

  return errorMessages;
};
