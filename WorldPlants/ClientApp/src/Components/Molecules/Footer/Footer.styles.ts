import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const FooterWrapper = styled.footer`
  display: flex;
  background-color: ${(props: AppTheme) => props.theme.colors.darkBlue};
  width: 100%;
  height: max(10vw, 120px);
  grid-row: 2/3;
  position: relative;

  @media screen and (${(props: AppTheme) => props.theme.devices.small}) {
    height: 15vw;
  }

  @media print {
    display: none;
  }
`;

export const FooterImage = styled.img`
  position: absolute;
  width: 100%;
  max-width: 1920px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;

export const AuthorsContainer = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  column-gap: 10px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 20%;
`;

export const AuthorName = styled.span`
  color: ${(props: AppTheme) => props.theme.colors.gray};
  font-size: calc(8px + (18 - 10) * ((100vw - 360px) / (1600 - 360)));
`;
