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
import PlacesView from "../Views/PlacesView/PlacesView";
import SunExposureView from "../Views/SunExposureView/SunExposureView";
import OwnerSettingsView from "../Views/OwnerSettingsView/OwnerSettingsView";

const {
  rootPath,
  login,
  registration,
  plantsTasks,
  plantsPlace,
  sunExposure,
  ownerSettings,
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
        <Route path={plantsPlace} element={<PlacesView />} />
        <Route path={sunExposure} element={<SunExposureView />} />
        <Route path={ownerSettings} element={<OwnerSettingsView />} />
      </Route>
      <Route path={"*"} element={<LandingView />} />
    </Route>
  )
);

export default router;
