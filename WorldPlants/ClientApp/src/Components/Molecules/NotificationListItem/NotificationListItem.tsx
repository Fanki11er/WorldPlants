import {
  CheckboxNotification,
  HeaderNotificationListItem,
  NotificationListItemWrapper,
} from "./NotificationListItem.styles";

const NotificationListItem = () => {
  return (
    <NotificationListItemWrapper>
      <HeaderNotificationListItem>Podlewanie</HeaderNotificationListItem>
      <CheckboxNotification />
      <CheckboxNotification />
    </NotificationListItemWrapper>
  );
};

export default NotificationListItem;
