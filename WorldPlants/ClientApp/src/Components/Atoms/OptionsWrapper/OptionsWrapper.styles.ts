import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const OptionsWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-rows: 1fr auto;
  background-color: ${(props: AppTheme) => props.theme.colors.navyBlue};
  min-height: 400px;
  border-radius: 25px;
  padding: 50px 0;
  margin-bottom: 50px;
  justify-items: center;

  @media screen and (${(props: AppTheme) => props.theme.devices.medium}) {
  }

  @media screen and (${(props: AppTheme) => props.theme.devices.small}) {
    display: flex;
    flex-basis: 350px;
  }
`;
