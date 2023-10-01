import { Outlet } from "react-router-dom";
import { ViewWrapper } from "../../Components/Atoms/ViewWrapper/ViewWrapper";
import TasksViewSideMenu from "../../Components/Molecules/TasksViewSideMenu/TasksViewSideMenu";
import { AuthorizedViewWrapper } from "../../Components/Atoms/AuthorizedViewWrapper/AuthorizedViewWrapper.styles";

const PlantsTasksView = () => {
  return (
    <AuthorizedViewWrapper>
      <TasksViewSideMenu />
      <Outlet />
    </AuthorizedViewWrapper>
  );
};

export default PlantsTasksView;
