import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const FormSuccess = styled.span`
  width: 100%;
  background-color: ${(props: AppTheme) => props.theme.colors.greenLight};
  display: grid;
  border-radius: 10px;
  justify-content: center;
  padding: 10px;
  font-weight: bold;
  color: ${(props: AppTheme) => props.theme.colors.greenSettings};
  font-size: ${(props: AppTheme) => props.theme.fontSizes.small};
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
`;
