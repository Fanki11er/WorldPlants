import { Outlet } from "react-router-dom";
import SelectedUserSiteSideMenu from "../../Components/Molecules/SelectedUserSiteSideMenu/SelectedUserSiteSideMenu";
import { AuthorizedViewWrapper } from "../../Components/Atoms/AuthorizedViewWrapper/AuthorizedViewWrapper.styles";
import { ViewSectionsWrapper } from "../../Components/Atoms/ViewWrapper/ViewWrapper";
import UserSiteHeader from "../../Components/Molecules/UserSiteHeader/UserSiteHeader";

const UserSiteView = () => {
  return (
    <AuthorizedViewWrapper>
      <SelectedUserSiteSideMenu />
      <ViewSectionsWrapper>
        <UserSiteHeader />
        <Outlet />
      </ViewSectionsWrapper>
    </AuthorizedViewWrapper>
  );
};

export default UserSiteView;
