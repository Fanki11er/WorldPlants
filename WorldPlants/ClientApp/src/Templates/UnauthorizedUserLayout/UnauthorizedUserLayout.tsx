import { Outlet } from "react-router-dom";
import UnauthorizedNavigation from "../../Components/Molecules/UnauthorizedNavigation/UnauthorizedNavigation";

const UnauthorizedUserLayout = () => {
  return (
    <>
      <UnauthorizedNavigation />
      <Outlet />
    </>
  );
};

export default UnauthorizedUserLayout;
