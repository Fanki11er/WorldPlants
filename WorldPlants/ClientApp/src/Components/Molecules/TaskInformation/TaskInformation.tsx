import { TaskBasicInformation } from "../../../Interfaces/TaskBasicInformation";
import { convertIndicatorText } from "../../../Utils/Utils";
import {
  TaskInformationIndicator,
  TaskInformationIndicatorInnerText,
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
        {taskInformation.daysLeft != 0 && (
          <TaskInformationIndicatorInnerText
            $status={taskInformation.daysLeft < 0 ? "Delayed" : "Future"}
          >
            {taskInformation.daysLeft < 0 ? "Po" : "Za"}
          </TaskInformationIndicatorInnerText>
        )}
        {taskInformation.daysLeft != 0 ? (
          <>
            <TaskInformationIndicatorNumber
              $status={taskInformation.daysLeft < 0 ? "Delayed" : "Future"}
            >
              {Math.abs(taskInformation.daysLeft)}
            </TaskInformationIndicatorNumber>
            <TaskInformationIndicatorInnerText
              $status={taskInformation.daysLeft < 0 ? "Delayed" : "Future"}
            >
              {convertIndicatorText(taskInformation.daysLeft)}
            </TaskInformationIndicatorInnerText>
          </>
        ) : (
          <TaskInformationIndicatorToday>Dziś</TaskInformationIndicatorToday>
        )}
      </TaskInformationIndicator>
      <TaskInformationTitle
        $status={taskInformation.daysLeft < 0 ? "Delayed" : "Future"}
      >
        {taskInformation.actionDescription}
      </TaskInformationTitle>
    </TaskInformationWrapper>
  );
};

export default TaskInformation;
