import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ViewWrapper } from "../../Components/Atoms/ViewWrapper/ViewWrapper";
import AuthorizedNavigation from "../../Components/Molecules/AuthorizedNavigation/AuthorizedNavigation";
import useAuth from "../../Hooks/useAuth";
import { paths } from "../../Router/paths";
import usePermissions from "../../Hooks/usePermissions";
import { LoadingIndicator } from "../../Components/Atoms/LoadingIndicator/LoadingIndicator.styles";

const MainLayout = () => {
  const { login } = paths;
  const { user } = useAuth();
  const { permissions, isLoading, isError } = usePermissions();
  const location = useLocation();
  //!! Wyłączanie Authentykacji na czas developmentu
  if (!user) {
    return <Navigate to={login} state={{ from: location }} replace />;
  }
  //!!
  if ((!permissions && !isLoading) || isError) {
    return <Navigate to={login} state={{ from: location }} replace />;
  }

  return (
    <ViewWrapper>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          <AuthorizedNavigation />
          <Outlet />
        </>
      )}
    </ViewWrapper>
  );
};

export default MainLayout;
