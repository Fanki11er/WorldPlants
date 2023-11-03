import { useLocation, useNavigate } from "react-router-dom";
import { paths } from "../../../Router/paths";
import SideMenu from "../SideMenu/SideMenu";
import { SideMenuLink, ReturnButton } from "../../Atoms/Buttons/Buttons";
import usePermissions from "../../../Hooks/usePermissions";
import { SideMenuLocationIndicator } from "../../Atoms/SideMenuLocationIndicator/SideMenuLocationIndicator.styles";
import useIsOnPath from "../../../Hooks/useIsOnPath";

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
    selectedPlanEditNote,
  } = paths;
  const { permissions } = usePermissions();
  const isOnPath = useIsOnPath([selectedPlanEditNote]);

  return (
    <SideMenu>
      <SideMenuLink to={""} end>
        Zadania
      </SideMenuLink>
      <SideMenuLink to={selectedPlantSchedule}>Harmonogram</SideMenuLink>
      <SideMenuLink to={selectedPlantNotes} end>
        Notatki
      </SideMenuLink>
      {isOnPath && (
        <SideMenuLocationIndicator>Edycja</SideMenuLocationIndicator>
      )}
      <SideMenuLink to={selectedPlantTasksHistory}>Historia akcji</SideMenuLink>
      <SideMenuLink to={selectedPlantDetails}>Szczegóły</SideMenuLink>
      {permissions?.canMovePlants && (
        <SideMenuLink to={selectedPlantMove}>Przenieś</SideMenuLink>
      )}
      {permissions?.canEditPlants && (
        <SideMenuLink to={selectedPlantSettings}>Ustawienia</SideMenuLink>
      )}
      {permissions?.canRemovePlants && (
        <SideMenuLink to={selectedPlantDelete}>Usuwanie</SideMenuLink>
      )}
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
