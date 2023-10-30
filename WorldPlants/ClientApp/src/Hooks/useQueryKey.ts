import {
  ACTIONS_PERMISSIONS,
  ALL_PLANT_TASKS,
  CUSTOM_ACTION_TYPES,
  GUEST_ACCOUNTS,
  INCOMING_TASKS,
  MOVE_PLANT_INFORMATION,
  NOTIFICATION_SETTINGS,
  PLANT_DETAILS,
  PLANT_EXTERNAL_ID,
  PLANT_HEADER_INFORMATION,
  PLANT_NOTES,
  PLANT_QR,
  PLANT_SETTINGS,
  SAVED_QR_CODES,
  SITE_PLANTS,
  STANDARD_PLANT_TASKS,
  TASKS_HISTORY,
  TODAY_TASKS,
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

  const sitePlantsQueryKey = (siteId: string | undefined) => {
    return [SITE_PLANTS, siteId || ""];
  };

  const standardPlantTasksQueryKey = (plantId: string | undefined) => {
    return [STANDARD_PLANT_TASKS, plantId || ""];
  };

  const tasksHistoryQueryKey = (plantId: string | undefined) => {
    return [TASKS_HISTORY, plantId || ""];
  };

  const plantNotesQueryKey = (plantId: string | undefined) => {
    return [PLANT_NOTES, plantId || ""];
  };

  const guestAccountsQueryKey = () => [GUEST_ACCOUNTS];

  const notificationSettingsQueryKey = () => [NOTIFICATION_SETTINGS];

  const actionsPermissionsQueryKey = () => [ACTIONS_PERMISSIONS];

  const recognizedResultsQueryKey = () => [ACTIONS_PERMISSIONS];

  const todayTasksQueryKey = () => [TODAY_TASKS];

  const incomingTasksQueryKey = () => [INCOMING_TASKS];

  const allPlantTasksQueryKey = () => [ALL_PLANT_TASKS];

  const savedQrCodesQueryKey = () => [SAVED_QR_CODES];

  const plantQrQueryKey = () => [PLANT_QR];

  const customActionTypesQueryKey = () => [CUSTOM_ACTION_TYPES];

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
    recognizedResultsQueryKey,
    sitePlantsQueryKey,
    todayTasksQueryKey,
    incomingTasksQueryKey,
    standardPlantTasksQueryKey,
    allPlantTasksQueryKey,
    tasksHistoryQueryKey,
    plantQrQueryKey,
    savedQrCodesQueryKey,
    plantNotesQueryKey,
    customActionTypesQueryKey,
  };
};

export default useQueryKey;
