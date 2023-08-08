import { useNavigate, useParams } from "react-router-dom";
import { apiEndpoints } from "../../Api/endpoints";
import {
  ActionButton,
  ButtonDeleteAccount,
  SideMenuLink,
} from "../../Components/Atoms/Buttons/Buttons";
import { DeleteAccountHeader } from "../../Components/Atoms/DeleteAccountHeader/DeleteAccountHeader";
import { DeletingAccountsWrapper } from "../../Components/Atoms/DeletingAccountsWrapper/DeletingAccountsWrapper";
import { HeaderAndOptionsWrapper } from "../../Components/Atoms/HeaderAntOptionsWrapper/HeaderAndOptionsWrapper";
import {
  HeaderPermissions,
  PermissionsWrapper,
} from "../../Components/Atoms/PermissionsWrapper/PermissionsWrapper";
import { SettingsHeader } from "../../Components/Atoms/SettingsHeader/SettingsHeader";
import CheckboxInput from "../../Components/Molecules/CheckboxInput/CheckboxInput";
import {
  CheckboxNotification,
  HeaderNotification,
} from "../../Components/Molecules/CheckboxInput/CheckboxInput.styles";
import {
  PermissionsFormWrapper,
  PermissionsLabel,
} from "../../Components/Molecules/PermissionsForm/PermissionsForm.styles";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { HeaderWrapper } from "../LandingView/LandingView.styles";
import {
  FullRowWrapper,
  GuestPermissionsViewWrapper,
  GuestUserPermissionsViewSideMenuWrapper,
} from "./GuestPermissionsView.styles";
import { AxiosResponse } from "axios";
import { GuestUserWithPermissionsDto } from "../../Interfaces/GuestUserWithPermissionsDto";
import { useQuery } from "react-query";
import { GUEST_USER_PERMISSIONS } from "../../Constants/Constants";
import FormRequestError from "../../Components/Molecules/FormRequestError/FormRequestError";
import { getErrorMessages } from "../../Utils/Utils";
import GuestUserPermissionsForm from "../../Components/Organisms/GuestUserPermissionsForm/GuestUserPermissionsForm";

const GuestPermissionsView = () => {
  const { getGuestUserWithPermissions } = apiEndpoints;
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
          <HeaderAndOptionsWrapper>
            <HeaderPermissions>
              {" "}
              {`Konto gościa: ${data?.data?.name}`}
            </HeaderPermissions>
            <SettingsHeader>Uprawnienia</SettingsHeader>
          </HeaderAndOptionsWrapper>
          <GuestUserPermissionsViewSideMenuWrapper>
            <SideMenuLink to={""} end>
              Uprawnienia
            </SideMenuLink>
            <ActionButton onClick={() => navigate(-1)}>Powrót</ActionButton>
          </GuestUserPermissionsViewSideMenuWrapper>
          <GuestUserPermissionsForm actualValues={data.data} />
        </>
      )}
    </GuestPermissionsViewWrapper>
  );
};

export default GuestPermissionsView;
