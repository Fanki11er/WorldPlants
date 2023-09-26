import { Formik, FormikErrors } from "formik";

import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import {
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
import { ActionButton, RedActionButton } from "../../Atoms/Buttons/Buttons";
import { FormSuccess } from "../../Atoms/FormSuccess/FormSuccess";

interface Props {
  taskType: StandardTaskTypeEnum;
}

interface FormValues {
  interval: number;
  actionDate: string;
  partOfTheDay: string;
}

const PlantStandardTaskScheduleForm = (props: Props) => {
  const { taskType } = props;
  const { plantId } = useParams();
  const { getStandardTask, setTask, deletePlantTask } = apiEndpoints;
  const axiosPrivate = useAxiosPrivate();
  const { data, isLoading, error } = useQuery<PlantActiveTask>(
    [STANDARD_PLANT_TASKS, plantId, taskType],
    async () => {
      const result = await axiosPrivate.get(getStandardTask(plantId, taskType));
      return result.data;
    },
    {
      cacheTime: Infinity,
      staleTime: Infinity,
    }
  );

  const {
    mutate: updateTask,
    isSuccess: isUpdated,
    error: updateError,
    isLoading: updatingInProgress,
  } = useMutation({
    mutationFn: (value: PlantActiveTask) => {
      return axiosPrivate.post(setTask, value);
    },
    onSuccess: async () => {
      await client.invalidateQueries([STANDARD_PLANT_TASKS, plantId, taskType]);
      await client.invalidateQueries([ALL_PLANT_TASKS, plantId]);
    },
  });

  const {
    mutate: deleteTask,
    isSuccess: isDeleted,
    error: deleteError,
    isLoading: deletingInProgress,
  } = useMutation({
    mutationFn: (taskId: string) => {
      return axiosPrivate.delete(deletePlantTask(taskId));
    },
    onSuccess: async () => {
      await client.invalidateQueries([STANDARD_PLANT_TASKS, plantId, taskType]);
      await client.invalidateQueries([ALL_PLANT_TASKS, plantId]);
    },
  });
  const client = useQueryClient();

  const formatDate = (date: string, divideBy: string) => {
    const divided = date.split(divideBy);
    const reversed = divided.reverse();
    const result = reversed.join("-");
    return result;
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
            actionDate: data.actionDate ? formatDate(data.actionDate, ".") : "",
            partOfTheDay: (data && data.partOfTheDay) || "",
          }}
          onSubmit={async (values: FormValues, { setSubmitting }) => {
            setSubmitting(true);

            const newTask: PlantActiveTask = {
              id: data ? data.id : "",
              interval: values.interval,
              actionDate: values.actionDate,
              partOfTheDay: values.partOfTheDay,
              plantId: data ? data.plantId : plantId || "",
              description: data ? data.description : "",
              actionType: data ? data.actionType : taskType.toString(),
            };

            updateTask(newTask, {
              onSuccess: async () => {
                await client.invalidateQueries([
                  STANDARD_PLANT_TASKS,
                  plantId,
                  taskType,
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

            return errors;
          }}
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
                {!isLoading &&
                  !updatingInProgress &&
                  !Object.entries(errors).length && (
                    <ActionButton type="submit">Ustaw</ActionButton>
                  )}
                {data.actionDate && (
                  <RedActionButton type="button" onClick={handleDeleteTask}>
                    Usuń
                  </RedActionButton>
                )}
              </FormRowWrapper>
              <FormRowWrapper>
                {isUpdated && !isDeleted && (
                  <FormSuccess>Zapisano zmiany</FormSuccess>
                )}
                {!isUpdated && isDeleted && <FormSuccess>Usunięto</FormSuccess>}
                {(updatingInProgress || deletingInProgress) && (
                  <ActionButton>Zapisywanie</ActionButton>
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
