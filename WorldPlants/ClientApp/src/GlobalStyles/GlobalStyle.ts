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

section {
  opacity: 0;
  animation-name: show;
  animation-duration: 1s;
  animation-fill-mode: forwards;

  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}
`;
