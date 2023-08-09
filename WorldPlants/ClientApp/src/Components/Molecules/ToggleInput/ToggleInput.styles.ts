import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

interface ToggleProps {
  checked: boolean;
}

export const ToggleInputWrapper = styled.div`
  display: flex;
`;

export const HiddenCheckbox = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  width: 45px;
  height: 20px;
  justify-self: center;
  display: none;
`;
export const ToggleLabel = styled.label`
  display: grid;
  grid-template-columns: auto 50px;
  column-gap: 10px;
  align-items: center;
`;

export const ToggleLabelText = styled.span`
  color: ${(props: ToggleProps & AppTheme) => (props.checked ? props.theme.colors.greenSettingsActive : props.theme.colors.red)};
  font-weight: bold;
  transition: all 0.5s ease-in-out;
`;

export const ToggleDotWrapper = styled.div`
  width: 40px;
  height: 22px;
  background-color: black;
  display: flex;
  border-radius: 10px;
  position: relative;
  align-items: center;
  padding: 0px 2px;
`;

export const InputDot = styled.div<ToggleProps>`
  border-radius: 50%;
  background-color: ${(props: ToggleProps & AppTheme) => (props.checked ? props.theme.colors.greenSettingsActive : props.theme.colors.red)};
  height: 18px;
  width: 18px;
  transform: translateX(${(props: ToggleProps) => (props.checked ? "100%" : "0")});
  transition: all 0.5s ease-in-out;
`;
