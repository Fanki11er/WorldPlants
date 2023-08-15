import { Navigate } from "react-router-dom";
import { ViewWrapper } from "../../Components/Atoms/ViewWrapper/ViewWrapper";
import UnauthorizedNavigation from "../../Components/Molecules/UnauthorizedNavigation/UnauthorizedNavigation";
import LoginForm from "../../Components/Organisms/LoginForm/LoginForm";
import useAuth from "../../Hooks/useAuth";
import { paths } from "../../Router/paths";
import usePermissions from "../../Hooks/usePermissions";

const LoginView = () => {
  const { authorized } = paths;
  const { user } = useAuth();
  const { permissions } = usePermissions();

  if (user && permissions) {
    return <Navigate to={authorized} />;
  }
  return (
    <ViewWrapper>
      <UnauthorizedNavigation />
      <LoginForm />
    </ViewWrapper>
  );
};

export default LoginView;
