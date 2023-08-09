import { Outlet } from "react-router-dom";
import { OwnerSettingsViewWrapper } from "./OwnerSettingsView.styles";
import UserSettingsSideMenu from "../../Components/Molecules/UserSettingsSideMenu/UserSettingsSideMenu";

const OwnerSettingsView = () => {
  return (
    <OwnerSettingsViewWrapper>
      <UserSettingsSideMenu />
      <Outlet />
    </OwnerSettingsViewWrapper>
  );
};

export default OwnerSettingsView;
//!! Late for delete <GuestAccounts />
