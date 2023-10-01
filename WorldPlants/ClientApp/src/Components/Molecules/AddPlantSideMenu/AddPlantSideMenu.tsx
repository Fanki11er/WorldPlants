import { useLocation, useNavigate } from "react-router-dom";
import { paths } from "../../../Router/paths";
import { ActionButton, SideMenuLink } from "../../Atoms/Buttons/Buttons";
import SideMenu from "../SideMenu/SideMenu";

const AddPlantSideMenu = () => {
  const { authorized, userSites, userSite } = paths;
  const navigate = useNavigate();
  const { state } = useLocation();
  const from = state?.from?.siteId;
  const { addPlantRecognize } = paths;
  return (
    <SideMenu>
      <SideMenuLink to={""} end>
        Znajdź
      </SideMenuLink>
      <SideMenuLink to={addPlantRecognize}>Rozpoznaj</SideMenuLink>
      <ActionButton
        onClick={() => {
          if (from) {
            navigate(`${authorized}/${userSite}/${from}`);
          } else {
            navigate(-1);
          }
        }}
      >
        Powrót
      </ActionButton>
    </SideMenu>
  );
};

export default AddPlantSideMenu;
