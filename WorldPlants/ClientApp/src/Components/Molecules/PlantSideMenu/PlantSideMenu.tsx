import { useLocation, useNavigate } from "react-router-dom";
import { paths } from "../../../Router/paths";
import SideMenu from "../SideMenu/SideMenu";
import { SideMenuLink, ReturnButton } from "../../Atoms/Buttons/Buttons";

const PlantSideMenu = () => {
  const { authorized, userSites, userSite } = paths;
  const navigate = useNavigate();
  const { state } = useLocation();
  const from = state?.from?.siteId;
  const {
    selectedPlantSchedule,
    selectedPlantTasksHistory,
    selectedPlantDetails,
    selectedPlantMove,
    selectedPlantSettings,
    selectedPlantDelete,
    selectedPlantNotes,
  } = paths;
  return (
    <SideMenu>
      <SideMenuLink to={""} end>
        Zadania
      </SideMenuLink>
      <SideMenuLink to={selectedPlantSchedule}>Harmonogram</SideMenuLink>
      <SideMenuLink to={selectedPlantNotes} end>
        Notatki
      </SideMenuLink>
      <SideMenuLink to={selectedPlantTasksHistory}>Historia akcji</SideMenuLink>
      <SideMenuLink to={selectedPlantDetails}>Szczegóły</SideMenuLink>
      <SideMenuLink to={selectedPlantMove}>Przenieś</SideMenuLink>
      <SideMenuLink to={selectedPlantSettings}>Ustawienia</SideMenuLink>
      <SideMenuLink to={selectedPlantDelete}>Usuwanie</SideMenuLink>
      <ReturnButton
        onClick={() => {
          if (from) {
            navigate(`${authorized}/${userSite}/${from}`);
          } else {
            navigate(`${authorized}/${userSites}`);
          }
        }}
      >
        Powrót
      </ReturnButton>
    </SideMenu>
  );
};

export default PlantSideMenu;
