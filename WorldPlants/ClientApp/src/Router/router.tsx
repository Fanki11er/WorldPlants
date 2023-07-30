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

const { rootPath, login, registration, plantsTasks } = paths;
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
      </Route>
      <Route path={"*"} element={<LandingView />} />
    </Route>
  )
);

export default router;
