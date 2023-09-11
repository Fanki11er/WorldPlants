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
import UserSiteView from "../Views/UserSiteView/UserSiteView";
import UserSiteSettingsSection from "../Components/Organisms/UserSiteSettingsSection/UserSiteSettingsSection";
import UserSiteDeleteSiteSection from "../Components/Organisms/UserSiteDeleteSiteSection/UserSiteDeleteSiteSection";
import BasicPlantInfo from "../Components/Organisms/BasicPlantsInfo/BasicPlantsInfo";
import PlantDetails from "../Components/Organisms/PlantDetails/PlantDetails";
import AddPlantView from "../Views/AddPlantView/AddPlantView";
import AddPlantSearchSection from "../Components/Organisms/AddPlantSearchSection/AddPlantSearchSection";
import AddPlantSection from "../Components/Organisms/AddPlantSection/AddPlantSection";
import SelectedPlantView from "../Views/SelectedPlantView/SelectedPlantView";
import UserSitePlantsSection from "../Components/Molecules/UserSitePlantsSection/UserSitePlantsSection";

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
  userSite,
  userSiteSettings,
  userSiteDeleteSite,
  addPlant,
  selectedPlant,
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
        <Route path={`${userSite}/:siteId`} element={<UserSiteView />}>
          <Route index element={<UserSitePlantsSection />} />

          <Route
            path={userSiteSettings}
            element={<UserSiteSettingsSection />}
          />
          <Route
            path={userSiteDeleteSite}
            element={<UserSiteDeleteSiteSection />}
          />
        </Route>
        <Route path={`${addPlant}/:siteId`} element={<AddPlantView />}>
          <Route index element={<AddPlantSearchSection />} />
          <Route path=":detailsId" element={<AddPlantSection />} />
        </Route>
        <Route
          path={`${selectedPlant}/:plantId`}
          element={<SelectedPlantView />}
        >
          {/* <Route index element={<PlantTasksSection />} />
          <Route
            path={selectedPlantSchedule}
            element={<PlantScheduleSection />}
          /> */}
          <Route path={""} element={<div>PlanDetails</div>} />
          <Route path={""} element={<div>PlantNotes</div>} />
          <Route path={""} element={<div>PlantSettings</div>} />
          <Route path={""} element={<div>DeletePlant</div>} />
        </Route>
      </Route>
      <Route path={"*"} element={<LandingView />} />
    </Route>
  )
);

export default router;

/* <Route path={plantPlaces} element={<PlantPlacesView />} />
        <Route path={plantPlacesAdded} element={<PlantPlacesAddedView />} /> */
/* <Route path={guestSettings} element={<GuestSettingsView />} /> */
