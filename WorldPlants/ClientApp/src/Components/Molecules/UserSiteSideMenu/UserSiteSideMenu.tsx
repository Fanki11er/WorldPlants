import useAuth from "../../../Hooks/useAuth";
import usePermissions from "../../../Hooks/usePermissions";
import { paths } from "../../../Router/paths";
import { SideMenuLink } from "../../Atoms/Buttons/Buttons";
import SideMenu from "../SideMenu/SideMenu";

const UserSiteSideMenu = () => {
  const { userSitesAddNew } = paths;
  const { permissions } = usePermissions();

  return (
    <SideMenu>
      <SideMenuLink to={""} end>
        Miejsca
      </SideMenuLink>
      {permissions?.canAddSites && (
        <SideMenuLink to={userSitesAddNew} end>
          Dodaj nowe
        </SideMenuLink>
      )}
    </SideMenu>
  );
};

export default UserSiteSideMenu;
