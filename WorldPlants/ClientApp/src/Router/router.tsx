import { Route } from "react-router";
import {
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";

import { paths } from "./paths";
const { rootPath } = paths;
const router = createBrowserRouter(
  createRoutesFromElements(<Route path={rootPath} element={<App />}></Route>)
);

export default router;
