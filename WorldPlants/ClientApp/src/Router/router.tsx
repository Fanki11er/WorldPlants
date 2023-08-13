import { Route } from "react-router";
import {
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RouteLayout from "../Templates/RouteLayout/RouteLayout";
import LoginView from "../Views/LoginView/LoginView";
import RegistrationView from "../Views/RegistrationView/RegistrationView";
import { paths } from "./paths";
import LandingView from "../Views/LandingView/LandingView";
import MainLayout from "../Templates/MainLayout/MainLayout";
import UnauthorizedUserLayout from "../Templates/UnauthorizedUserLayout/UnauthorizedUserLayout";
import TasksView from "../Views/TasksView/TasksView";
import OwnerSettingsView from "../Views/OwnerSettingsView/OwnerSettingsView";
import GuestPermissionsView from "../Views/GuestPermissionsView/GuestPermissionsView";
import NotificationSettingsSection from "../Components/Organisms/NotificationSettingsSection/NotificationSettingsSection";
import GuestUsersAccountSettingsSection from "../Components/Organisms/GuestUsersAccountSettingsSection/GuestUsersAccountSettingsSection";
import RegisterGuestAccountSection from "../Components/Organisms/RegisterGuestAccountSection/RegisterGuestAccountSection";
import AccountSettingsSection from "../Components/Organisms/AccountSettingsSection/AccountSettingsSection";
import SecuritySettingsSection from "../Components/Organisms/SecuritySettingsSection/SecuritySettingsSection";
import DeleteAccountSection from "../Components/Organisms/DeleteAccountSection/DeleteAccountSection";
import UserSitesView from "../Views/UserSitesView/UserSitesView";
import UserSitesSection from "../Components/Organisms/UserSitesSection/UserSitesSection";
import AddUserSiteSection from "../Components/Organisms/AddUserSiteSection/AddUserSiteSection";

const {
  rootPath,
  login,
  registration,
  authorized,
  userSettings,
  userSettingsGuestAccounts,
  userSettingsRegisterGuestAccount,
  userSettingsAccount,
  userSettingsSecurity,
  userSettingsDeleteAccount,
  guestUserPermissions,
  userSites,
  userSitesAddNew,
} = paths;
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RouteLayout />}>
      <Route path={rootPath} element={<LandingView />} />
      <Route element={<UnauthorizedUserLayout />}>
        <Route path={login} element={<LoginView />} />
        <Route path={registration} element={<RegistrationView />} />
      </Route>
      <Route path={authorized} element={<MainLayout />}>
        <Route index element={<TasksView />} />
        <Route path={userSettings} element={<OwnerSettingsView />}>
          <Route index element={<NotificationSettingsSection />} />
          <Route
            path={userSettingsGuestAccounts}
            element={<GuestUsersAccountSettingsSection />}
          />
          <Route
            path={userSettingsRegisterGuestAccount}
            element={<RegisterGuestAccountSection />}
          />
          <Route
            path={userSettingsAccount}
            element={<AccountSettingsSection />}
          />
          <Route
            path={userSettingsSecurity}
            element={<SecuritySettingsSection />}
          />
          <Route
            path={userSettingsDeleteAccount}
            element={<DeleteAccountSection />}
          />
        </Route>

        <Route
          path={`${guestUserPermissions}/:userId`}
          element={<GuestPermissionsView />}
        />

        <Route path={userSites} element={<UserSitesView />}>
          <Route index element={<UserSitesSection />} />
          <Route path={userSitesAddNew} element={<AddUserSiteSection />} />
        </Route>
        {/* <Route path={`${userSite}/:siteId`} element={<div>Test</div>} /> */}
      </Route>
      <Route path={"*"} element={<LandingView />} />
    </Route>
  )
);

export default router;

/* <Route path={plantPlaces} element={<PlantPlacesView />} />
        <Route path={plantPlacesAdded} element={<PlantPlacesAddedView />} /> */
/* <Route path={guestSettings} element={<GuestSettingsView />} /> */
