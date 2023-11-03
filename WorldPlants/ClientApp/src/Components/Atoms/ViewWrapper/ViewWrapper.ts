import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const ViewWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
<<<<<<< HEAD
  padding: 180px 0 10vw 0;
  //justify-content: center;
=======
  padding: 200px 0 10vw 0;
  justify-content: flex-start;
>>>>>>> @{-1}

  @media screen and (${(props: AppTheme) => props.theme.devices.veryLarge}) {
    padding: 100px 0 10vw 0;
  }
`;

export const ViewSectionsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 50px;
  align-items: center;
  grid-column: 2/3;

  @media screen and (${(props: AppTheme) => props.theme.devices.small}) {
    grid-column: 1/2;
  }
`;
