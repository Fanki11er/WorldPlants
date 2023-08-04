import {
  ActionButton,
  NotificationButtonWrapper,
} from "../../Atoms/Buttons/Buttons";
import {
  HeaderNotificationEmailAndSms,
  NotificationWrapper,
} from "../../Atoms/NotificationWrapper/NotificationWrapper";
import {
  CheckboxNotification,
  HeaderNotification,
  NotificationFormLabel,
  NotificationFormWrapper,
} from "./NotificationForm.styles";

const NotificationForm = () => {
  return (
    <NotificationFormWrapper>
      <HeaderNotificationEmailAndSms>Email</HeaderNotificationEmailAndSms>

      <NotificationWrapper>
        <NotificationFormLabel>
          <HeaderNotification>Podlewanie</HeaderNotification>
          <CheckboxNotification />
        </NotificationFormLabel>

        <NotificationFormLabel>
          <HeaderNotification>Nawożenie</HeaderNotification>
          <CheckboxNotification />
        </NotificationFormLabel>

        <NotificationFormLabel>
          <HeaderNotification>Nawilżanie</HeaderNotification>
          <CheckboxNotification />
        </NotificationFormLabel>

        <NotificationFormLabel>
          <HeaderNotification>Przycinanie</HeaderNotification>
          <CheckboxNotification />
        </NotificationFormLabel>

        <NotificationFormLabel>
          <HeaderNotification>Przesadzanie</HeaderNotification>
          <CheckboxNotification />
        </NotificationFormLabel>
      </NotificationWrapper>

      <NotificationButtonWrapper>
        <ActionButton>Zapisz</ActionButton>
      </NotificationButtonWrapper>
    </NotificationFormWrapper>
  );
};

export default NotificationForm;
