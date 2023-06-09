import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Templates/RouteLayout/RouteLayout";
import { GlobalStyles } from "./GlobalStyles/GlobalStyle";
import { RouterProvider } from "react-router-dom";
import router from "./Router/router";
import { ThemeProvider } from "styled-components";
import { theme } from "./GlobalStyles/theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyles />
    <ThemeProvider theme={theme}>
       <RouterProvider router={router} />
    </ThemeProvider>
    
  </React.StrictMode>
);
