import { Outlet } from "react-router-dom";
import { ViewWrapper } from "../../Components/Atoms/ViewWrapper/ViewWrapper";
import SelectedUserSiteSideMenu from "../../Components/Molecules/SelectedUserSiteSideMenu/SelectedUserSiteSideMenu";
import { AuthorizedViewWrapper } from "../../Components/Atoms/AuthorizedViewWrapper/AuthorizedViewWrapper.styles";

const UserSiteView = () => {
  return (
    <AuthorizedViewWrapper>
      <SelectedUserSiteSideMenu />
      <Outlet />
    </AuthorizedViewWrapper>
  );
};

export default UserSiteView;
