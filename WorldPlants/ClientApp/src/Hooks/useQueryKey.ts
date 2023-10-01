import {
  ACTIONS_PERMISSIONS,
  GUEST_ACCOUNTS,
  MOVE_PLANT_INFORMATION,
  NOTIFICATION_SETTINGS,
  PLANT_DETAILS,
  PLANT_EXTERNAL_ID,
  PLANT_HEADER_INFORMATION,
  PLANT_SETTINGS,
  USER_SITE_HEADER,
} from "../Constants/Constants";

const useQueryKey = () => {
  const userSiteHeaderQueryKey = (siteId: string | undefined) => {
    return [USER_SITE_HEADER, siteId || ""];
  };

  const plantSettingsQueryKey = (plantId: string | undefined) => {
    return [PLANT_SETTINGS, plantId || ""];
  };

  const plantExternalIdQueryKey = (plantId: string | undefined) => {
    return [PLANT_EXTERNAL_ID, plantId || ""];
  };

  const plantDetailsQueryKey = (detailsId: number | undefined) => {
    return [PLANT_DETAILS, detailsId || ""];
  };

  const plantHeaderInformationQueryKey = (plantId: string | undefined) => {
    return [PLANT_HEADER_INFORMATION, plantId || ""];
  };

  const movePlantInformationQueryKey = (plantId: string | undefined) => {
    return [MOVE_PLANT_INFORMATION, plantId || ""];
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
    plantSettingsQueryKey,
    plantHeaderInformationQueryKey,
    movePlantInformationQueryKey,
  };
};

export default useQueryKey;
