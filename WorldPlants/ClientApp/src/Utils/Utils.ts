import { AxiosError } from "axios";
import { ErrorData } from "../Interfaces/ErrorData";
import * as Yup from "yup";

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


export const yupRegistrationValidationShape = {
  name: Yup.string()
    .min(2, "Imię musi zawierać minimum 2 znaki")
    .max(30, "Imię może mieć maksymalnie 30 znaków ")
    .required("Imię jest wymagane"),
  password: Yup.string()
    .min(8, "Hasło musi się składać z minimum 8 znaków")
    .required("Hasło jest wymagane"),
  repeatedPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Hasła muszą być takie same")
    .required("Hasło jest wymagane"),
  email: Yup.string()
    .email("Nie prawidłowy format adresu email")
    .required("Email jest wymagany"),
  phoneNumber: Yup.string().matches(
    /^\d{9}$/,
    "Nie prawidłowy format numeru telefonu"
  ),
};

export const yupAccountSettingsValidationShape = {
  name: Yup.string()
    .min(2, "Imię musi zawierać minimum 2 znaki")
    .max(30, "Imię może mieć maksymalnie 30 znaków ")
    .required("Imię jest wymagane"),
  email: Yup.string()
    .email("Nie prawidłowy format adresu email")
    .required("Email jest wymagany"),
  phoneNumber:
    Yup.string().matches(/^\d{9}$/, "Nie prawidłowy format numeru telefonu") ||
    Yup.string().length(0, "Nie prawidłowy format numeru telefonu"),
};

export const yupSecuritySettingsValidationShape = {
  newPassword: Yup.string()
    .min(8, "Hasło musi się składać z minimum 8 znaków")
    .required("Hasło jest wymagane"),
  newRepeatedPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Hasła muszą być takie same")
    .required("Hasło jest wymagane"),
};
