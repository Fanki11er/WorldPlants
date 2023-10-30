import useAuth from "../../../Hooks/useAuth";
import useIsOnPath from "../../../Hooks/useIsOnPath";
import { paths } from "../../../Router/paths";
import { SideMenuLink } from "../../Atoms/Buttons/Buttons";
import { SideMenuLocationIndicator } from "../../Atoms/SideMenuLocationIndicator/SideMenuLocationIndicator.styles";
import SideMenu from "../SideMenu/SideMenu";

const UserSettingsSideMenu = () => {
  const {
    userSettingsGuestAccounts,
    userSettingsRegisterGuestAccount,
    userSettingsNotifications,
    userSettingsAccount,
    userSettingsSecurity,
    userSettingsDeleteAccount,
    customActionsEdit,
    customActions,
  } = paths;
  const isOnPath = useIsOnPath([customActionsEdit]);
  const { user } = useAuth();

  return (
    <SideMenu>
      <SideMenuLink to={userSettingsNotifications} end>
        Powiadomienia
      </SideMenuLink>
      {user?.accountType === "Owner" && (
        <SideMenuLink to={userSettingsGuestAccounts}>Konta gości</SideMenuLink>
      )}
      {user?.accountType === "Owner" && (
        <SideMenuLink to={userSettingsRegisterGuestAccount}>
          Nowe konto gościa
        </SideMenuLink>
      )}
      <SideMenuLink to={customActions}>Własne akcje</SideMenuLink>
      {isOnPath && (
        <SideMenuLocationIndicator>Edycja</SideMenuLocationIndicator>
      )}
      <SideMenuLink to={userSettingsAccount}>Konto</SideMenuLink>
      <SideMenuLink to={userSettingsSecurity}>Bezpieczeństwo</SideMenuLink>
      <SideMenuLink to={userSettingsDeleteAccount}>Usuwanie konta</SideMenuLink>
    </SideMenu>
  );
};

export default UserSettingsSideMenu;
