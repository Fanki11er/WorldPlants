export const apiEndpoints = {
  baseURL: "https://localhost:7126/",
  registerOwnerUser: "Owner/Register",
  registerGuestAccount: "Guest/Register",
  loginUser: "Account/Login",
  getGuestUsers: "Guest",
  changeGuestUserStatus: "Guest/ChangeStatus",
  getNotificationsSettings: "Account/NotificationsSettings",
  setEmailNotificationsSettings: "Account/EmailNotificationsSettings",
  setSmsNotificationsSettings: "Account/SmsNotificationsSettings",
  accountSettings: "Account/Settings",
  securitySettings: "Account/Security",
  deleteOwnerUser: "Owner",
  selfDeleteGuestUser: "Guest",
  getGuestUserWithPermissions: (userId: string) => {
    return `Guest/${userId}`;
  },
  changeGuestPermissions: (userId: string) => {
    return `Guest/ChangePermissions/${userId}`;
  },
};
