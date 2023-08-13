import TasksList from "../../Components/Organisms/TasksList/TasksList";
import { TasksWrapper } from "./TasksView.styles";

const TasksView = () => {
  return (
    <TasksWrapper>
      <TasksList />
    </TasksWrapper>
  );
};

export default TasksView;
