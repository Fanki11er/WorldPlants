import { Navigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { OptionsWrapper } from "../../Atoms/OptionsWrapper/OptionsWrapper.styles";
import {
  SettingsSectionHeader,
  SettingsSectionWrapper,
} from "../../Atoms/SettingsSectionWrapper/SettingsSectionWrapper.styles";
import { paths } from "../../../Router/paths";
import GuestAccountsList from "../../Molecules/GuestAccountsList/GuestAccountsList";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import useQueryKey from "../../../Hooks/useQueryKey";
import { useQuery } from "react-query";
import { apiEndpoints } from "../../../Api/endpoints";
import { GuestUserDto } from "../../../Interfaces/GuestUserDto";
import { LoadingIndicator } from "../../Atoms/LoadingIndicator/LoadingIndicator.styles";
import { getErrorMessages } from "../../../Utils/Utils";
import FormRequestError from "../../Molecules/FormRequestError/FormRequestError";
import NoListContentInfo from "../../Molecules/NoListContentInfo/NoListContentInfo";
import GoToTop from "../../Molecules/GoToTop/GoToTop";

const GuestUsersAccountSettingsSection = () => {
  const { user } = useAuth();
  const { userSettings, authorized } = paths;
  const axiosPrivate = useAxiosPrivate();
  const { guestAccountsQueryKey } = useQueryKey();
  const { getGuestUsers } = apiEndpoints;
  const { isLoading, error, data } = useQuery<GuestUserDto[]>(
    guestAccountsQueryKey(),
    async () => {
      const result = await axiosPrivate.get(getGuestUsers);
      return result.data;
    },
    {
      enabled: !!user,
    }
  );
  if (user?.accountType !== "Owner") {
    return <Navigate to={`${authorized}/${userSettings}`} />;
  }
  return (
    <SettingsSectionWrapper>
      <GoToTop />
      <SettingsSectionHeader>Konta gości</SettingsSectionHeader>
      {isLoading && <LoadingIndicator />}
      {error ? (
        <FormRequestError errorValues={getErrorMessages(error)} />
      ) : null}
      {data && data.length == 0 && (
        <NoListContentInfo
          informationHeaderText={"Brak kont gości"}
          informationText={"Tu będą widoczne stworzone konta gości"}
        />
      )}
      {data && data.length > 0 && (
        <OptionsWrapper>
          <GuestAccountsList guestAccounts={data} />
        </OptionsWrapper>
      )}
    </SettingsSectionWrapper>
  );
};

export default GuestUsersAccountSettingsSection;
