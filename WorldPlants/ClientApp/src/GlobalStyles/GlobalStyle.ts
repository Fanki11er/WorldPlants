import { createGlobalStyle } from "styled-components";
export const GlobalStyles = createGlobalStyle`

*,*::after, *::before{
    box-sizing: border-box;
}

html{
    width: 100vw ;
    overflow-x: hidden;
    min-height: 100vh ;
}

body {
    margin: 0;
    padding: 0;
    width: 100% ;
}

`;
