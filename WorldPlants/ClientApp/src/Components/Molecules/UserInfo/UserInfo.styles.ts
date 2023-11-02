import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const UserInfoWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 15px;
  align-items: center;
`;

export const UserImage = styled.img`
  width: 40px;
  height: 40px;

  @media screen and (${(props: AppTheme) => props.theme.devices.small}) {
    width: 25px;
    height: 25px;
  }
`;

export const UserName = styled.span`
  color: ${(props: AppTheme) => props.theme.colors.white};
  width: fit-content;
  font-size: ${(props: AppTheme) => props.theme.fontSizes.small};

  @media screen and (${(props: AppTheme) => props.theme.devices.small}) {
    font-size: ${(props: AppTheme) => props.theme.fontSizes.smallX};
  }
`;
