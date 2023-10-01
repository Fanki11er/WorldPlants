import { useQuery } from "react-query";
import { apiEndpoints } from "../../../Api/endpoints";
import { OptionsWrapper } from "../../Atoms/OptionsWrapper/OptionsWrapper.styles";
import {
  SettingsSectionHeader,
  SettingsSectionWrapper,
} from "../../Atoms/SettingsSectionWrapper/SettingsSectionWrapper.styles";
import NotificationForm from "../../Molecules/NotificationForm/NotificationForm";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { CurrentNotificationSettingsDto } from "../../../Interfaces/CurrentNotificationSettingsDto";
import FormRequestError from "../../Molecules/FormRequestError/FormRequestError";
import { getErrorMessages } from "../../../Utils/Utils";
import NoListContentInfo from "../../Molecules/NoListContentInfo/NoListContentInfo";
import { LoadingIndicator } from "../../Atoms/LoadingIndicator/LoadingIndicator.styles";
import useQueryKey from "../../../Hooks/useQueryKey";

const NotificationSettingsSection = () => {
  const axiosPrivate = useAxiosPrivate();
  const {
    getNotificationsSettings,
    setEmailNotificationsSettings,
    setSmsNotificationsSettings,
  } = apiEndpoints;
  const { notificationSettingsQueryKey } = useQueryKey();

  const { isLoading, error, data } = useQuery<CurrentNotificationSettingsDto>(
    notificationSettingsQueryKey(),
    async () => {
      const result = await axiosPrivate.get(getNotificationsSettings);
      return result.data;
    }
  );
  return (
    <SettingsSectionWrapper>
      <SettingsSectionHeader>Powiadomienia</SettingsSectionHeader>
      {error ? (
        <FormRequestError errorValues={getErrorMessages(error)} />
      ) : null}
      <OptionsWrapper>
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          data && (
            <NotificationForm
              actualValues={data.emailSettings}
              submitPath={setEmailNotificationsSettings}
              header="Email"
            />
          )
        )}
      </OptionsWrapper>

      <OptionsWrapper>
        {isLoading ? (
          <LoadingIndicator />
        ) : data && data.smsSettings ? (
          <NotificationForm
            actualValues={data.smsSettings}
            submitPath={setSmsNotificationsSettings}
            header="Sms"
          />
        ) : (
          <NoListContentInfo
            informationHeaderText={"Powiadomienia sms"}
            informationText={
              "Aby móc otrzymywać powiadomienia sms należy dodać w ustawiniach numer telefonu"
            }
          />
        )}
      </OptionsWrapper>
    </SettingsSectionWrapper>
  );
};

export default NotificationSettingsSection;
