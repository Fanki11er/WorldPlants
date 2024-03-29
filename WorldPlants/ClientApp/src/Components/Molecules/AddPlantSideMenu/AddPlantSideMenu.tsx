import { useLocation, useNavigate } from "react-router-dom";
import { paths } from "../../../Router/paths";
import { ReturnButton, SideMenuLink } from "../../Atoms/Buttons/Buttons";
import SideMenu from "../SideMenu/SideMenu";

const AddPlantSideMenu = () => {
  const { authorized, userSite, addPlantRecognize, addCustomPlant } = paths;
  const navigate = useNavigate();
  const { state } = useLocation();
  const from = state?.from?.siteId;

  return (
    <SideMenu>
      <SideMenuLink to={""} end>
        Znajdź
      </SideMenuLink>
      <SideMenuLink to={addPlantRecognize}>Rozpoznaj</SideMenuLink>
      <SideMenuLink to={addCustomPlant}>Dodaj własną</SideMenuLink>
      <ReturnButton
        onClick={() => {
          if (from) {
            navigate(`${authorized}/${userSite}/${from}`);
          } else {
            navigate(-1);
          }
        }}
      >
        Powrót
      </ReturnButton>
    </SideMenu>
  );
};

export default AddPlantSideMenu;
