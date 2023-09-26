import { Outlet } from "react-router-dom";
import AuthProvider from "../../Providers/AuthProvider";
import { RouteLayoutWrapper } from "./RouteLayout.styles";
import PermissionsProvider from "../../Providers/PermissionsProvider";
import Footer from "../../Components/Molecules/Footer/Footer";

const RouteLayout = () => {
  return (
    <RouteLayoutWrapper>
      <AuthProvider>
        <PermissionsProvider>
          <Outlet />
          <Footer />
        </PermissionsProvider>
      </AuthProvider>
    </RouteLayoutWrapper>
  );
};

export default RouteLayout;
