import { Outlet } from "react-router-dom";
import AuthProvider from "../../Providers/AuthProvider";
import { RouteLayoutWrapper } from "./RouteLayout.styles";
import PermissionsProvider from "../../Providers/PermissionsProvider";

const RouteLayout = () => {
  return (
    <RouteLayoutWrapper>
      <AuthProvider>
        <PermissionsProvider>
          <Outlet />
        </PermissionsProvider>
      </AuthProvider>
    </RouteLayoutWrapper>
  );
};

export default RouteLayout;
