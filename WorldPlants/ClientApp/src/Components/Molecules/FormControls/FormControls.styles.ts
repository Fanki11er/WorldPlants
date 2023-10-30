import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const FormControlsWrapper = styled.div`
  display: flex;
  flex-flow: wrap row;
  justify-content: space-evenly;
  width: 100%;
  max-width: 600px;
`;

export const LeftButtonWrapper = styled.div`
  @media screen and (${(props: AppTheme) => props.theme.devices.small}) {
    order: 1;
  }
`;
export const CenterButtonWrapper = styled.div`
  @media screen and (${(props: AppTheme) => props.theme.devices.small}) {
    order: 3;
  }
`;
export const RightButtonWrapper = styled.div`
  @media screen and (${(props: AppTheme) => props.theme.devices.small}) {
    order: 2;
  }
`;
