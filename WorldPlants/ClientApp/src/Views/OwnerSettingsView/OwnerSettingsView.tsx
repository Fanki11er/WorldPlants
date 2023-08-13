import { Outlet } from "react-router-dom";

import UserSettingsSideMenu from "../../Components/Molecules/UserSettingsSideMenu/UserSettingsSideMenu";
import { AuthorizedViewWrapper } from "../../Components/Atoms/AuthorizedViewWrapper/AuthorizedViewWrapper.styles";

const OwnerSettingsView = () => {
  return (
    <AuthorizedViewWrapper>
      <UserSettingsSideMenu />
      <Outlet />
    </AuthorizedViewWrapper>
  );
};

export default OwnerSettingsView;
//!! Late for delete <GuestAccounts />
