import { paths } from "../../../Router/paths";
import { SideMenuLink } from "../../Atoms/Buttons/Buttons";
import SideMenu from "../SideMenu/SideMenu";

const TasksViewSideMenu = () => {
  const { plantsTasks, plantTasksIncoming } = paths;
  return (
    <SideMenu>
      <SideMenuLink to={plantsTasks} end>
        Dzisiaj
      </SideMenuLink>
      <SideMenuLink to={plantTasksIncoming}>Nadchodzące</SideMenuLink>
    </SideMenu>
  );
};

export default TasksViewSideMenu;
