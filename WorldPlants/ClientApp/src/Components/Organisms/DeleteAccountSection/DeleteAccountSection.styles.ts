import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const DeleteAccountSectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  width: 75%;
`;

export const DeleteAccountSectionWrapperHeader = styled.h2`
  margin: 0;
  color: ${(props: AppTheme) => props.theme.colors.red};;
`;
