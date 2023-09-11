import { useLocation, useNavigate } from "react-router-dom";
import { paths } from "../../../Router/paths";
import SideMenu from "../SideMenu/SideMenu";
import { ActionButton, SideMenuLink } from "../../Atoms/Buttons/Buttons";

const PlantSideMenu = () => {
  const { authorized, userSites, userSite } = paths;
  const navigate = useNavigate();
  const { state } = useLocation();
  const from = state?.from?.siteId;
  const { selectedPlantSchedule } = paths;
  return (
    <SideMenu>
      <SideMenuLink to={""} end>
        Zadania
      </SideMenuLink>
      <SideMenuLink to={selectedPlantSchedule}>Harmonogram</SideMenuLink>
      <ActionButton
        onClick={() => {
          if (from) {
            navigate(`${authorized}/${userSite}/${from}`);
          } else {
            navigate(`${authorized}/${userSites}`);
          }
        }}
      >
        Powrót
      </ActionButton>
    </SideMenu>
  );
};

export default PlantSideMenu;
