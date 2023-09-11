import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const AuthorizedViewWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 240px 1fr;
  justify-items: center;

  @media screen and (${(props: AppTheme) => props.theme.devices.small}) {
    position: relative;
    grid-template-columns: 1fr;
  }
`;
