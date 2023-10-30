//import { useParams } from "react-router-dom";
import { apiEndpoints } from "../../../Api/endpoints";
import useAuth from "../../../Hooks/useAuth";
import { paths } from "../../../Router/paths";
import {
  SettingsSectionHeader,
  SettingsSectionWrapper,
} from "../../Atoms/SettingsSectionWrapper/SettingsSectionWrapper.styles";
import GoToTop from "../../Molecules/GoToTop/GoToTop";
import DeleteUserAccountFormFormik from "../DeleteUserAccountFormFormik/DeleteUserAccountFormFormik";

const DeleteAccountSection = () => {
  const { user } = useAuth();
  const { deleteOwnerUser, selfDeleteGuestUser } = apiEndpoints;
  const { rootPath } = paths;

  //const {userId} = useParams();
  return (
    <SettingsSectionWrapper>
      <GoToTop />
      <SettingsSectionHeader>Usuwanie konta</SettingsSectionHeader>
      {user && user.accountType === "Owner" && (
        <DeleteUserAccountFormFormik
          submitPath={deleteOwnerUser}
          toPath={rootPath}
          accountName={
            user ? user.name : "NO_USER_ACCOUNT_DO_NOT_TRY_TO_DELETE"
          }
          logoutUser={true}
        />
      )}

      {user && user.accountType === "Guest" && (
        <DeleteUserAccountFormFormik
          submitPath={selfDeleteGuestUser}
          toPath={rootPath}
          accountName={
            user ? user.name : "NO_USER_ACCOUNT_DO_NOT_TRY_TO_DELETE"
          }
          logoutUser={true}
        />
      )}
    </SettingsSectionWrapper>
  );
};

export default DeleteAccountSection;
