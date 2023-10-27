import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const AddPhotoFieldWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 0;
`;

export const AddPhotoFieldLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props: AppTheme) => props.theme.colors.orange};
  position: relative;
  width: 180px;
  height: 35px;
  background-color: ${(props: AppTheme) => props.theme.colors.darkPurple};
  border-radius: 10px;
  transition: all 0.5s;
  border: 2px solid ${(props: AppTheme) => props.theme.colors.transparent};
  outline: none;
  &:hover,
  &:focus {
    border: 2px solid ${(props: AppTheme) => props.theme.colors.orange};
  }
  font-size: ${(props: AppTheme) => props.theme.fontSizes.small};
`;

export const AddPhotoFieldInput = styled.input`
  display: none;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;
