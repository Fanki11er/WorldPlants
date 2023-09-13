import { TaskBasicInformation } from "../../../Interfaces/TaskBasicInformation";
import { translateActionType } from "../../../Utils/Utils";
import {
  TaskInformationIndicator,
  TaskInformationIndicatorNumber,
  TaskInformationIndicatorToday,
  TaskInformationTitle,
  TaskInformationWrapper,
} from "./TaskInformation.styles";
interface Props {
  taskInformation: TaskBasicInformation;
}

const TaskInformation = (props: Props) => {
  const { taskInformation } = props;

  return (
    <TaskInformationWrapper>
      <TaskInformationIndicator
        $status={taskInformation.daysLeft < 0 ? "Delayed" : "Future"}
      >
        {taskInformation.daysLeft != 0 ? (
          <TaskInformationIndicatorNumber
            $status={taskInformation.daysLeft < 0 ? "Delayed" : "Future"}
          >
            {Math.abs(taskInformation.daysLeft)}
          </TaskInformationIndicatorNumber>
        ) : (
          <TaskInformationIndicatorToday>Dziś</TaskInformationIndicatorToday>
        )}
      </TaskInformationIndicator>
      <TaskInformationTitle
        $status={taskInformation.daysLeft < 0 ? "Delayed" : "Future"}
      >
        {translateActionType(taskInformation.actionType)}
      </TaskInformationTitle>
    </TaskInformationWrapper>
  );
};

export default TaskInformation;
