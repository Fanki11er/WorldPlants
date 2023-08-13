import useAuth from "../../../Hooks/useAuth";
import { paths } from "../../../Router/paths";
import { SideMenuLink } from "../../Atoms/Buttons/Buttons";
import { SideMenuWrapper } from "../../Atoms/SideMenuWrapper/SideMenuWrapper.styles";

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
    <SideMenuWrapper>
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
    </SideMenuWrapper>
  );
};

export default UserSettingsSideMenu;
