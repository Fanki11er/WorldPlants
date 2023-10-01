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
import AddPlantView from "../Views/AddPlantView/AddPlantView";
import AddPlantSearchSection from "../Components/Organisms/AddPlantSearchSection/AddPlantSearchSection";
import AddPlantSection from "../Components/Organisms/AddPlantSection/AddPlantSection";
import SelectedPlantView from "../Views/SelectedPlantView/SelectedPlantView";
import UserSitePlantsSection from "../Components/Molecules/UserSitePlantsSection/UserSitePlantsSection";
import PlantTasksSection from "../Components/Organisms/PlantTasksSection/PlantTasksSection";
import PlantScheduleSection from "../Components/Molecules/PlantScheduleSection/PlantScheduleSection";
import PlantTasksHistorySection from "../Components/Molecules/PlantTasksHistorySection/PlantTasksHistorySection";
import RecognizePlantSection from "../Components/Organisms/RecognizePlantSection/RecognizePlantSection";
import PlantDetailsSection from "../Components/Molecules/PlantDetailsSection/PlantDetailsSection";
import PlantSettingsSection from "../Components/Molecules/PlantSettingsSection/PlantSettingsSection";
import MovePlantSection from "../Components/Organisms/MovePlantSection/MovePlantSection";
import DeletePlantSection from "../Components/Organisms/DeletePlantSection/DeletePlantSection";

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
  selectedPlantSchedule,
  selectedPlantTasksHistory,
  addPlantRecognize,
  selectedPlantDetails,
  selectedPlantSettings,
  selectedPlantMove,
  selectedPlantDelete,
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
          <Route path={addPlantRecognize} element={<RecognizePlantSection />} />
          <Route path=":detailsId" element={<AddPlantSection />} />
        </Route>
        //? Plant
        <Route
          path={`${selectedPlant}/:plantId`}
          element={<SelectedPlantView />}
        >
          <Route index element={<PlantTasksSection />} />
          <Route
            path={selectedPlantSchedule}
            element={<PlantScheduleSection />}
          />
          <Route
            path={selectedPlantDetails}
            element={<PlantDetailsSection />}
          />
          <Route path={""} element={<div>PlantNotes</div>} />
          <Route
            path={selectedPlantTasksHistory}
            element={<PlantTasksHistorySection />}
          />
          <Route
            path={selectedPlantSettings}
            element={<PlantSettingsSection />}
          />
          <Route path={selectedPlantMove} element={<MovePlantSection />} />
          <Route path={selectedPlantDelete} element={<DeletePlantSection />} />
        </Route>
      </Route>
      <Route path={"*"} element={<LandingView />} />
    </Route>
  )
);

export default router;

// Zrobić wskaźnik ładowania -zrobiony
// Poprawić ikony w pliku świecącym się na czerwono :) (Plant schedule section) - zrobione
// Poprawić kontrast w napisie błędu w errorach - zrobione
//todo Border na focus i hover dla inputa w register, login i search (input textowy) ???
//todo AddPlantSearchOrRecognizeResultsListItemImage w AddPlantSearchOrRecognizeResults image jako tło ??
//todo AddPlantSection plantDetails addplantform image jako tło ??
// AddPhoto field padding i hover - zrobione
// PlantDetailsWithIconSection wstawić ikony - zrobione

// Poprawić loadery -zrobione
//  Zrobić red button with margin - zrobione
// Przejrzeć wszystkie style i sprawdzić kolory - zrobione
// todo Hover focus miejsca
