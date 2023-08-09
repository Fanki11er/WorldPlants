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
import PlacesView from "../Views/TypesOfPlacesForPlantsView/TypesOfPlacesForPlantsView";
import SunExposureView from "../Views/SunExposureView/SunExposureView";
import OwnerSettingsView from "../Views/OwnerSettingsView/OwnerSettingsView";
import { GuestPermissionsViewWrapper } from "../Views/GuestPermissionsView/GuestPermissionsView.styles";
import GuestPermissionsView from "../Views/GuestPermissionsView/GuestPermissionsView";
import TypesOfPlacesForPlantsView from "../Views/TypesOfPlacesForPlantsView/TypesOfPlacesForPlantsView";
import PlantPlacesView from "../Views/PlantPlacesView/PlantPlacesView";
import PlantPlacesAddedView from "../Views/PlantPlacesAddedView/PlantPlacesAddedView";
import NotificationSettingsSection from "../Components/Organisms/NotificationSettingsSection/NotificationSettingsSection";
import GuestUsersAccountSettingsSection from "../Components/Organisms/GuestUsersAccountSettingsSection/GuestUsersAccountSettingsSection";
import RegisterGuestAccountSection from "../Components/Organisms/RegisterGuestAccountSection/RegisterGuestAccountSection";
import AccountSettingsSection from "../Components/Organisms/AccountSettingsSection/AccountSettingsSection";
import SecuritySettingsSection from "../Components/Organisms/SecuritySettingsSection/SecuritySettingsSection";
import DeleteAccountSection from "../Components/Organisms/DeleteAccountSection/DeleteAccountSection";

const {
  rootPath,
  login,
  registration,
  typesOfPlaces,
  sunExposure,
  plantPlaces,
  plantPlacesAdded,
  authorized,
  userSettings,
  userSettingsGuestAccounts,
  userSettingsRegisterGuestAccount,
  userSettingsAccount,
  userSettingsSecurity,
  userSettingsDeleteAccount,
  guestUserPermissions,
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
        <Route path={typesOfPlaces} element={<TypesOfPlacesForPlantsView />} />
        <Route path={sunExposure} element={<SunExposureView />} />
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
        {/* <Route path={guestSettings} element={<GuestSettingsView />} /> */}
        <Route
          path={`${guestUserPermissions}/:userId`}
          element={<GuestPermissionsView />}
        />
        <Route path={plantPlaces} element={<PlantPlacesView />} />
        <Route path={plantPlacesAdded} element={<PlantPlacesAddedView />} />
      </Route>
      <Route path={"*"} element={<LandingView />} />
    </Route>
  )
);

export default router;
