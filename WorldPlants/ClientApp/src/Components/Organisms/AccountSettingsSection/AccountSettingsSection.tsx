import { useQuery } from "react-query";
import { AccountSettingsDto } from "../../../Interfaces/AccountSettingsDto";
import { AxiosResponse } from "axios";
import { apiEndpoints } from "../../../Api/endpoints";
import FormRequestError from "../../Molecules/FormRequestError/FormRequestError";
import { getErrorMessages } from "../../../Utils/Utils";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { ACCOUNT_SETTINGS } from "../../../Constants/Constants";
import { OptionsWrapper } from "../../Atoms/OptionsWrapper/OptionsWrapper.styles";
import {
  SettingsSectionHeader,
  SettingsSectionWrapper,
} from "../../Atoms/SettingsSectionWrapper/SettingsSectionWrapper.styles";
import ChangeAccountSettingsForm from "../ChangeAccountSettingsForm/ChangeAccountSettingsForm";
import { LoadingIndicator } from "../../Atoms/LoadingIndicator/LoadingIndicator.styles";

const AccountSettingsSection = () => {
  const axiosPrivate = useAxiosPrivate();
  const { accountSettings } = apiEndpoints;

  const { isLoading, error, data } = useQuery<
    AxiosResponse<AccountSettingsDto>
  >(ACCOUNT_SETTINGS, () => axiosPrivate.get(accountSettings));

  return (
    <SettingsSectionWrapper>
      <SettingsSectionHeader>Edycja konta</SettingsSectionHeader>
      {error ? (
        <FormRequestError errorValues={getErrorMessages(error)} />
      ) : null}

      <OptionsWrapper>
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          data && <ChangeAccountSettingsForm actualValues={data.data} />
        )}
      </OptionsWrapper>
    </SettingsSectionWrapper>
  );
};

export default AccountSettingsSection;
