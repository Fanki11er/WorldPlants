import { Navigate } from "react-router-dom";
import { ViewWrapper } from "../../Components/Atoms/ViewWrapper/ViewWrapper";
import UnauthorizedNavigation from "../../Components/Molecules/UnauthorizedNavigation/UnauthorizedNavigation";
import LoginForm from "../../Components/Organisms/LoginForm/LoginForm";
import useAuth from "../../Hooks/useAuth";
import { paths } from "../../Router/paths";

const LoginView = () => {
  const { plantsTasks } = paths;
  const { user } = useAuth();

  if (user) {
    return <Navigate to={plantsTasks} />;
  }
  return (
    <ViewWrapper>
      <UnauthorizedNavigation />
      <LoginForm />
    </ViewWrapper>
  );
};

export default LoginView;
