import useTask from "../../../Hooks/useTask";
import { StandardTaskTypeEnum } from "../../../Interfaces/PlantActiveTask";
import { TaskBasicInformation } from "../../../Interfaces/TaskBasicInformation";
import { convertIndicatorText, getErrorMessages } from "../../../Utils/Utils";
import {
  BlueStyledButton,
  GreenStyledButton,
  OrangeStyledButton,
} from "../../Atoms/Buttons/Buttons";
import { FormSuccess } from "../../Atoms/FormSuccess/FormSuccess";
import { LoadingIndicator } from "../../Atoms/LoadingIndicator/LoadingIndicator.styles";
import FormRequestError from "../FormRequestError/FormRequestError";
import {
  PantTasksSectionTaskButtonsWrapper,
  PantTasksSectionTaskListItem,
  PlantTaskSectionTaskInformationIndicatorInnerText,
  PlantTaskSectionTaskInformationIndicatorNumber,
  PlantTasksSectionTaskHeader,
  PlantTasksSectionTaskIndicator,
  PlantTasksSectionTasksListWrapper,
} from "./PlantTasksList.styles";

interface Props {
  tasks: TaskBasicInformation[];
  plantId: string | undefined;
}

const PlantTasksList = (props: Props) => {
  const { tasks, plantId } = props;
  const {
    actionInProgress,
    actionError,
    actionSuccess,
    executeTaskMutation,
    executeTask,
    snoozeTask,
    skipTask,
  } = useTask(plantId);

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
    <PlantTasksSectionTasksListWrapper>
      {renderTasks(tasks)}
    </PlantTasksSectionTasksListWrapper>
  );
};

export default PlantTasksList;
