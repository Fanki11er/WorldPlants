import { useNavigate, useParams } from "react-router-dom";
import { paths } from "../../../Router/paths";
import { ReturnButton, SideMenuLink } from "../../Atoms/Buttons/Buttons";
import SideMenu from "../SideMenu/SideMenu";
import usePermissions from "../../../Hooks/usePermissions";

const SelectedUserSiteSideMenu = () => {
  const {
    userSiteSettings,
    userSites,
    authorized,
    userSiteDeleteSite,
    addPlant,
  } = paths;
  const { permissions } = usePermissions();
  const { siteId } = useParams();
  const navigate = useNavigate();
  return (
    <SideMenu>
      <SideMenuLink to={""} end>
        Rośliny
      </SideMenuLink>
      {permissions?.canAddPlants && (
        <SideMenuLink to={`${authorized}/${addPlant}/${siteId}`}>
          Dodaj Roślinę
        </SideMenuLink>
      )}
      {permissions?.canEditSites && (
        <SideMenuLink to={userSiteSettings}>Ustawienia</SideMenuLink>
      )}
      {permissions?.canRemoveSites && (
        <SideMenuLink to={userSiteDeleteSite}>Usuwanie</SideMenuLink>
      )}
      <ReturnButton onClick={() => navigate(`${authorized}/${userSites}`)}>
        Powrót
      </ReturnButton>
    </SideMenu>
  );
};

export default SelectedUserSiteSideMenu;
