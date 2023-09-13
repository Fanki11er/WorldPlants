import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const UserSitePlantsSectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  width: 75%;
  align-items: center;
`;

export const UserSitePlantsSectionHeader = styled.h2`
  margin: 0;
  color: ${(props: AppTheme) => props.theme.colors.orange};
`;
