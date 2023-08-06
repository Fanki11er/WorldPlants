import useAuth from "../../../Hooks/useAuth";
import { paths } from "../../../Router/paths";
import { SideMenuLink } from "../../Atoms/Buttons/Buttons";

import { UserSettingsSideMenuWrapper } from "./UserSettingsSideMenu.styles";

const UserSettingsSideMenu = () => {
  const {
    userSettingsGuestAccounts,
    userSettingsRegisterGuestAccount,
    userSettingsNotifications,
    userSettingsAccount,
    userSettingsSecurity,
    userSettingsDeleteAccount,
  } = paths;
  const { user } = useAuth();
  return (
    <UserSettingsSideMenuWrapper>
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
      <SideMenuLink to={userSettingsAccount}>Konto</SideMenuLink>
      <SideMenuLink to={userSettingsSecurity}>Bezpieczeństwo</SideMenuLink>
      <SideMenuLink to={userSettingsDeleteAccount}>Usuwanie konta</SideMenuLink>
    </UserSettingsSideMenuWrapper>
  );
};

export default UserSettingsSideMenu;
