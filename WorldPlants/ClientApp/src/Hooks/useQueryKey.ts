import {
  ACTIONS_PERMISSIONS,
  GUEST_ACCOUNTS,
  NOTIFICATION_SETTINGS,
  PLANT_DETAILS,
  PLANT_EXTERNAL_ID,
  USER_SITE_HEADER,
} from "../Constants/Constants";

const useQueryKey = () => {
  const userSiteHeaderQueryKey = (siteId: string | undefined) => {
    return [USER_SITE_HEADER, siteId || ""];
  };

  const plantExternalIdQueryKey = (plantId: string | undefined) => {
    return [PLANT_EXTERNAL_ID, plantId || ""];
  };

  const plantDetailsQueryKey = (detailsId: number | undefined) => {
    return [PLANT_DETAILS, detailsId || ""];
  };

  const guestAccountsQueryKey = () => [GUEST_ACCOUNTS];

  const notificationSettingsQueryKey = () => [NOTIFICATION_SETTINGS];

  const actionsPermissionsQueryKey = () => [ACTIONS_PERMISSIONS];

  return {
    userSiteHeaderQueryKey,
    guestAccountsQueryKey,
    notificationSettingsQueryKey,
    actionsPermissionsQueryKey,
    plantExternalIdQueryKey,
    plantDetailsQueryKey,
  };
};

export default useQueryKey;
