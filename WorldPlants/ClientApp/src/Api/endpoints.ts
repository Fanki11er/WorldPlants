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
  addUserSite: "UserSites/Add",
};
