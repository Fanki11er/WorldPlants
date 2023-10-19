import styled from "styled-components";
import { AppTheme } from "../../../GlobalStyles/theme";

export const QrGeneratorWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  width: 100%;
  flex-direction: column;
  height: 150px;
  justify-content: space-between;
  background-color: ${(props: AppTheme) => props.theme.colors.navyBlue};
  padding: 25px;
  border-radius: 20px;
  align-items: center;
`;
