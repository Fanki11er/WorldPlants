import { Formik, FormikErrors } from "formik";

import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import {
  ButtonsWrapper,
  FormRowWrapper,
  PlantStandardTaskScheduleFormWrapper,
} from "./PlantStandardTaskScheduleForm.styles";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { apiEndpoints } from "../../../Api/endpoints";
import { useParams } from "react-router-dom";
import {
  PlantActiveTask,
  StandardTaskTypeEnum,
} from "../../../Interfaces/PlantActiveTask";
import {
  ALL_PLANT_TASKS,
  STANDARD_PLANT_TASKS,
} from "../../../Constants/Constants";
import FormNumberField from "../FormNumberField/FormNumberField";
import FormRequestError from "../FormRequestError/FormRequestError";
import { getErrorMessages } from "../../../Utils/Utils";
import { LoadingIndicator } from "../../Atoms/LoadingIndicator/LoadingIndicator.styles";
import DateFormField from "../DateFormField/DateFormField";
import SelectFormField from "../SelectFormField/SelectFormField";
import { RemoveButton, SetButton } from "../../Atoms/Buttons/Buttons";
import { FormSuccess } from "../../Atoms/FormSuccess/FormSuccess";
import { useState } from "react";
const mode = import.meta.env.MODE;

interface Props {
  taskId: StandardTaskTypeEnum;
}

interface FormValues {
  interval: number;
  actionDate: string;
  partOfTheDay: string;
}

