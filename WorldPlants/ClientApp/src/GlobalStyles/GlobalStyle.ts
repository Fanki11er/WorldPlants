import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

export const GlobalStyles = createGlobalStyle`

*,*::after, *::before{
    box-sizing: border-box;
}

html{
    width: 100vw ;
    width: 100%;
    overflow-x: hidden;
    min-height: 100vh ;
}

body {
    margin: 0;
    padding: 0;
    width: 100% ;
    font-family: "Roboto";
    background-color: ${theme.colors.mainBlue} ;
    
}

body, ul{
  &::-webkit-scrollbar {
    
    width: 15px;
    background-color: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${theme.colors.navyBlue} ;
    border-radius: 10px;
    min-height: 100px;
    border: 3px solid;
    border: none; 
  }

}

section, li {
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
