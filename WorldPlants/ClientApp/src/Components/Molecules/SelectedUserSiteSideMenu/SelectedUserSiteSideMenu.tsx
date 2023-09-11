import { useNavigate, useParams } from "react-router-dom";
import { paths } from "../../../Router/paths";
import { ActionButton, SideMenuLink } from "../../Atoms/Buttons/Buttons";
import SideMenu from "../SideMenu/SideMenu";

const SelectedUserSiteSideMenu = () => {
  const {
    userSiteSettings,
    userSites,
    authorized,
    userSiteDeleteSite,
    addPlant,
  } = paths;
  const { siteId } = useParams();
  const navigate = useNavigate();
  return (
    <SideMenu>
      <SideMenuLink to={""} end>
        Rośliny
      </SideMenuLink>
      <SideMenuLink to={`${authorized}/${addPlant}/${siteId}`}>
        Dodaj Roślinę
      </SideMenuLink>
      <SideMenuLink to={userSiteSettings}>Ustawienia</SideMenuLink>
      <SideMenuLink to={userSiteDeleteSite}>Usuwanie</SideMenuLink>
      <ActionButton onClick={() => navigate(`${authorized}/${userSites}`)}>
        Powrót
      </ActionButton>
    </SideMenu>
  );
};

export default SelectedUserSiteSideMenu;
