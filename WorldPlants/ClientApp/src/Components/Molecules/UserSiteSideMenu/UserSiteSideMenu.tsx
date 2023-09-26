import { paths } from "../../../Router/paths";
import { SideMenuLink } from "../../Atoms/Buttons/Buttons";
import SideMenu from "../SideMenu/SideMenu";

const UserSiteSideMenu = () => {
  const { userSitesAddNew } = paths;
  return (
    <SideMenu>
      <SideMenuLink to={""} end>
        Miejsca
      </SideMenuLink>
      <SideMenuLink to={userSitesAddNew} end>
        Dodaj nowe
      </SideMenuLink>
    </SideMenu>
  );
};

export default UserSiteSideMenu;
