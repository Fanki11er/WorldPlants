import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";
import { NavLink } from "react-router-dom";

export const ActionButton = styled.button`
  min-width: 130px;
  width: fit-content;
  min-height: 35px;
  background-color: ${(props: AppTheme) => props.theme.colors.blue};
  border-radius: 25px;
  outline: none;
  border: none;
  padding: 5px 10px;
  margin-top: 30px;
  color: ${(props: AppTheme) => props.theme.colors.white};
  font-family: ${(props: AppTheme) => props.theme.fontFamilies.Roboto};

  :hover {
    background-color: ${(props: AppTheme) => props.theme.colors.orange};
    cursor: pointer;
    transition: all 0.5s;
  }
  :disabled {
    background-color: ${(props: AppTheme) => props.theme.colors.lightGray};
    cursor: not-allowed;
  }
`;

export const NavigationLink = styled(NavLink)`
  min-width: 110px;
  width: fit-content;
  min-height: 35px;
  background-color: ${(props: AppTheme) => props.theme.colors.purpleLight};
  border-radius: 25px;
  outline: none;
  border: none;
  padding: 5px 10px;
  color: ${(props: AppTheme) => props.theme.colors.white};
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${(props: AppTheme) => props.theme.fontFamilies.Roboto};
  font-size: ${(props: AppTheme) => props.theme.fontSizes.small};

  :hover:not(.active) {
    background-color: ${(props: AppTheme) => props.theme.colors.orange};
    cursor: pointer;
    transition: all 0.5s;
  }
  &.active {
    color: ${(props: AppTheme) => props.theme.colors.orange};
    cursor: not-allowed;
    pointer-events: none;
  }
`;

export const OrangeButton = styled.button`
  min-width: 110px;
  width: fit-content;
  min-height: 35px;
  background-color: ${(props: AppTheme) => props.theme.colors.orange};
  border-radius: 25px;
  outline: none;
  padding: 5px 10px;
  color: ${(props: AppTheme) => props.theme.colors.white};
  border: 2px solid ${(props: AppTheme) => props.theme.colors.orange};

  :hover {
    background-color: transparent;
    cursor: pointer;
    transition: all 0.5s;
  }
`;

export const ButtonSettings = styled.button`
  background-color: ${(props: AppTheme) => props.theme.colors.purpleLight};
  color: ${(props: AppTheme) => props.theme.colors.white};
  width: 203px;
  height: 39px;

  :hover {
    color: ${(props: AppTheme) => props.theme.colors.orange};
  }
`;

export const ButtonNewGuestAccount = styled.button`
  background-color: ${(props: AppTheme) => props.theme.colors.greenSettings};
  font-weight: bold;
  border-radius: 25px;
  width: 239px;
  height: 39px;
  border: none;
`;

export const ButtonDeleteAccount = styled.button`
  background-color: ${(props: AppTheme) => props.theme.colors.pink};
  border-radius: 20px;
  color: ${(props: AppTheme) => props.theme.colors.red};
  border: none;
  font-weight: bolder;
  padding: 10px;
`;

export const SideMenuLink = styled(NavLink)`
  background-color: ${(props: AppTheme) => props.theme.colors.purpleLight};
  border-radius: 25px;
  width: 200px;
  min-height: 35px;
  text-decoration: none;
  color: ${(props: AppTheme) => props.theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${(props: AppTheme) => props.theme.fontFamilies.Roboto};

  &.active {
    color: ${(props: AppTheme) => props.theme.colors.orange};
    pointer-events: none;
    cursor: not-allowed;
  }
  :hover {
    color: ${(props: AppTheme) => props.theme.colors.orange};
  }
`;

export const PermissionsReturnButton = styled(ActionButton)`
  min-width: 200px;
`;
