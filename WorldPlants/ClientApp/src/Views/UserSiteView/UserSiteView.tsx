import { Outlet } from "react-router-dom";
import { ViewWrapper } from "../../Components/Atoms/ViewWrapper/ViewWrapper";
import SelectedUserSiteSideMenu from "../../Components/Molecules/SelectedUserSiteSideMenu/SelectedUserSiteSideMenu";

const UserSiteView = () => {
  return (
    <ViewWrapper>
      <SelectedUserSiteSideMenu />
      <Outlet />
    </ViewWrapper>
  );
};

export default UserSiteView;
