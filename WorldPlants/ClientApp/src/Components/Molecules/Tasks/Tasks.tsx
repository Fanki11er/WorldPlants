import {
  HeaderAndImgWrapper,
  HeaderTask,
  ImgTask,
  TasksWrapper,
} from "./Tasks.styles";
import ImgTasksToDo from "../../../Assets/TaskForToday.svg";
import ImgUpcomingTask from "../../../Assets/UpcomingTasks.svg";
import TargetTasks from "../TargetTasks/TargetTasks";
import {
  HeaderPlant,
  HeaderSpace,
  HeaderWrapper,
  ImgAndHeaderWrapper,
  ImgPlant,
  ImgTree,
  TargetTasksWrapper,
} from "../TargetTasks/TargetTasks.styles";
import { TaskListWrapper } from "../../Organisms/TasksList/TasksList.styles";

const Tasks = () => {
  return (
    <TaskListWrapper>
      <TasksWrapper>
        <HeaderAndImgWrapper>
          <ImgTask src={ImgTasksToDo} alt="ImgTaskTodo" />
          <HeaderTask>Zadania na dziś</HeaderTask>
        </HeaderAndImgWrapper>
        <TargetTasks />
      </TasksWrapper>
      <TasksWrapper>
        <HeaderAndImgWrapper>
          <ImgTask src={ImgUpcomingTask} alt="ImgUpcomingTask" />
          <HeaderTask>Nadchodzące zadania</HeaderTask>
        </HeaderAndImgWrapper>
        <TargetTasks />
      </TasksWrapper>
    </TaskListWrapper>
  );
};

export default Tasks;
