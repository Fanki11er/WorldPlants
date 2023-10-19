import { Outlet } from "react-router-dom";
import { AuthorizedViewWrapper } from "../../Components/Atoms/AuthorizedViewWrapper/AuthorizedViewWrapper.styles";
import QrSideMenu from "../../Components/Molecules/QrSideMenu/QrSideMenu";

const QrView = () => {
  return (
    <AuthorizedViewWrapper>
      <QrSideMenu />
      <Outlet />
    </AuthorizedViewWrapper>
  );
};

export default QrView;
