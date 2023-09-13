import { useMutation, useQuery, useQueryClient } from "react-query";
import { apiEndpoints } from "../../../Api/endpoints";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { TaskBasicInformation } from "../../../Interfaces/TaskBasicInformation";
import { getErrorMessages, translateActionType } from "../../../Utils/Utils";
import {
  PantTasksSectionTaskButtonsWrapper,
  PantTasksSectionTaskListItem,
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
  GreenStyledButton,
  OrangeStyledButton,
  YellowStyledButton,
} from "../../Atoms/Buttons/Buttons";

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

  const convertIndicatorText = (daysLeft: number) => {
    const absoluteValue = Math.abs(daysLeft);
    if (absoluteValue === 0) {
      return "Dzisiaj";
    } else if (absoluteValue === 1) {
      return `${absoluteValue} Dzień`;
    } else {
      return `${absoluteValue} Dni`;
    }
  };

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
              {convertIndicatorText(task.daysLeft)}
            </PlantTasksSectionTaskIndicator>
            <PlantTasksSectionTaskHeader>
              {translateActionType(task.actionType)}
            </PlantTasksSectionTaskHeader>
            {actionInProgress !== task.id && (
              <PantTasksSectionTaskButtonsWrapper>
                <YellowStyledButton
                  onClick={() =>
                    executeTaskMutation({
                      taskId: task.id,
                      endpoint: snoozeTask,
                    })
                  }
                >
                  Odłuż
                </YellowStyledButton>
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
            {actionInProgress === task.id && (
              <LoadingIndicator>Wykonuję akcję</LoadingIndicator>
            )}
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
      {isLoading && <LoadingIndicator>Ładuję...</LoadingIndicator>}
      {error ? (
        <FormRequestError errorValues={getErrorMessages(error)} />
      ) : null}
      {data && data.length > 0 ? (
        <PlantTasksSectionTasksList>
          {renderTasks(data)}
        </PlantTasksSectionTasksList>
      ) : (
        <NoListContentInfo
          informationHeaderText="Brak zadań"
          informationText="Tu będą widoczne zaplanowane zadania"
        />
      )}
    </PlantTasksSectionWrapper>
  );
};

export default PlantTasksSection;
