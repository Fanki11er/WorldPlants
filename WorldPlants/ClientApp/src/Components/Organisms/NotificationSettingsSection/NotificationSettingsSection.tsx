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
import { AxiosResponse } from "axios";
import { NOTIFICATION_SETTINGS } from "../../../Constants/Constants";
import FormRequestError from "../../Molecules/FormRequestError/FormRequestError";
import { getErrorMessages } from "../../../Utils/Utils";
import NoListContentInfo from "../../Molecules/NoListContentInfo/NoListContentInfo";

const NotificationSettingsSection = () => {
  const axiosPrivate = useAxiosPrivate();
  const {
    getNotificationsSettings,
    setEmailNotificationsSettings,
    setSmsNotificationsSettings,
  } = apiEndpoints;

  const { isLoading, error, data } = useQuery<
    AxiosResponse<CurrentNotificationSettingsDto>
  >(NOTIFICATION_SETTINGS, () => axiosPrivate.get(getNotificationsSettings));
  return (
    <SettingsSectionWrapper>
      <SettingsSectionHeader>Powiadomienia</SettingsSectionHeader>
      {error ? (
        <FormRequestError errorValues={getErrorMessages(error)} />
      ) : null}
      <OptionsWrapper>
        {isLoading ? (
          <div>Loading</div>
        ) : (
          data && (
            <NotificationForm
              actualValues={data.data.emailSettings}
              submitPath={setEmailNotificationsSettings}
              header="Email"
            />
          )
        )}
      </OptionsWrapper>

      <OptionsWrapper>
        {isLoading ? (
          <div>Loading</div>
        ) : data && data.data.smsSettings ? (
          <NotificationForm
            actualValues={data.data.smsSettings}
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
