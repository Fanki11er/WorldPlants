import { StandardTaskTypeEnum } from "../Interfaces/PlantActiveTask";

export const apiEndpoints = {
  //!! Development =>
  baseURL: "https://localhost:7126/",
  //!!
  //!! Production =>
  // baseURL: "https://worldplants.azurewebsites.net/",
  //!!
  registerOwnerUser: "Owner/Register",
  registerGuestAccount: "Guest/Register",
  loginUser: "Account/Login",
  //? Guest users
  getGuestUsers: "Guest",
  //? User settings
  changeGuestUserStatus: "Guest/ChangeStatus",
  getNotificationsSettings: "Account/NotificationsSettings",
  setEmailNotificationsSettings: "Account/EmailNotificationsSettings",
  setSmsNotificationsSettings: "Account/SmsNotificationsSettings",
  accountSettings: "Account/Settings",
  securitySettings: "Account/Security",
  deleteOwnerUser: "Owner",
  selfDeleteGuestUser: "Guest",
  //?? Permissions
  getUserPermissions: "Account/Permissions",
  getGuestUserWithPermissions: (userId: string) => {
    return `Guest/${userId}`;
  },
  changeGuestPermissions: (userId: string) => {
    return `Guest/ChangePermissions/${userId}`;
  },
  deleteGuestUser: (userId: string) => {
    return `Guest/${userId}`;
  },
  //? Sites
  getUserSites: "UserSites",
  getDefaultSites: "UserSites/DefaultSites",
  getDefaultSunExposures: (siteTypeId: string) => {
    return `UserSites/SunExposures/${siteTypeId}`;
  },
  getSunExposuresByLocation: (locationId: number) => {
    return `UserSites/SunExposures/ByLocation/${locationId}`;
  },
  addUserSite: "UserSites/Add",
  getUserSiteSettings: (siteId: string) => {
    return `UserSites/Settings/${siteId}`;
  },
  editUserSiteSettings: (siteId: string) => {
    return `/UserSites/Edit/${siteId}`;
  },
  getBeforeDeleteSiteInformation: (siteId: string) => {
    return `/UserSites/BeforeDelete/${siteId}`;
  },
  deleteUserSite: (siteId: string) => {
    return `/UserSites/Delete/${siteId}`;
  },
  getSitePlantsInformation: (siteId: string | undefined) => {
    return `UserSites/Plants/${siteId ? siteId : ""}`;
  },

  getSiteHeaderInformation: (siteId: string | undefined) => {
    return `UserSites/Header/${siteId ? siteId : ""}`;
  },

  //? Plants
  searchForPlant: (searchPhrase: string) => {
    return `Plants/Search?searchPhrase=${searchPhrase}`;
  },

  getPlantDetails: (plantId: number | undefined) => {
    return `Plants/Details/${plantId ? plantId : ""}`;
  },

  addPlant: (siteId: string | undefined) => {
    return `Plants/Add/${siteId ? siteId : ""}`;
  },

  getPlantHeaderInformation: (plantId: string | undefined) => {
    return `Plants/HeaderInfo/${plantId ? plantId : ""}`;
  },

  getPlantTipsData: (plantId: string | undefined) => {
    return `Plants/Tips/${plantId}`;
  },

  recognizePlant: "Recognize",

  getPLantExternalId: (plantId: string | undefined) => {
    return `Plants/ExternalId/${plantId ? plantId : ""}`;
  },

  plantSettings: (plantId: string | undefined) => {
    return `Plants/Settings/${plantId ? plantId : ""}`;
  },

  getMovePlantInformation: (plantId: string | undefined) => {
    return `Plants/MoveInformation/${plantId ? plantId : ""}`;
  },

  movePlant: "Plants/Move",

  deletePlant: (plantId: string | undefined) => {
    return `Plants/${plantId ? plantId : ""}`;
  },

  checkIfPlantExists: (plantId: string) => {
    return `Plants/Check/${plantId}`;
  },
  //? Tasks

  getStandardTask: (plantId: string | undefined, taskId: number) => {
    return `Tasks/Standard/${plantId ? plantId : ""}/${taskId}`;
  },

  setTask: "Tasks/SetTask",

  deletePlantTask: (taskId: string) => {
    return `Tasks/${taskId}`;
  },

  getAllPlantTasks: (plantId: string | undefined) => {
    return `Tasks/AllTasks/${plantId ? plantId : ""}`;
  },

  snoozeTask: (taskId: string) => {
    return `Tasks/Snooze/${taskId}`;
  },
  skipTask: (taskId: string) => {
    return `Tasks/Skip/${taskId}`;
  },
  executeTask: (taskId: string) => {
    return `Tasks/Execute/${taskId}`;
  },
  getTasksHistory: (plantId: string | undefined) => {
    return `Tasks/History/${plantId ? plantId : ""}`;
  },

  getTodayTasks: `Tasks/Today`,

  getIncomingTasks: `Tasks/Incoming`,

  //?? QR

  createQrCode: (plantId: string | undefined) => {
    return `Qr/${plantId ? plantId : ""}`;
  },

  getQrCodes: "Qr",

  deleteQrCode: (id: number) => {
    return `QR/${id}`;
  },

  deleteAllCodes: "QR",

  //?? Notes
  getNotes: (plantId: string | undefined) => {
    return `Notes/${plantId ? plantId : ""}`;
  },

  addNote: (plantId: string | undefined) => {
    return `Notes/Add/${plantId ? plantId : ""}`;
  },

  editNote: (noteId: number) => {
    return `Notes/Edit/${noteId}`;
  },

  deleteNote: (noteId: number) => {
    return `Notes/${noteId}`;
  },

  //?? CustomActionTypes

  getCustomActionTypesInformation: "CustomTasks/Information",

  addCustomActionType: "CustomTasks/Add",

  editCustomActionType: (actionTypeId: number | undefined) => {
    return `CustomTasks/Edit/${actionTypeId ? actionTypeId : ""}`;
  },

  deleteCustomActionType: (actionTypeId: number | undefined) => {
    return `CustomTasks/Delete/${actionTypeId ? actionTypeId : ""}`;
  },
};
