import { useNavigate, useParams } from "react-router-dom";
import { apiEndpoints } from "../../Api/endpoints";
import {
  PermissionsReturnButton,
  SideMenuLink,
} from "../../Components/Atoms/Buttons/Buttons";
import { HeaderAndOptionsWrapper } from "../../Components/Atoms/HeaderAntOptionsWrapper/HeaderAndOptionsWrapper";
import { HeaderPermissions } from "../../Components/Atoms/PermissionsWrapper/PermissionsWrapper";
import { SettingsHeader } from "../../Components/Atoms/SettingsHeader/SettingsHeader";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import {
  FullRowWrapper,
  GuestPermissionsViewWrapper,
} from "./GuestPermissionsView.styles";
import { AxiosResponse } from "axios";
import { GuestUserWithPermissionsDto } from "../../Interfaces/GuestUserWithPermissionsDto";
import { useQuery } from "react-query";
import { GUEST_USER_PERMISSIONS } from "../../Constants/Constants";
import FormRequestError from "../../Components/Molecules/FormRequestError/FormRequestError";
import { getErrorMessages } from "../../Utils/Utils";
import GuestUserPermissionsForm from "../../Components/Organisms/GuestUserPermissionsForm/GuestUserPermissionsForm";
import DeleteUserAccountFormFormik from "../../Components/Organisms/DeleteUserAccountFormFormik/DeleteUserAccountFormFormik";
import { paths } from "../../Router/paths";
import SideMenu from "../../Components/Molecules/SideMenu/SideMenu";

const GuestPermissionsView = () => {
  const { authorized, userSettings, userSettingsGuestAccounts } = paths;
  const { getGuestUserWithPermissions, deleteGuestUser } = apiEndpoints;
  const axiosPrivate = useAxiosPrivate();
  const { userId } = useParams();
  const navigate = useNavigate();

  const { error, isLoading, data } = useQuery<
    AxiosResponse<GuestUserWithPermissionsDto>
  >(
    GUEST_USER_PERMISSIONS,
    () => {
      return axiosPrivate.get(
        getGuestUserWithPermissions(userId ? userId : "")
      );
    },
    {
      cacheTime: 0,
    }
  );
  return (
    <GuestPermissionsViewWrapper>
      <FullRowWrapper>
        {isLoading && <div>Loading</div>}
        {error ? (
          <FormRequestError errorValues={getErrorMessages(error)} />
        ) : null}
      </FullRowWrapper>
      {data?.data && (
        <>
          <SideMenu>
            <SideMenuLink to={""} end>
              Uprawnienia
            </SideMenuLink>
            <PermissionsReturnButton onClick={() => navigate(-1)}>
              Powrót
            </PermissionsReturnButton>
          </SideMenu>
          <HeaderAndOptionsWrapper>
            <HeaderPermissions>
              {`Konto gościa: ${data?.data?.name}`}
            </HeaderPermissions>
            <SettingsHeader>Uprawnienia</SettingsHeader>

            <GuestUserPermissionsForm actualValues={data.data} />
            <DeleteUserAccountFormFormik
              accountName={data.data.name}
              submitPath={deleteGuestUser(data.data.id)}
              toPath={`${authorized}/${userSettings}/${userSettingsGuestAccounts}`}
              logoutUser={false}
            />
          </HeaderAndOptionsWrapper>
        </>
      )}
    </GuestPermissionsViewWrapper>
  );
};

export default GuestPermissionsView;
