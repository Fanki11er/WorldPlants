import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ViewWrapper } from "../../Components/Atoms/ViewWrapper/ViewWrapper";
import AuthorizedNavigation from "../../Components/Molecules/AuthorizedNavigation/AuthorizedNavigation";
import useAuth from "../../Hooks/useAuth";
import { paths } from "../../Router/paths";

const MainLayout = () => {
  const { login } = paths;
  const { user } = useAuth();
  const location = useLocation();
  //!! Wyłączanie Authentykacji na czas developmentu
  if (!user) {
    return <Navigate to={login} state={{ from: location }} replace />;
  }
  //!!
  return (
    <ViewWrapper>
      <AuthorizedNavigation />
      <Outlet />
    </ViewWrapper>
  );
};

export default MainLayout;
