import { NotificationSettings } from "./NotificationsSettings";

export interface CurrentNotificationSettingsDto {
  emailSettings: NotificationSettings;
  smsSettings: NotificationSettings | null;
}
