import { AxiosError } from "axios";
import { ErrorData } from "../Interfaces/ErrorData";
import * as Yup from "yup";
import { SunScale } from "../Interfaces/SunExposureDto";
import sunIcon from "../Assets/Sun.svg";
import shadeIcon from "../Assets/Shade.svg";
import darknessIcon from "../Assets/Darkness.svg";
import penumbraIcon from "../Assets/Penumbra.svg";
import { StandardTaskTypeEnum } from "../Interfaces/PlantActiveTask";

export const getErrorMessages = (e: unknown) => {
  const errorMessages: string[] = [];
  const error: AxiosError = e as AxiosError;
  const data = error.response?.data;
  if (!data) {
    errorMessages.push("Wystąpił błąd");
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

export const selectSunScaleIcon = (sunScale: SunScale) => {
  switch (sunScale) {
    case "None": {
      return darknessIcon;
    }
    case "Low": {
      return shadeIcon;
    }
    case "Medium": {
      return penumbraIcon;
    }
    case "High": {
      return sunIcon;
    }
    default: {
      return "";
    }
  }
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

export const yupAddPlantValidationShape = {
  name: Yup.string()
    .max(30, "Imię może mieć maksymalnie 30 znaków ")
    .required("Imię jest wymagane"),
  potHeight: Yup.number()
    .min(0, "Wartość pola nie może być mniejsza od 0")
    .max(1000, "Wartośc pola musi być mniejsza od 1000"),

  potWidth: Yup.number()
    .min(0, "Wartość pola nie może być mniejsza od 0")
    .max(1000, "Wartośc pola musi być mniejsza od 1000"),

  plantHeight: Yup.number()
    .min(0, "Wartość pola nie może być mniejsza od 0")
    .max(5000, "Wartośc pola musi być mniejsza od 1000"),

  additionalDescription: Yup.string().max(
    300,
    "Opis może mieć maksymalnie 300 znaków "
  ),
};

export const translateSunScaleValue = (values: SunScale[] | null) => {
  const results: string[] = [];

  if (!values) {
    return [];
  }

  values.forEach((value) => {
    switch (value) {
      case "None": {
        results.push("Ciemne");
        break;
      }
      case "Low": {
        results.push("Cień");
        break;
      }
      case "Medium": {
        results.push("Półcień");
        break;
      }
      case "High": {
        results.push("Pełne słońce");
        break;
      }
      default: {
        break;
      }
    }
  });
  return results;
};

export const translateActionType = (actionType: StandardTaskTypeEnum) => {
  switch (StandardTaskTypeEnum[actionType] as unknown as number) {
    case StandardTaskTypeEnum.Water: {
      return "Podlewanie";
    }
    case StandardTaskTypeEnum.Fertilize: {
      return "Nawożenie";
    }
    case StandardTaskTypeEnum.Cut: {
      return "Przycinanie";
    }
    case StandardTaskTypeEnum.Mist: {
      return "Nawilżanie";
    }
    case StandardTaskTypeEnum.Replant: {
      return "Przesadzanie";
    }
    default: {
      return "Inna";
    }
  }
};

export const convertIndicatorText = (daysLeft: number) => {
  const absoluteValue = Math.abs(daysLeft);

  if (absoluteValue === 1) {
    return "Dzień";
  } else {
    return "Dni";
  }
};
