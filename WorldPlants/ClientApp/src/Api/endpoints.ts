import { StandardTaskTypeEnum } from "../Interfaces/PlantActiveTask";

export const apiEndpoints = {
  baseURL: "https://localhost:7126/",
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
  //? Plants
  searchForPlant: (searchPhrase: string) => {
    return `Plants/Search?searchPhrase=${searchPhrase}`;
  },

  getPlantDetails: (plantId: string | undefined) => {
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

  //? Tasks

  getStandardTask: (
    plantId: string | undefined,
    taskType: StandardTaskTypeEnum
  ) => {
    return `Tasks/Standard/${plantId ? plantId : ""}/${
      StandardTaskTypeEnum[taskType]
    }`;
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
};
