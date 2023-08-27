import { useNavigate, useParams } from "react-router-dom";
import { paths } from "../../../Router/paths";
import { ActionButton, SideMenuLink } from "../../Atoms/Buttons/Buttons";
import { SideMenuWrapper } from "../../Atoms/SideMenuWrapper/SideMenuWrapper.styles";

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
    <SideMenuWrapper>
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
    </SideMenuWrapper>
  );
};

export default SelectedUserSiteSideMenu;
