import { Navigate } from "react-router-dom";
import { ViewWrapper } from "../../Components/Atoms/ViewWrapper/ViewWrapper";
import UnauthorizedNavigation from "../../Components/Molecules/UnauthorizedNavigation/UnauthorizedNavigation";
import RegistrationForm from "../../Components/Organisms/RegistrationForm/RegistrationForm";
import useAuth from "../../Hooks/useAuth";
import { paths } from "../../Router/paths";

const RegistrationView = () => {
  const { plantsTasks } = paths;
  const { user } = useAuth();

  if (user) {
    return <Navigate to={plantsTasks} />;
  }
  return (
    <ViewWrapper>
      <UnauthorizedNavigation />
      <RegistrationForm />
    </ViewWrapper>
  );
};

export default RegistrationView;
