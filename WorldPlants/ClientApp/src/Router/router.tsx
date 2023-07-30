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
const { rootPath, login, registration, main } = paths;
const router = createBrowserRouter(
  createRoutesFromElements(
          <Route path={rootPath} element={<RouteLayout />}>
              <Route index element={<LandingView/>}/>
              <Route path={login} element={<LoginView/>}/>
              <Route path={registration} element={<RegistrationView/>}/>
              <Route path={main} element={<MainLayout/>}/>
          </Route>)
);

export default router;
