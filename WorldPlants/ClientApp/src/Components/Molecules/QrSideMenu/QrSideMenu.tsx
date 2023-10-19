import { useNavigate } from "react-router-dom";
import { paths } from "../../../Router/paths";
import SideMenu from "../SideMenu/SideMenu";
import { ReturnButton, SideMenuLink } from "../../Atoms/Buttons/Buttons";

const QrSideMenu = () => {
  const { qrPrints } = paths;
  const navigate = useNavigate();
  return (
    <SideMenu>
      <SideMenuLink to={""} end>
        Skaner
      </SideMenuLink>
      <SideMenuLink to={qrPrints}>Druk</SideMenuLink>
      <ReturnButton
        onClick={() => {
          navigate(-1);
        }}
      >
        Powrót
      </ReturnButton>
    </SideMenu>
  );
};

export default QrSideMenu;
