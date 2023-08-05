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
import GuestSettingsView from "../Views/GuestSettingsView/GuestSettingsView";
import { GuestPermissionsViewWrapper } from "../Views/GuestPermissionsView/GuestPermissionsView.styles";
import GuestPermissionsView from "../Views/GuestPermissionsView/GuestPermissionsView";
import TypesOfPlacesForPlantsView from "../Views/TypesOfPlacesForPlantsView/TypesOfPlacesForPlantsView";
import PlantPlacesView from "../Views/PlantPlacesView/PlantPlacesView";
import PlantPlacesAddedView from "../Views/PlantPlacesAddedView/PlantPlacesAddedView";

const {
  rootPath,
  login,
  registration,
  plantsTasks,
  typesOfPlaces,
  sunExposure,
  ownerSettings,
  guestSettings,
  permissions,
  plantPlaces,
  plantPlacesAdded,
} = paths;
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RouteLayout />}>
      <Route path={rootPath} element={<LandingView />} />
      <Route element={<UnauthorizedUserLayout />}>
        <Route index path={login} element={<LoginView />} />
        <Route path={registration} element={<RegistrationView />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path={plantsTasks} element={<TasksView />} />
        <Route path={typesOfPlaces} element={<TypesOfPlacesForPlantsView />} />
        <Route path={sunExposure} element={<SunExposureView />} />
        <Route path={ownerSettings} element={<OwnerSettingsView />} />
        <Route path={guestSettings} element={<GuestSettingsView />} />
        <Route path={permissions} element={<GuestPermissionsView />} />
        <Route path={plantPlaces} element={<PlantPlacesView />} />
        <Route path={plantPlacesAdded} element={<PlantPlacesAddedView />} />
      </Route>
      <Route path={"*"} element={<LandingView />} />
    </Route>
  )
);

export default router;
