import { paths } from "../../../Router/paths";
import { SideMenuLink } from "../../Atoms/Buttons/Buttons";
import { SideMenuWrapper } from "../../Atoms/SideMenuWrapper/SideMenuWrapper.styles";

const UserSiteSideMenu = () => {
  const { userSitesAddNew } = paths;
  return (
    <SideMenuWrapper>
      <SideMenuLink to={""} end>
        Miejsca
      </SideMenuLink>
      <SideMenuLink to={userSitesAddNew} end>
        Dodaj nowe
      </SideMenuLink>
    </SideMenuWrapper>
  );
};

export default UserSiteSideMenu;
