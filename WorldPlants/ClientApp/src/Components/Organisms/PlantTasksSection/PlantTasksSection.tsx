import { useMutation, useQuery, useQueryClient } from "react-query";
import { apiEndpoints } from "../../../Api/endpoints";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { TaskBasicInformation } from "../../../Interfaces/TaskBasicInformation";
import {
  convertIndicatorText,
  getErrorMessages,
  translateActionType,
} from "../../../Utils/Utils";
import {
  PantTasksSectionTaskButtonsWrapper,
  PantTasksSectionTaskListItem,
  PlantTaskSectionTaskInformationIndicatorInnerText,
  PlantTaskSectionTaskInformationIndicatorNumber,
  PlantTasksSectionTaskHeader,
  PlantTasksSectionTaskIndicator,
  PlantTasksSectionTasksList,
  PlantTasksSectionWrapper,
} from "./PlantTasksSection.styles";
import {
  ALL_PLANT_TASKS,
  STANDARD_PLANT_TASKS,
} from "../../../Constants/Constants";
import { useParams } from "react-router-dom";
import FormRequestError from "../../Molecules/FormRequestError/FormRequestError";
import { LoadingIndicator } from "../../Atoms/LoadingIndicator/LoadingIndicator.styles";
import NoListContentInfo from "../../Molecules/NoListContentInfo/NoListContentInfo";
import { useState } from "react";
import { StandardTaskTypeEnum } from "../../../Interfaces/PlantActiveTask";
import { FormSuccess } from "../../Atoms/FormSuccess/FormSuccess";
import {
  BlueStyledButton,
  GreenStyledButton,
  OrangeStyledButton,
} from "../../Atoms/Buttons/Buttons";
import GoToTop from "../../Molecules/GoToTop/GoToTop";

interface ActionErrorStatus {
  taskId: string;
  error: unknown;
}

interface Action {
  taskId: string;
  endpoint: (taskId: string) => string;
}

const PlantTasksSection = () => {
  const { getAllPlantTasks, snoozeTask, skipTask, executeTask } = apiEndpoints;
  const [actionInProgress, setActionInProgress] = useState("");
  const [actionError, setActionError] = useState<ActionErrorStatus | null>(
    null
  );
  const [actionSuccess, setActionSuccess] = useState("");
  const { plantId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const client = useQueryClient();
  const { isLoading, error, data } = useQuery<TaskBasicInformation[]>(
    [ALL_PLANT_TASKS, plantId],
    async () => {
      const result = await axiosPrivate.get(getAllPlantTasks(plantId));
      return result.data;
    },
    {
      enabled: !!plantId,
    }
  );

  const { mutate: executeTaskMutation } = useMutation({
    mutationFn: async (action: Action) => {
      setActionError(null);
      setActionSuccess("");
      setActionInProgress(action.taskId);
      const result = await axiosPrivate.post(action.endpoint(action.taskId));
      return result.data;
    },

    onSuccess: async (data: TaskBasicInformation | undefined) => {
      client.invalidateQueries([STANDARD_PLANT_TASKS, plantId]);
      client.invalidateQueries([ALL_PLANT_TASKS]);
      setActionSuccess(data?.id || "");
    },

    onError: async (error, action) => {
      setActionError({ taskId: action.taskId, error });
    },

    onSettled: () => {
      setActionInProgress("");
    },
  });

  const renderTasks = (tasks: TaskBasicInformation[]) => {
    return tasks
      .sort((itemA, itemB) => {
        return (
          (StandardTaskTypeEnum[itemA.actionType] as unknown as number) -
          (StandardTaskTypeEnum[itemB.actionType] as unknown as number)
        );
      })
      .map((task) => {
        return (
          <PantTasksSectionTaskListItem key={task.id}>
            <PlantTasksSectionTaskIndicator $isDelayed={task.daysLeft < 0}>
              {task.daysLeft !== 0 && (
                <PlantTaskSectionTaskInformationIndicatorInnerText
                  $isDelayed={task.daysLeft < 0}
                >
                  {task.daysLeft < 0 ? "Po" : "Za"}
                </PlantTaskSectionTaskInformationIndicatorInnerText>
              )}
              {task.daysLeft === 0 && (
                <PlantTaskSectionTaskInformationIndicatorNumber
                  $isDelayed={false}
                >
                  Dziś
                </PlantTaskSectionTaskInformationIndicatorNumber>
              )}
              {task.daysLeft !== 0 && (
                <PlantTaskSectionTaskInformationIndicatorNumber
                  $isDelayed={task.daysLeft < 0}
                >
                  {Math.abs(task.daysLeft)}
                </PlantTaskSectionTaskInformationIndicatorNumber>
              )}
              {task.daysLeft !== 0 && (
                <PlantTaskSectionTaskInformationIndicatorInnerText
                  $isDelayed={task.daysLeft < 0}
                >
                  {convertIndicatorText(task.daysLeft)}
                </PlantTaskSectionTaskInformationIndicatorInnerText>
              )}
            </PlantTasksSectionTaskIndicator>
            <PlantTasksSectionTaskHeader>
              {task.actionDescription}
            </PlantTasksSectionTaskHeader>
            {actionInProgress !== task.id && (
              <PantTasksSectionTaskButtonsWrapper>
                <BlueStyledButton
                  onClick={() =>
                    executeTaskMutation({
                      taskId: task.id,
                      endpoint: snoozeTask,
                    })
                  }
                >
                  Odłóż
                </BlueStyledButton>
                <OrangeStyledButton
                  onClick={() =>
                    executeTaskMutation({ taskId: task.id, endpoint: skipTask })
                  }
                >
                  Pomiń
                </OrangeStyledButton>
                <GreenStyledButton
                  onClick={() =>
                    executeTaskMutation({
                      taskId: task.id,
                      endpoint: executeTask,
                    })
                  }
                >
                  Wykonaj
                </GreenStyledButton>
              </PantTasksSectionTaskButtonsWrapper>
            )}
            {actionInProgress === task.id && <LoadingIndicator />}
            {actionSuccess === task.id && (
              <FormSuccess>Akcja wykonana</FormSuccess>
            )}
            {actionError && actionError.taskId === task.id && (
              <FormRequestError
                errorValues={getErrorMessages(actionError.error)}
              />
            )}
          </PantTasksSectionTaskListItem>
        );
      });
  };
  return (
    <PlantTasksSectionWrapper>
      <GoToTop />
      {isLoading && <LoadingIndicator />}
      {error ? (
        <FormRequestError errorValues={getErrorMessages(error)} />
      ) : null}
      {data && data.length > 0 && (
        <PlantTasksSectionTasksList>
          {renderTasks(data)}
        </PlantTasksSectionTasksList>
      )}
      {data && data.length == 0 && (
        <NoListContentInfo
          informationHeaderText="Brak zadań"
          informationText="Tu będą widoczne zaplanowane zadania"
        />
      )}
    </PlantTasksSectionWrapper>
  );
};

export default PlantTasksSection;
