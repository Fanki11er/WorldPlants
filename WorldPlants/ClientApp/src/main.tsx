import React from "react";
import ReactDOM from "react-dom/client";
import { GlobalStyles } from "./GlobalStyles/GlobalStyle";
import { RouterProvider } from "react-router-dom";
import router from "./Router/router";
import { ThemeProvider } from "styled-components";
import { theme } from "./GlobalStyles/theme";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyles />
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

//Todo Poprawić rodzaj czcionek
//todo Odsunąć weeory od inputów