const PlantStandardTaskScheduleForm = (props: Props) => {
  const { taskId } = props;
  const { plantId } = useParams();
  const [successMessage, setSuccessMassage] = useState<string>("");
  const [changes, setChanges] = useState(false);
  const { getStandardTask, setTask, deletePlantTask } = apiEndpoints;
  const axiosPrivate = useAxiosPrivate();
  const { data, isLoading, error } = useQuery<PlantActiveTask>(
    [STANDARD_PLANT_TASKS, plantId, taskId],
    async () => {
      const result = await axiosPrivate.get(getStandardTask(plantId, taskId));
      return result.data;
    },
    {
      cacheTime: Infinity,
      staleTime: Infinity,
    }
  );

  const {
    mutate: updateTask,
    error: updateError,
    isLoading: updatingInProgress,
  } = useMutation({
    mutationFn: (value: PlantActiveTask) => {
      setSuccessMassage("");
      return axiosPrivate.post(setTask, value);
    },
    onSuccess: async () => {
      await client.invalidateQueries([STANDARD_PLANT_TASKS, plantId, taskId]);
      await client.invalidateQueries([ALL_PLANT_TASKS, plantId]);
      setSuccessMassage("Zapisano zmiany");
    },
  });

  const {
    mutate: deleteTask,
    error: deleteError,
    isLoading: deletingInProgress,
  } = useMutation({
    mutationFn: (taskId: string) => {
      setSuccessMassage("");
      return axiosPrivate.delete(deletePlantTask(taskId));
    },
    onSuccess: async () => {
      await client.invalidateQueries([STANDARD_PLANT_TASKS, plantId, taskId]);
      await client.invalidateQueries([ALL_PLANT_TASKS, plantId]);
      setSuccessMassage("Usunięto");
    },
  });
  const client = useQueryClient();

  const formatDate = (date: string) => {
    if (!date) {
      return date;
    }

    const separator = detectSeparator(date);
    let divided = date.split(separator);

    if (!divided.length) {
      return date;
    }

    if (divided[0].length !== 4) {
      divided = divided.reverse();
    }

    if (mode === "production") {
      return `${divided[0]}-${fillToTwoCharacters(
        divided[2]
      )}-${fillToTwoCharacters(divided[1])}`;
    }

    return `${divided[0]}-${fillToTwoCharacters(
      divided[1]
    )}-${fillToTwoCharacters(divided[2])}`;
  };

  const detectSeparator = (date: string) => {
    if (date.includes("/")) {
      return "/";
    } else if (date.includes(".")) {
      return ".";
    } else {
      return "-";
    }
  };

  const fillToTwoCharacters = (value: string) => {
    if (value.length === 1) {
      return `0${value}`;
    }
    return value;
  };

  const handleDeleteTask = () => {
    data && data.id && deleteTask(data.id);
  };

  return (
    <>
      {data ? (
        <Formik
          enableReinitialize
          initialValues={{
            interval: data.interval || 0,
            actionDate: data.actionDate ? formatDate(data.actionDate) : "",
            partOfTheDay: (data && data.partOfTheDay) || "",
          }}
          onSubmit={async (
            values: FormValues,
            { setSubmitting, setTouched }
          ) => {
            setSubmitting(true);
            const newTask: PlantActiveTask = {
              id: data ? data.id : "",
              interval: values.interval || 0,
              actionDate: values.actionDate,
              partOfTheDay: values.partOfTheDay,
              plantId: data ? data.plantId : plantId || "",
              description: data ? data.description : "",
              actionTypeId: data ? data.actionTypeId : taskId,
              actionName: data ? data.actionName : StandardTaskTypeEnum[taskId],
            };

            updateTask(newTask, {
              onSuccess: async () => {
                await client.invalidateQueries([
                  STANDARD_PLANT_TASKS,
                  plantId,
                  taskId,
                ]);
                await client.invalidateQueries([ALL_PLANT_TASKS, plantId]);
              },
            });

            setSubmitting(false);
          }}
          validate={(values) => {
            const errors: FormikErrors<FormValues> = {};
            if (values.interval < 0) {
              errors.interval = "Interwał musi być większy od 0";
            }

            if (!values.actionDate) {
              errors.actionDate = "Wybierz datę";
            }
            if (!values.partOfTheDay) {
              errors.partOfTheDay = "Wybierz porę dnia";
            }
            if (
              values.interval === data.interval &&
              values.actionDate === formatDate(data.actionDate) &&
              values.partOfTheDay === data.partOfTheDay
            ) {
              setChanges(false);
            } else {
              setChanges(true);
            }

            return errors;
          }}
          validateOnMount
        >
          {({ errors }) => (
            <PlantStandardTaskScheduleFormWrapper noValidate>
              {error ? (
                <FormRequestError errorValues={getErrorMessages(error)} />
              ) : null}
              {updateError ? (
                <FormRequestError errorValues={getErrorMessages(updateError)} />
              ) : null}
              {deleteError ? (
                <FormRequestError errorValues={getErrorMessages(deleteError)} />
              ) : null}
              <FormRowWrapper>
                <FormNumberField
                  name={"interval"}
                  minValue={0}
                  label={"Interwał"}
                  scale="Dni"
                />
                <DateFormField
                  name={"actionDate"}
                  label={"Data następnego"}
                  isError={errors.actionDate}
                />
                <SelectFormField
                  name="partOfTheDay"
                  values={[
                    { value: "morning", label: "Rano" },
                    { value: "night", label: "Wieczorem" },
                  ]}
                  label="Pora dnia"
                  placeholder={"Wybierz porę dnia"}
                  isError={errors.partOfTheDay}
                />
              </FormRowWrapper>
              <FormRowWrapper>
                <ButtonsWrapper>
                  {!isLoading &&
                    !updatingInProgress &&
                    changes &&
                    !Object.entries(errors).length && (
                      <SetButton type="submit">Ustaw</SetButton>
                    )}
                  {data.actionDate && (
                    <RemoveButton type="button" onClick={handleDeleteTask}>
                      Usuń
                    </RemoveButton>
                  )}
                </ButtonsWrapper>
              </FormRowWrapper>
              <FormRowWrapper>
                {successMessage && !changes && (
                  <FormSuccess>{successMessage}</FormSuccess>
                )}

                {(updatingInProgress || deletingInProgress) && (
                  <LoadingIndicator />
                )}
              </FormRowWrapper>
            </PlantStandardTaskScheduleFormWrapper>
          )}
        </Formik>
      ) : (
        <LoadingIndicator />
      )}
    </>
  );
};

export default PlantStandardTaskScheduleForm;
