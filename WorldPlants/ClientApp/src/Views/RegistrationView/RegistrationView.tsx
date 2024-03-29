import { Navigate } from "react-router-dom";
import { ViewWrapper } from "../../Components/Atoms/ViewWrapper/ViewWrapper";
import UnauthorizedNavigation from "../../Components/Molecules/UnauthorizedNavigation/UnauthorizedNavigation";
import useAuth from "../../Hooks/useAuth";
import { paths } from "../../Router/paths";
import RegistrationFormFormik from "../../Components/Organisms/RegistrationFormFormik/RegistrationFormFormik";
import usePermissions from "../../Hooks/usePermissions";

const RegistrationView = () => {
  const { plantsTasks } = paths;
  const { user } = useAuth();
  const { permissions } = usePermissions();

  if (user && permissions) {
    return <Navigate to={plantsTasks} />;
  }
  return (
    <ViewWrapper>
      <UnauthorizedNavigation />
      <RegistrationFormFormik />
    </ViewWrapper>
  );
};

export default RegistrationView;
