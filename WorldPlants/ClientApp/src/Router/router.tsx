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
import PlantsTasksView from "../Views/PlantsTasksView/PlantsTasksView";
import TodayPlantsTasksSection from "../Components/Organisms/TodayPlantsTasksSection/TodayPlantsTasksSection";
import IncomingPlantsTasksSection from "../Components/Organisms/IncomingPlantsTasksSection/IncomingPlantsTasksSection";
import QrView from "../Views/QrView/QrView";
import QrScannerSection from "../Components/Organisms/QrScannerSection/QrScannerSection";
import QrPrintSection from "../Components/Organisms/QrPrintSection/QrPrintSection";
import AddCustomPlantSection from "../Components/Organisms/AddCustomPlantSection/AddCustomPlantSection";
import PlantNotesSection from "../Components/Organisms/PlantNotesSection/PlantNotesSection";
import EditNoteSection from "../Components/Organisms/EditNoteSection/EditNoteSection";
import CustomActionTypesSection from "../Components/Organisms/CustomActionTypesSection/CustomActionTypesSection";
import EditCustomActionTypeSection from "../Components/Organisms/EditCustomActionTypeSection/EditCustomActionTypeSection";

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
  plantsTasks,
  plantTasksIncoming,
  qrCodes,
  qrPrints,
  addCustomPlant,
  selectedPlantNotes,
  selectedPlanEditNote,
  customActions,
  customActionsEdit,
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
        //? Tasks
        <Route path={plantsTasks} element={<PlantsTasksView />}>
          <Route index element={<TodayPlantsTasksSection />} />
          <Route
            path={plantTasksIncoming}
            element={<IncomingPlantsTasksSection />}
          />
        </Route>
        //? Settings
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
          <Route path={customActions} element={<CustomActionTypesSection />} />

          <Route
            path={`${customActionsEdit}/:customActionId`}
            element={<EditCustomActionTypeSection />}
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
        //? Guest Permissions
        <Route
          path={`${guestUserPermissions}/:userId`}
          element={<GuestPermissionsView />}
        />
        //? User Sites
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
          <Route path={addCustomPlant} element={<AddCustomPlantSection />} />
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
          <Route path={selectedPlantNotes} element={<PlantNotesSection />} />
          <Route
            path={`${selectedPlanEditNote}/:noteId`}
            element={<EditNoteSection />}
          />
          <Route
            path={selectedPlantDetails}
            element={<PlantDetailsSection />}
          />
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
        //? QR
        <Route path={qrCodes} element={<QrView />}>
          <Route index element={<QrScannerSection />} />
          <Route path={qrPrints} element={<QrPrintSection />} />
        </Route>
      </Route>
      <Route path={"*"} element={<LandingView />} />
    </Route>
  )
);

export default router;
