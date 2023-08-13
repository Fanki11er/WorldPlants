import { Outlet } from "react-router-dom";
import { AuthorizedViewWrapper } from "../../Components/Atoms/AuthorizedViewWrapper/AuthorizedViewWrapper.styles";
import UserSiteSideMenu from "../../Components/Molecules/UserSiteSideMenu/UserSiteSideMenu";

const UserSitesView = () => {
  return (
    <AuthorizedViewWrapper>
      <UserSiteSideMenu />
      <Outlet />
    </AuthorizedViewWrapper>
  );
};

export default UserSitesView;
