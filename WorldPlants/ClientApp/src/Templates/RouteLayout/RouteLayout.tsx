import { Outlet } from "react-router-dom";
import AuthProvider from "../../Providers/AuthProvider";
import { RouteLayoutWrapper } from "./RouteLayout.styles";

const RouteLayout = () => {
  return (
    <RouteLayoutWrapper>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </RouteLayoutWrapper>
  );
};

export default RouteLayout;
